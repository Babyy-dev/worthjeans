import { Search, User, Heart, ShoppingBag, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import { api } from "@/lib/api";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const products = await api.get('/products');
        const filtered = products.filter((p: any) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isHomePage && !isScrolled
      ? "bg-transparent border-transparent"
      : "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
  }`;

  const textClasses = `transition-colors duration-300 ${
    isHomePage && !isScrolled ? "text-white" : "text-foreground"
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top announcement bar */}
        <div
          className={`py-2 text-center text-sm border-b transition-colors duration-300 ${
            isHomePage && !isScrolled
              ? "text-white/80 border-white/20"
              : "text-muted-foreground border-border"
          }`}
        >
          Complimentary express shipping on all orders
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-serif font-semibold tracking-wide ${textClasses}`}
          >
            WORTH JEANS
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm hover:text-accent transition-colors ${textClasses}`}
            >
              Home
            </Link>
            <Link
              to="/collections"
              className={`text-sm hover:text-accent transition-colors ${textClasses}`}
            >
              Collection
            </Link>
            <Link
              to="/about"
              className={`text-sm hover:text-accent transition-colors ${textClasses}`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm hover:text-accent transition-colors ${textClasses}`}
            >
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Small search bar */}
            {searchOpen && (
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 px-3 py-1.5 pr-8 text-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                />
                
                {/* Compact search results */}
                {searchQuery.length >= 2 && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {isSearching ? (
                      <p className="text-center text-muted-foreground py-3 text-xs">Searching...</p>
                    ) : searchResults.length > 0 ? (
                      <div className="py-1">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="w-full flex items-center gap-2 p-2 hover:bg-accent/10 transition-colors text-left"
                          >
                            <img
                              src={product.image_url || '/placeholder.svg'}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-xs truncate">{product.name}</h3>
                              <p className="text-xs text-muted-foreground truncate">
                                {product.description}
                              </p>
                              <p className="text-xs font-semibold mt-0.5">₹{product.price}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-3 text-xs">
                        No products found
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 hover:text-accent transition-colors ${textClasses}`}
              aria-label="Search"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            <Link
              to="/auth"
              className={`p-2 hover:text-accent transition-colors ${textClasses}`}
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              to="/wishlist"
              className={`p-2 hover:text-accent transition-colors ${textClasses}`}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className={`p-2 hover:text-accent transition-colors relative ${textClasses}`}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
