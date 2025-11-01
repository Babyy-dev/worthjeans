import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { QuickViewModal } from "@/components/QuickViewModal";

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

const ProductCard = ({
  id,
  image,
  image_url,
  images,
  name,
  price,
  original_price,
  originalPrice,
  isOnSale,
}: ProductCardProps) => {
  const productImage = image || image_url || (images && images[0]) || "";
  const productOriginalPrice = original_price || originalPrice;
  const productId = id || "1";
  const { wishlistItems, toggleWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isInWishlist = wishlistItems.includes(productId);
  const showSaleBadge = productOriginalPrice && productOriginalPrice > price;
  
  // Get multiple images for hover effect
  const productImages = images || [productImage];
  const hasMultipleImages = productImages.length > 1;

  // Auto-cycle through images on hover
  useEffect(() => {
    if (isHovering && hasMultipleImages) {
      // Start cycling through images
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 1500); // Change image every 1.5 seconds
    } else {
      // Stop cycling and reset to first image
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, hasMultipleImages, productImages.length]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link 
        to={`/product/${productId}`} 
        className="group cursor-pointer block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={productImages[currentImageIndex]}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
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

        {/* Quick View button - appears on hover (desktop only) */}
        <div className="hidden sm:block absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleQuickView}
            className="w-full bg-white text-black hover:bg-white/90 font-medium"
          >
            Quick View
          </Button>
        </div>
        
        {/* Image indicators for multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {productImages.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 sm:mt-3 space-y-1">
        <h3 className="text-xs sm:text-sm font-medium group-hover:underline transition-all line-clamp-2">
          {name}
        </h3>
        <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-semibold">
            Rs. {price.toLocaleString()}
          </span>
          {productOriginalPrice && productOriginalPrice > price && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
              Rs. {productOriginalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
    
    {/* Quick View Modal */}
    <QuickViewModal
      isOpen={isQuickViewOpen}
      onClose={() => setIsQuickViewOpen(false)}
      product={{
        id: productId,
        name,
        price,
        original_price: productOriginalPrice,
        description: `Premium ${name} - Experience comfort and style with our carefully crafted denim.`,
        image: productImage,
        images: productImages,
      }}
    />
  </>
  );
};

export default ProductCard;
