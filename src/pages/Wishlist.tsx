import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { FloatingButtons } from "@/components/FloatingButtons";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url?: string;
  images?: string[];
  is_active: boolean;
}

const Wishlist = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { wishlistItems, refetch } = useWishlist();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (wishlistItems.length > 0) {
      fetchWishlistProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [wishlistItems]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
    }
  };

  const fetchWishlistProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", wishlistItems)
        .eq("is_active", true);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">My Wishlist</h1>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  original_price={product.original_price}
                  image_url={product.image_url}
                  images={product.images}
                  isOnSale={!!product.original_price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="font-serif text-2xl mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Save your favorite items to view them later
              </p>
              <a
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Wishlist;
