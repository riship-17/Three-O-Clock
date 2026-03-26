import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Mail, CalendarDays, Music, Coffee, Utensils } from 'lucide-react';
import emailjs from '@emailjs/browser';
import BookingModal from './BookingModal';

const STORAGE_KEY = 'threeoclock_popup_submitted';
const DISMISSED_KEY = 'threeoclock_popup_dismissed';
const DISMISSED_EXPIRY_DAYS = 3;

const EVENT_DATA = {
  title: 'An Evening to Remember',
  date: 'Saturday, 3rd April 2025 · 5:00 PM onwards',
};

export default function EventPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;

    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const daysSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISSED_EXPIRY_DAYS) return;
      else localStorage.removeItem(DISMISSED_KEY);
    }

    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isVisible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (status !== 'success') {
      localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');

    try {
      await emailjs.send(
        'service_071p8uo',
        'template_58n4g6l',
        {
          user_email: email,
          name: 'Event Signup',
          event: EVENT_DATA.title,
          phone: '-',
          guests: '1',
          day: EVENT_DATA.date,
        },
        'zUM9PAhuNFivjm347'
      );
      setStatus('success');
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
    }
  };

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
            <motion.div
              className="absolute inset-0 bg-charcoal/85 backdrop-blur-xl"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-[40px] shadow-2xl"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/event-poster-bg.webp"
                  alt=""
                  className="w-full h-full object-cover brightness-[0.25] saturate-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/80 to-charcoal/95" />
              </div>

              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-stone/60 to-transparent z-10" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full border border-cream/10 bg-cream/5 backdrop-blur-md text-cream/50 hover:text-cream hover:bg-cream/10 hover:border-stone/40 hover:rotate-90 transition-all duration-300 flex items-center justify-center"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {/* Content */}
              <div className="relative z-10 px-8 py-12 sm:px-10 sm:py-14 flex flex-col items-center text-center">
                {status !== 'success' ? (
                  <>
                    {/* Badge */}
                    <motion.span
                      className="inline-block px-5 py-1.5 mb-6 text-[9px] sm:text-[10px] font-black tracking-[0.35em] uppercase text-stone bg-stone/10 border border-stone/20 rounded-full"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      ✦ Exclusive Event ✦
                    </motion.span>

                    {/* Heading */}
                    <motion.h2
                      className="font-heading text-4xl sm:text-5xl font-black text-cream tracking-tighter leading-[1.05] mb-3 drop-shadow-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      An Evening<br />to Remember
                    </motion.h2>

                    {/* Feature pills */}
                    <motion.div
                      className="flex flex-wrap justify-center gap-2 mb-5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      {[
                        { icon: Music, text: 'Live Music' },
                        { icon: Coffee, text: 'Specialty Brews' },
                        { icon: Utensils, text: 'Curated Bites' },
                      ].map(({ icon: Icon, text }) => (
                        <span
                          key={text}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-cream/70 bg-cream/5 border border-cream/10 rounded-full"
                        >
                          <Icon size={12} className="text-stone" />
                          {text}
                        </span>
                      ))}
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                      className="w-16 h-px bg-gradient-to-r from-transparent via-stone/60 to-transparent mb-5"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />

                    {/* Date */}
                    <motion.p
                      className="flex items-center gap-2 text-cream/70 text-sm font-medium mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                    >
                      <CalendarDays size={15} className="text-stone" />
                      {EVENT_DATA.date}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      className="text-cream/40 text-sm italic mb-7 max-w-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Limited seats. Unforgettable experience. Reserve yours now.
                    </motion.p>

                    {/* Form */}
                    <motion.form
                      onSubmit={handleSubmit}
                      className="w-full flex flex-col gap-3 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      {/* Email Input */}
                      <div className="relative w-full">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone/50 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="Enter your email to grab your pass"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={status === 'loading'}
                          className="w-full pl-11 pr-5 py-4 text-sm text-cream bg-cream/5 border border-cream/10 rounded-2xl outline-none focus:border-stone/50 focus:ring-2 focus:ring-stone/10 focus:bg-cream/[0.07] placeholder:text-cream/25 transition-all duration-300 disabled:opacity-50 font-medium"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 bg-cream text-charcoal rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-linen hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(238,235,226,0.15)] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {status === 'loading' ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          'Grab Your Pass →'
                        )}
                      </button>
                    </motion.form>

                    {/* Error */}
                    {status === 'error' && (
                      <motion.p
                        className="text-red-400 text-xs font-bold mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Something went wrong. Try again.
                      </motion.p>
                    )}

                    {/* Footer text */}
                    <motion.p
                      className="text-cream/20 text-[10px] tracking-wider mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.65 }}
                    >
                      We'll never spam. Only good vibes. ☕
                    </motion.p>
                  </>
                ) : (
                  /* ─── Success State ─── */
                  <motion.div
                    className="flex flex-col items-center text-center py-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-stone mb-5 drop-shadow-[0_0_20px_rgba(143,144,138,0.5)] animate-pulse">
                      <CheckCircle2 size={56} />
                    </div>
                    <h3 className="font-heading text-3xl sm:text-4xl font-black text-cream tracking-tighter mb-2">
                      You're on the list!
                    </h3>
                    <p className="text-stone text-base mb-8">See you there ✨</p>

                    {/* Book Seats CTA */}
                    <button
                      onClick={handleBookSeats}
                      className="w-full py-4 bg-cream text-charcoal rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-linen hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(238,235,226,0.15)] active:scale-[0.98] transition-all duration-300 mb-3"
                    >
                      Book Your Seats →
                    </button>

                    <button
                      onClick={handleClose}
                      className="w-full py-4 bg-transparent border border-cream/15 text-cream/60 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-cream/5 hover:text-cream hover:border-cream/30 transition-all duration-300"
                    >
                      Maybe Later
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/5 h-px bg-gradient-to-r from-transparent via-stone/30 to-transparent z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal — reuses the existing component */}
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        event={EVENT_DATA}
      />
    </>
  );
}
