import { Heart, ShoppingBag } from "lucide-react";
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
  const showSaleBadge = productOriginalPrice && productOriginalPrice > price;

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
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img 
          src={productImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* ON SALE badge - DuJour style */}
        {showSaleBadge && (
          <div className="absolute top-3 left-3 bg-black text-white px-3 py-1.5 text-xs font-medium tracking-wider uppercase">
            ON SALE
          </div>
        )}
        
        {/* Wishlist button - DuJour style */}
        <button 
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2.5 sm:p-2 transition-all duration-300 hover:scale-110 bg-white/20 backdrop-blur-sm rounded-full sm:bg-transparent sm:backdrop-blur-none"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-5 w-5 sm:h-5 sm:w-5 transition-colors ${
              isInWishlist 
                ? "fill-red-500 text-red-500" 
                : "text-white stroke-[1.5] drop-shadow-md"
            }`} 
          />
        </button>
        
        {/* Quick shop button - appears on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={handleQuickShop}
            className="w-full bg-white text-black hover:bg-white/90 font-medium"
          >
            Quick shop
          </Button>
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium group-hover:underline transition-all">
          {name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">Rs. {price.toLocaleString()}</span>
          {productOriginalPrice && productOriginalPrice > price && (
            <span className="text-xs text-muted-foreground line-through">
              Rs. {productOriginalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
