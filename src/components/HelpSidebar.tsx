import { X, MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface HelpSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpSidebar = ({ open, onOpenChange }: HelpSidebarProps) => {
  const helpOptions = [
    {
      icon: MessageCircle,
      title: "Chat with us",
      description: "Get instant help from our team",
      action: () => window.open("https://wa.me/1234567890", "_blank"),
    },
    {
      icon: Phone,
      title: "Call us",
      description: "+1 (234) 567-890",
      action: () => (window.location.href = "tel:+1234567890"),
    },
    {
      icon: Mail,
      title: "Email us",
      description: "support@elegance.com",
      action: () => (window.location.href = "mailto:support@elegance.com"),
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find answers to common questions",
      action: () => {},
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>How can we help?</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {helpOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-left"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <option.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{option.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Available Monday - Saturday, 9:00 AM - 6:00 PM
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
