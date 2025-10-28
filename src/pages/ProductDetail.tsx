import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Truck, RefreshCw, Shield } from "lucide-react";
import { api } from "@/lib/api";
import product1 from "@/assets/product-1.jpg";
import { FloatingButtons } from "@/components/FloatingButtons";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isInWishlist = id ? wishlistItems.includes(id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (_) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const sizes = ["XS", "S", "M", "L", "XL"];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">Loading product...</div>
          </div>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">Product not found</div>
          </div>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    );
  }

  const productImage = product.image_url || (product.images && product.images[0]) || product1;
  const isOnSale = product.original_price && product.original_price > product.price;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: productImage,
      },
      selectedSize
    );
  };

  const handleToggleWishlist = () => {
    if (id) {
      toggleWishlist(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                <img 
                  src={productImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(0, 4).map((img: string, i: number) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-sm bg-muted cursor-pointer border-2 border-transparent hover:border-accent transition-colors">
                      <img 
                        src={img}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {isOnSale && (
                  <Badge className="mb-4 bg-destructive text-destructive-foreground">
                    Sale - {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% Off
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold">Rs. {product.price.toLocaleString()}</span>
                  {product.original_price && (
                    <span className="text-xl text-muted-foreground line-through">
                      Rs. {product.original_price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "No description available for this product."}
                </p>
              </div>

              {/* Size Selection */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-semibold">Size</label>
                  <button className="text-sm text-accent hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border rounded-sm transition-colors ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="border-t border-border pt-6">
                <label className="font-semibold mb-4 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-border">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {product.stock > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {product.stock <= 10 ? `Only ${product.stock} items left in stock` : 'In stock'}
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="text-sm text-destructive">Out of stock</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 border-t border-border pt-6">
                <Button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 py-6"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button 
                  onClick={handleToggleWishlist}
                  variant="outline" 
                  className="w-full py-6"
                >
                  <Heart className={`mr-2 h-5 w-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Free shipping on all orders</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCw className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Easy 30-day returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Secure payment guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ProductDetail;
