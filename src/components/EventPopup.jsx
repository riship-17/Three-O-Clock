import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BookingModal from './BookingModal';

const DISMISSED_KEY = 'threeoclock_popup_dismissed';
const DISMISSED_EXPIRY_DAYS = 3;

const EVENT_DATA = {
  title: 'An Evening to Remember',
  date: 'Friday, 3rd April 2026',
};

const POSTER_URL =
  'https://res.cloudinary.com/dgry55pvk/image/upload/v1774531468/SOCIAL_MEDIA_DESIGN_3.jpg_k60hoz.jpg';

export default function EventPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isVisible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  }, []);

  const handleBookSeats = () => {
    setIsVisible(false);
    setShowBooking(true);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-xl"
              onClick={handleClose}
            />

            {/* Card */}
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-[32px] shadow-2xl"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Event Poster Image */}
              <div className="relative">
                <img
                  src={POSTER_URL}
                  alt="Three O'Clock Café — An Evening to Remember"
                  className="w-full object-cover"
                  loading="eager"
                />
                {/* Gradient fade at bottom for button readability */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-charcoal/60 backdrop-blur-md border border-cream/15 text-cream/60 hover:text-cream hover:bg-charcoal/80 hover:border-cream/30 hover:rotate-90 transition-all duration-300 flex items-center justify-center"
                aria-label="Close popup"
              >
                <X size={17} />
              </button>

              {/* CTA anchored over the gradient */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 flex flex-col items-center gap-3">
                <motion.button
                  onClick={handleBookSeats}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-cream text-charcoal rounded-2xl font-black text-xs tracking-[0.22em] uppercase shadow-2xl hover:bg-linen hover:shadow-[0_12px_30px_rgba(238,235,226,0.2)] transition-all duration-300"
                >
                  Book Your Seats →
                </motion.button>

                <button
                  onClick={handleClose}
                  className="text-cream/35 text-[10px] tracking-widest uppercase hover:text-cream/60 transition-colors duration-200"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        event={EVENT_DATA}
      />
    </>
  );
}
