import { Search, User, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className={`py-2 text-center text-sm border-b transition-colors duration-300 ${
          isHomePage && !isScrolled 
            ? "text-white/80 border-white/20" 
            : "text-muted-foreground border-border"
        }`}>
          Complimentary express shipping on all orders
        </div>
        
        {/* Main navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className={`text-2xl font-serif font-semibold tracking-wide ${textClasses}`}>
            Élégance
          </Link>
          
          {/* Navigation links */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Link to="/" className={`text-sm hover:text-accent transition-colors px-3 py-2 ${textClasses}`}>
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={`text-sm hover:text-accent transition-colors bg-transparent ${textClasses}`}>
                  Collection
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4 bg-background">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/collections"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">All Collections</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Browse all products
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/collections"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">New Arrivals</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Latest products
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/collections"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Best Sellers</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Popular items
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about" className={`text-sm hover:text-accent transition-colors px-3 py-2 ${textClasses}`}>
                  About Us
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact" className={`text-sm hover:text-accent transition-colors px-3 py-2 ${textClasses}`}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className={`p-2 hover:text-accent transition-colors ${textClasses}`} aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/auth" className={`p-2 hover:text-accent transition-colors ${textClasses}`} aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/wishlist" className={`p-2 hover:text-accent transition-colors ${textClasses}`} aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/cart" className={`p-2 hover:text-accent transition-colors relative ${textClasses}`} aria-label="Cart">
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
