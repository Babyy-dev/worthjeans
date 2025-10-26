import { MessageCircle, HelpCircle, Package, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const FloatingButtons = () => {
  const whatsappNumber = "1234567890";
  const whatsappMessage = "Hello! I need help with...";

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
      {/* Help Menu Button */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-4 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all hover:scale-110"
            aria-label="Help"
          >
            <HelpCircle className="h-6 w-6" />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          side="left" 
          align="end"
          className="w-72 p-0 bg-background border border-border shadow-xl mr-4"
        >
          <div className="divide-y divide-border">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors group"
            >
              <span className="text-sm font-medium">Whatsapp</span>
              <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            </a>
            
            <Link
              to="/wishlist"
              className="flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors group"
            >
              <span className="text-sm font-medium">My Orders</span>
              <Package className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors group"
            >
              <span className="text-sm font-medium">Return</span>
              <RotateCcw className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center justify-between px-6 py-4 hover:bg-muted transition-colors group"
            >
              <span className="text-sm font-medium">Frequently Asked Questions</span>
              <span className="text-xs font-bold px-2 py-1 bg-foreground text-background rounded">FAQ</span>
            </Link>
          </div>
        </PopoverContent>
      </Popover>

      {/* WhatsApp Direct Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};
