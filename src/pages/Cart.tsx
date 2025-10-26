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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Link to="/collections">
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border border-border rounded-sm">
                    <div className="w-24 h-32 overflow-hidden rounded-sm bg-muted flex-shrink-0">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="p-1 hover:text-destructive transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-semibold">Rs. {item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                          className="p-1 border border-border rounded hover:bg-muted transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 border border-border rounded">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                          className="p-1 border border-border rounded hover:bg-muted transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-border rounded-sm p-6 sticky top-24">
                  <h2 className="text-xl font-serif font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold text-accent">Free</span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-serif font-semibold">
                          Rs. {total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 mb-4"
                  >
                    Proceed to Checkout
                  </Button>

                  <Link to="/collections">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="mt-6 p-4 bg-muted rounded-sm">
                    <p className="text-sm text-muted-foreground text-center">
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
