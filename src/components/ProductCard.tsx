import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id?: string;
  image?: string;
  image_url?: string;
  images?: string[];
  name: string;
  price: number;
  original_price?: number;
  originalPrice?: number;
  isOnSale?: boolean;
}

const ProductCard = ({ id, image, image_url, images, name, price, original_price, originalPrice, isOnSale }: ProductCardProps) => {
  const productImage = image || image_url || (images && images[0]) || "";
  const productOriginalPrice = original_price || originalPrice;
  const productId = id || "1";
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const isInWishlist = wishlistItems.includes(productId);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const handleQuickShop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: productId,
      name,
      price,
      image: productImage,
    });
  };
  
  return (
    <Link to={`/product/${productId}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4 bg-muted">
        <img 
          src={productImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Sale badge */}
        {isOnSale && (
          <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
            Sale
          </Badge>
        )}
        
        {/* Wishlist button */}
        <button 
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-background"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} 
          />
        </button>
        
        {/* Quick shop button */}
        <Button 
          onClick={handleQuickShop}
          className="absolute bottom-4 left-4 right-4 bg-foreground text-background py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-foreground/90"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Quick Add
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium group-hover:text-accent transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Rs. {price.toLocaleString()}</span>
          {productOriginalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              Rs. {productOriginalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
