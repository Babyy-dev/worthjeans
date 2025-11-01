import {
  Search,
  User,
  Heart,
  ShoppingBag,
  X,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Announcement bar messages
  const announcements = [
    "Complimentary express shipping on all orders",
    "DIWALI SALE IS LIVE - Flat 30% Off on all products"
  ];
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const collectionTypes = [
    { name: "Narrow Fit", slug: "narrow-fit" },
    { name: "Flare Cut", slug: "flare-cut" },
    { name: "Straight Fit", slug: "straight-fit" },
    { name: "Wide Leg", slug: "wide-leg" },
    { name: "Cargo", slug: "cargo" },
  ];

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
        const products = await api.get("/products");
        const filtered = products.filter(
          (p: any) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error("Search error:", error);
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
    <>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top announcement bar with slider */}
          <div
            className={`py-2 text-center text-sm border-b transition-colors duration-300 relative overflow-hidden ${
              isHomePage && !isScrolled
                ? "text-white/80 border-white/20"
                : "text-muted-foreground border-border"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncementIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {announcements[currentAnnouncementIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Main navigation */}
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 hover:text-accent transition-colors ${textClasses}`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className={`text-base md:text-2xl font-serif font-semibold tracking-wide whitespace-nowrap ${textClasses}`}
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

              {/* Collections Dropdown */}
              <div className="relative group">
                <button
                  onMouseEnter={() => setCollectionsOpen(true)}
                  onMouseLeave={() => setCollectionsOpen(false)}
                  className={`text-sm hover:text-accent transition-colors flex items-center gap-1 ${textClasses}`}
                >
                  Collections
                  <ChevronDown className="h-3 w-3" />
                </button>

                {collectionsOpen && (
                  <div
                    onMouseEnter={() => setCollectionsOpen(true)}
                    onMouseLeave={() => setCollectionsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50"
                  >
                    {collectionTypes.map((type) => (
                      <Link
                        key={type.slug}
                        to={`/collections/${type.slug}`}
                        className="block px-4 py-2 text-sm hover:bg-accent/10 transition-colors"
                        onClick={() => setCollectionsOpen(false)}
                      >
                        {type.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Desktop search bar - inline */}
              {searchOpen && (
                <div className="hidden md:block relative">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 px-3 py-1.5 pr-8 text-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                    />

                    {/* Desktop search results */}
                    {searchQuery.length >= 2 && (
                      <div className="absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                        {isSearching ? (
                          <p className="text-center text-muted-foreground py-3 text-xs">
                            Searching...
                          </p>
                        ) : searchResults.length > 0 ? (
                          <div className="py-1">
                            {searchResults.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleProductClick(product.id)}
                                className="w-full flex items-center gap-2 p-2 hover:bg-accent/10 transition-colors text-left"
                              >
                                <img
                                  src={product.image_url || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-xs truncate">
                                    {product.name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground truncate">
                                    {product.description}
                                  </p>
                                  <p className="text-xs font-semibold mt-0.5">
                                    ₹{product.price}
                                  </p>
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
                </div>
              )}

              {/* Mobile search dropdown - below icon */}
              {searchOpen && (
                <div className="md:hidden fixed right-4 top-[76px] z-[99] w-[240px]">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pr-10 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground border-0 shadow-md"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  {/* Mobile search results */}
                  {searchQuery.length >= 2 && (
                    <div className="mt-2 bg-background border border-border rounded-2xl shadow-lg max-h-64 overflow-y-auto">
                      {isSearching ? (
                        <p className="text-center text-muted-foreground py-3 text-xs">
                          Searching...
                        </p>
                      ) : searchResults.length > 0 ? (
                        <div className="py-1">
                          {searchResults.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                              className="w-full flex items-center gap-2 p-2 hover:bg-accent/10 transition-colors text-left"
                            >
                              <img
                                src={product.image_url || "/placeholder.svg"}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-xs truncate">
                                  {product.name}
                                </h3>
                                <p className="text-xs text-muted-foreground truncate">
                                  {product.description}
                                </p>
                                <p className="text-xs font-semibold mt-0.5">
                                  ₹{product.price}
                                </p>
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

              {/* Search toggle button - all screens */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 hover:text-accent transition-colors ${textClasses}`}
                aria-label="Search"
              >
                {searchOpen ? (
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Search className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </button>
              <Link
                to="/auth"
                className={`hidden md:block p-2 hover:text-accent transition-colors ${textClasses}`}
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              <Link
                to="/wishlist"
                className={`p-2 hover:text-accent transition-colors ${textClasses}`}
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                to="/cart"
                className={`p-2 hover:text-accent transition-colors relative ${textClasses}`}
                aria-label="Cart"
              >
                <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
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

      {/* Mobile Menu - Rendered outside nav for proper z-index */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Menu */}
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[101] md:hidden shadow-xl animate-slide-in-left overflow-y-auto">
            <div className="py-4 space-y-4">
              {/* Close button */}
              <div className="flex justify-between items-center px-4 pb-4 border-b">
                <h2 className="text-xl font-serif font-semibold text-black">
                  Menu
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-black" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col px-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-link text-black hover:text-gray-600 transition-colors border-b border-gray-200 block"
                >
                  Home
                </Link>

                {/* Mobile Collections */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() =>
                      setMobileCollectionsOpen(!mobileCollectionsOpen)
                    }
                    className="mobile-menu-link w-full flex items-center justify-between font-semibold text-black hover:text-gray-600 transition-colors text-left"
                  >
                    <span>Collections</span>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        mobileCollectionsOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {mobileCollectionsOpen && (
                    <div className="pl-4 pb-2 animate-slide-down">
                      {collectionTypes.map((type) => (
                        <Link
                          key={type.slug}
                          to={`/collections/${type.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 px-2 text-sm text-black hover:text-gray-600 transition-colors min-h-[44px] flex items-center"
                        >
                          {type.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-link text-black hover:text-gray-600 transition-colors border-b border-gray-200 block"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-link text-black hover:text-gray-600 transition-colors border-b border-gray-200 block"
                >
                  Contact
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu-link text-black hover:text-gray-600 transition-colors flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Account
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
