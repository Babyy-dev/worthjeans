import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    original_price?: number;
    description?: string;
    image: string;
    images?: string[];
    category?: string;
  };
}

export const QuickViewModal = ({ isOpen, onClose, product }: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isInWishlist = wishlistItems.includes(product.id);
  const productImages = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Compact Popup Box - Center Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-6 top-1/2 -translate-y-1/2 w-[340px] max-w-[calc(100vw-3rem)] bg-white z-50 shadow-2xl rounded-xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-2 top-2 z-10 rounded-full bg-white p-1 hover:bg-gray-100 transition-colors shadow"
              aria-label="Close"
            >
              <X className="h-3 w-3" />
            </button>

            {/* Content - Horizontal Layout */}
            <div className="flex gap-3 p-3">
              {/* Product Image - Small */}
              <div className="relative bg-muted w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image indicators */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-1 h-1 rounded-full transition-all ${
                          index === selectedImage ? "bg-white w-2" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info - Compact */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h3 className="text-sm font-serif font-semibold mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-base font-bold">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-[10px] text-muted-foreground line-through">
                      ₹{product.original_price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Size Selector - Compact */}
                <div className="mb-2">
                  <label className="text-[10px] font-medium mb-1 block">Size</label>
                  <div className="flex gap-1">
                    {['S', 'M', 'L'].map((size) => (
                      <button
                        key={size}
                        className="flex-1 px-2 py-1 border border-border rounded text-[10px] hover:border-foreground transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-2">
                  <label className="text-[10px] font-medium mb-1 block">Quantity</label>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 rounded border border-border hover:bg-muted transition-colors flex items-center justify-center"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-2.5 w-2.5" />
                    </button>
                    <span className="w-6 text-center font-medium text-[10px]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 rounded border border-border hover:bg-muted transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-1.5 mt-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full py-2 text-[11px] font-medium"
                  >
                    Add to cart
                  </Button>
                  
                  <div className="flex gap-1.5">
                    <Button
                      onClick={() => toggleWishlist(product.id)}
                      variant="outline"
                      className="flex-1 py-2 text-[10px] px-1"
                      size="sm"
                    >
                      <Heart className={`h-2.5 w-2.5 ${isInWishlist ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 py-2 text-[10px]"
                      size="sm"
                      asChild
                    >
                      <Link to={`/product/${product.id}`} onClick={onClose}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
