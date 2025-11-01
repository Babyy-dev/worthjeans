import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const SalePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[340px] sm:max-w-[500px] border-none shadow-2xl rounded-3xl p-6 sm:p-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Main Title */}
          <div className="text-center space-y-3 sm:space-y-4">
            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight uppercase">
              CHRISTMAS SALE IS LIVE
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
              Flat 100% Off on all the products. Sign up and get access to
              exclusive member benefits.
            </DialogDescription>
          </div>

          {/* Shop Now Button */}
          <Button
            onClick={() => setOpen(false)}
            className="w-full text-sm sm:text-base font-semibold py-5 sm:py-6 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all"
            asChild
          >
            <Link to="/collections">Shop Now</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
