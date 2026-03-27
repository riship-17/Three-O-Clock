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
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-8"
          >
            {/* Sleek Theme-Matched Card */}
            <div className="max-w-6xl mx-auto bg-charcoal/90 backdrop-blur-xl border border-cream/10 rounded-[28px] md:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row items-center justify-between p-7 md:p-10 gap-8">
              
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex justify-center md:justify-start items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream">
                    <Cookie size={22} />
                  </div>
                  <h3 className="text-cream font-black text-xs uppercase tracking-[0.3em]">
                    Privacy & Cookies
                  </h3>
                </div>
                
                <p className="text-cream/60 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                  We use cookies and Firebase Analytics to refine your experience. 
                  By accepting, you help us brew a better digital ritual for the night.
                  <Link to="/privacy-policy" className="ml-2 text-cream/90 hover:text-cream underline underline-offset-4 transition-colors font-semibold">
                    View Policy
                  </Link>
                </p>
              </div>

              {/* Theme-Matched Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-10 py-4 rounded-2xl border border-cream/20 text-cream/40 font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-cream/5 hover:text-cream/80 hover:border-cream/40 transition-all duration-300"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-10 py-4 rounded-2xl bg-cream text-charcoal font-black tracking-[0.2em] uppercase text-[10px] shadow-xl hover:bg-linen hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Accept All
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Floating Settings Trigger */}
      <AnimatePresence>
        {showSettingsBtn && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={openBanner}
            className="fixed bottom-8 left-8 z-[90] w-12 h-12 bg-charcoal/60 backdrop-blur-md border border-cream/15 rounded-2xl flex items-center justify-center text-cream/60 shadow-2xl hover:bg-charcoal/80 hover:text-cream hover:border-cream/30 transition-all duration-300 group"
          >
            <Cookie size={20} className="group-hover:animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
