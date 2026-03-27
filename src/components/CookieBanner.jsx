import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { initAnalytics } from "../firebase";
import { Link } from "react-router-dom";

const CONSENT_KEY = "cookieConsent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettingsBtn, setShowSettingsBtn] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      // Silently initialize analytics if previously accepted
      initAnalytics();
      setShowSettingsBtn(true);
    } else if (consent === "declined") {
      // Do not initialize analytics
      setShowSettingsBtn(true);
    } else {
      // No consent recorded, show banner after short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    initAnalytics();
    setIsVisible(false);
    setTimeout(() => setShowSettingsBtn(true), 500);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setIsVisible(false);
    setTimeout(() => setShowSettingsBtn(true), 500);
  };

  const openBanner = () => {
    setShowSettingsBtn(false);
    setIsVisible(true);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: "100%", opacity: 0, y: 20 }}
            animate={{ x: 0, opacity: 1, y: 0 }}
            exit={{ x: "100%", opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed bottom-0 right-0 md:bottom-10 md:right-10 w-full md:w-[500px] z-[100] p-4 md:p-0"
          >
            {/* High-Impact Floating Card */}
            <div className="bg-charcoal/95 backdrop-blur-2xl border border-cream/20 rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden p-8 md:p-10 flex flex-col gap-8">
              
              {/* Text Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream/10 flex items-center justify-center text-cream shadow-inner">
                    <Cookie size={26} />
                  </div>
                  <h3 className="text-cream font-black text-sm uppercase tracking-[0.4em]">
                    Digital Rituals
                  </h3>
                </div>
                
                <p className="text-cream/80 font-sans text-base md:text-lg leading-relaxed">
                  We use cookies and Firebase Analytics to understand your journey through our late-night brew. 
                  Accepting helps us refine the experience.
                </p>

                <Link to="/privacy-policy" className="inline-block text-cream hover:text-white underline underline-offset-8 transition-all font-bold text-sm uppercase tracking-widest">
                  Read Privacy Policy
                </Link>
              </div>

              {/* High-Visibility Action Buttons */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleAccept}
                  className="w-full py-5 rounded-2xl bg-cream text-charcoal font-black tracking-[0.25em] uppercase text-xs shadow-[0_10px_30px_rgba(238,235,226,0.3)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Accept All Cookies
                </button>
                <div className="flex items-center justify-center pt-2">
                  <button
                    onClick={handleDecline}
                    className="text-cream/40 hover:text-cream/80 font-bold tracking-[0.2em] uppercase text-[10px] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Decline optional tracking</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Floating Settings Trigger (Alternative side for better balance) */}
      <AnimatePresence>
        {showSettingsBtn && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={openBanner}
            className="fixed bottom-10 left-10 z-[90] w-14 h-14 bg-charcoal/80 backdrop-blur-md border border-cream/20 rounded-[20px] flex items-center justify-center text-cream/70 shadow-2xl hover:bg-charcoal hover:text-cream hover:border-cream/40 transition-all duration-300 group"
          >
            <Cookie size={24} className="group-hover:animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
