import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWishlist = async () => {
    try {
      // Will 401 if not logged in
      const ids = await api.get("/wishlist");
      setWishlistItems(ids || []);
    } catch (_err) {
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId: string) => {
    try {
      const isInWishlist = wishlistItems.includes(productId);

      if (isInWishlist) {
        await api.delete(`/wishlist/${productId}`);
        setWishlistItems(prev => prev.filter(id => id !== productId));
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist",
        });
      } else {
        await api.post("/wishlist", { product_id: productId });
        setWishlistItems(prev => [...prev, productId]);
        toast({
          title: "Added to wishlist",
          description: "Item has been added to your wishlist",
        });
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast({
        title: "Please login",
        description: "You need to be logged in to update your wishlist",
        variant: "destructive",
      });
    }
  };

  return { wishlistItems, loading, toggleWishlist, refetch: fetchWishlist };
};
