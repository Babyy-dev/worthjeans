import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface Purchase {
  id: string;
  customerName: string;
  productName: string;
  productImage: string;
  timeAgo: string;
  location?: string;
}

// Mock data for demonstration - in production, this would come from your backend
const mockPurchases: Purchase[] = [
  {
    id: '1',
    customerName: 'Rahul S.',
    productName: 'Classic Slim Fit Jeans',
    productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    timeAgo: '2 minutes ago',
    location: 'Mumbai, India'
  },
  {
    id: '2',
    customerName: 'Priya K.',
    productName: 'Wide Leg Denim',
    productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    timeAgo: '5 minutes ago',
    location: 'Delhi, India'
  },
  {
    id: '3',
    customerName: 'Arjun M.',
    productName: 'Cargo Utility Jeans',
    productImage: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec',
    timeAgo: '8 minutes ago',
    location: 'Bangalore, India'
  },
  {
    id: '4',
    customerName: 'Anjali P.',
    productName: 'Straight Fit Classic',
    productImage: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
    timeAgo: '12 minutes ago',
    location: 'Pune, India'
  },
  {
    id: '5',
    customerName: 'Vikram R.',
    productName: 'Flare Cut Jeans',
    productImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
    timeAgo: '15 minutes ago',
    location: 'Hyderabad, India'
  },
  {
    id: '6',
    customerName: 'Neha D.',
    productName: 'Narrow Fit Jeans',
    productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    timeAgo: '18 minutes ago',
    location: 'Chennai, India'
  },
  {
    id: '7',
    customerName: 'Rohan G.',
    productName: 'Classic Denim',
    productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    timeAgo: '22 minutes ago',
    location: 'Kolkata, India'
  },
  {
    id: '8',
    customerName: 'Sneha T.',
    productName: 'Skinny Fit Jeans',
    productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    timeAgo: '28 minutes ago',
    location: 'Ahmedabad, India'
  },
  {
    id: '9',
    customerName: 'Karan J.',
    productName: 'Relaxed Fit Denim',
    productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    timeAgo: '32 minutes ago',
    location: 'Jaipur, India'
  },
  {
    id: '10',
    customerName: 'Diya M.',
    productName: 'High-Waist Jeans',
    productImage: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec',
    timeAgo: '38 minutes ago',
    location: 'Surat, India'
  },
  {
    id: '11',
    customerName: 'Aditya N.',
    productName: 'Tapered Fit Jeans',
    productImage: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
    timeAgo: '42 minutes ago',
    location: 'Lucknow, India'
  },
  {
    id: '12',
    customerName: 'Isha B.',
    productName: 'Bootcut Jeans',
    productImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
    timeAgo: '48 minutes ago',
    location: 'Nagpur, India'
  },
  {
    id: '13',
    customerName: 'Siddharth V.',
    productName: 'Distressed Denim',
    productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    timeAgo: '52 minutes ago',
    location: 'Indore, India'
  },
  {
    id: '14',
    customerName: 'Kavya S.',
    productName: 'Mid-Rise Jeans',
    productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    timeAgo: '58 minutes ago',
    location: 'Bhopal, India'
  },
  {
    id: '15',
    customerName: 'Aman P.',
    productName: 'Dark Wash Jeans',
    productImage: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec',
    timeAgo: '1 hour ago',
    location: 'Chandigarh, India'
  }
];

export default function RecentPurchasePopup() {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null);
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 2 seconds
    const initialDelay = setTimeout(() => {
      setCurrentPurchase(mockPurchases[0]);
      setIsVisible(true);
      setPurchaseIndex(1);
    }, 2000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Hide notification after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Wait 2 seconds before showing next (total 10 seconds cycle)
      setTimeout(() => {
        const nextIndex = purchaseIndex % mockPurchases.length;
        setCurrentPurchase(mockPurchases[nextIndex]);
        setIsVisible(true);
        setPurchaseIndex(nextIndex + 1);
      }, 2000);
    }, 8000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, purchaseIndex]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && currentPurchase && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 max-w-[280px] sm:max-w-sm"
        >
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4">
              {/* Product Image */}
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-gray-100">
                <img
                  src={currentPurchase.productImage}
                  alt={currentPurchase.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <ShoppingBag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">
                      {currentPurchase.timeAgo}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
                      {currentPurchase.customerName}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-1">
                      purchased <span className="font-medium">{currentPurchase.productName}</span>
                    </p>
                    {currentPurchase.location && (
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                        📍 {currentPurchase.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close notification"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 8, ease: 'linear' }}
              className="h-1 bg-black"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
