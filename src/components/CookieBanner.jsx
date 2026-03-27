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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6"
          >
            {/* Inner responsive card */}
            <div className="max-w-7xl mx-auto bg-[#1a0f07] border border-[#c9973a]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 gap-6 xl:px-10">
              
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <h3 className="text-[#eeebe2] font-black text-xl uppercase tracking-widest flex items-center justify-center md:justify-start gap-3">
                  <Cookie className="text-[#c9973a]" size={24} />
                  We use cookies
                </h3>
                <p className="text-[#eeebe2]/70 text-sm md:text-base leading-relaxed max-w-3xl">
                  We use Firebase Analytics to understand how visitors interact with our site. No personal data is sold or shared. Opting in helps us improve your night-owl cafe experience.
                  <br className="hidden md:block" />
                  <Link to="/privacy-policy" className="inline-block mt-2 text-[#c9973a] hover:text-[#eeebe2] underline underline-offset-4 transition-colors font-medium">
                    Learn more in our Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-8 py-3 rounded-xl border border-[#c9973a]/50 text-[#eeebe2] font-bold tracking-widest uppercase text-xs hover:bg-[#c9973a]/10 hover:border-[#c9973a] transition-all"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-8 py-3 rounded-xl bg-[#c9973a] text-[#1a0f07] font-black tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(201,151,58,0.3)] hover:bg-[#dfb150] hover:shadow-[0_0_30px_rgba(201,151,58,0.5)] hover:-translate-y-0.5 transition-all"
                >
                  Accept All
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cookie Settings Trigger */}
      <AnimatePresence>
        {showSettingsBtn && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={openBanner}
            title="Cookie Preferences"
            className="fixed bottom-6 left-6 z-[90] w-12 h-12 bg-[#1a0f07] border border-[#c9973a]/50 rounded-full flex items-center justify-center text-[#c9973a] shadow-lg hover:bg-[#c9973a] hover:text-[#1a0f07] transition-colors"
          >
            <Cookie size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
