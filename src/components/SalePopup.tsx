import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
      <DialogContent className="max-w-[320px] sm:max-w-md border-2 border-primary/20 p-4 sm:p-6">
        <DialogHeader className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
          <div className="space-y-1.5 sm:space-y-2 text-center">
            {/* <p className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              Grab your Comfort here!!
            </p> */}
            {/* <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Ge
            </DialogTitle> */}
            <DialogDescription className="text-sm sm:text-base">
              Abhi kuch nhi aaraha dimag mai kya likhu aap bata dena kya likha
              jaye!!
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
          {/* <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary">WELCOME30</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
              Valid on all products
            </p>
          </div> */}

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setOpen(false)}
              className="w-full text-sm sm:text-base"
              size="default"
              asChild
            >
              <Link to="/collections">Shop Now</Link>
            </Button>
            {/* <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              className="w-full text-sm sm:text-base"
              size="sm"
            >
              Maybe Later
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
