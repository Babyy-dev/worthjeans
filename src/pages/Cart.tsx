import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRazorpay } from "@/hooks/useRazorpay";
import { FloatingButtons } from "@/components/FloatingButtons";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();
  const { initializePayment } = useRazorpay();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    initializePayment({
      amount: total,
      name: "Order Payment",
      description: `Payment for ${cartItems.length} items`,
      onSuccess: (response) => {
        console.log("Payment successful:", response);
        // Handle successful payment (e.g., navigate to success page, clear cart)
        navigate("/");
      },
      onFailure: (error) => {
        console.error("Payment failed:", error);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-6 sm:mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <p className="text-sm sm:text-base text-muted-foreground mb-6">Your cart is empty</p>
              <Link to="/collections">
                <Button className="bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-border rounded-sm">
                    <div className="w-20 h-24 sm:w-24 sm:h-32 overflow-hidden rounded-sm bg-muted flex-shrink-0">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <h3 className="text-sm sm:text-base font-semibold mb-0.5 sm:mb-1 truncate">{item.name}</h3>
                            {item.size && <p className="text-xs sm:text-sm text-muted-foreground">Size: {item.size}</p>}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="p-1 hover:text-destructive transition-colors flex-shrink-0"
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                        <p className="text-sm sm:text-base font-semibold">Rs. {item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-3 sm:mt-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                          className="p-1 sm:p-1.5 border border-border rounded hover:bg-muted transition-colors"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="px-3 sm:px-4 py-1 border border-border rounded text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                          className="p-1 sm:p-1.5 border border-border rounded hover:bg-muted transition-colors"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-border rounded-sm p-4 sm:p-6 lg:sticky lg:top-24">
                  <h2 className="text-lg sm:text-xl font-serif font-semibold mb-4 sm:mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold text-accent">Free</span>
                    </div>
                    <div className="border-t border-border pt-3 sm:pt-4">
                      <div className="flex justify-between">
                        <span className="text-sm sm:text-base font-semibold">Total</span>
                        <span className="text-lg sm:text-xl font-serif font-semibold">
                          Rs. {total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 mb-3 sm:mb-4 py-5 sm:py-6 text-sm sm:text-base"
                  >
                    Proceed to Checkout
                  </Button>

                  <Link to="/collections">
                    <Button variant="outline" className="w-full py-5 sm:py-6 text-sm sm:text-base">
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted rounded-sm">
                    <p className="text-xs sm:text-sm text-muted-foreground text-center">
                      <span className="font-semibold text-foreground">Free shipping</span> on all orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Cart;
