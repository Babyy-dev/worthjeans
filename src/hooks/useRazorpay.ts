import { toast } from "@/hooks/use-toast";

interface RazorpayOptions {
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  onSuccess: (response: any) => void;
  onFailure?: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const initializePayment = ({
    amount,
    currency = "INR",
    name,
    description = "Purchase from Élégance",
    onSuccess,
    onFailure,
  }: RazorpayOptions) => {
    // For demo purposes, using test key (replace with your actual key)
    const RAZORPAY_KEY = "rzp_test_1234567890";

    const options = {
      key: RAZORPAY_KEY,
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      name: "Élégance",
      description,
      image: "/favicon.ico",
      handler: function (response: any) {
        toast({
          title: "Payment Successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        onSuccess(response);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#1a1a1a",
      },
      modal: {
        ondismiss: function () {
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process",
            variant: "destructive",
          });
          onFailure?.({ error: "Payment cancelled by user" });
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return { initializePayment };
};
