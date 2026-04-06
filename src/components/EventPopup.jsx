import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, Music, Mic2, Guitar, Drum } from 'lucide-react';
import BookingModal from './BookingModal';

const EVENT_DATA = {
  title: 'An Evening to Remember',
  date: 'Friday, 3rd April 2026',
};

const POSTER_URL = 'https://res.cloudinary.com/dgry55pvk/image/upload/f_auto,q_auto,w_800/v1774531468/SOCIAL_MEDIA_DESIGN_3.jpg_k60hoz.jpg';


// ── Floating Musical Instruments ──────────────────────────────
const MusicalInstrument = ({ Icon, x, y, rotate, delay }) => {
  return (
    <motion.div
      initial={{ scale: 0, x: 0, y: 0, rotate: 0, opacity: 0 }}
      animate={{

        scale: 1,
        x: x,
        y: y,
        rotate: rotate,
        opacity: 0.7
      }}
      transition={{
        type: "keyframes",
        damping: 12,
        stiffness: 100,
        delay: delay + 0.5 // Appears after the card
      }}
      className="absolute text-amber-500/80 pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [rotate, rotate + 5, rotate]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Icon size={120} strokeWidth={1} />
      </motion.div>
    </motion.div>
  );
};

// ── Confetti Particle Logic ──────────────────────────────────
const ConfettiPiece = ({ index }) => {
  const randomX = useMemo(() => Math.random() * 400 - 200, []);
  const randomY = useMemo(() => Math.random() * -300 - 100, []);
  const colors = ['#f59e0b', '#fbbf24', '#ffffff', '#f6ab49ff'];
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []);

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{ x: randomX, y: randomY, opacity: 0, scale: [0, 1, 0.5] }}
      transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
      className="absolute w-2 h-2 rounded-sm"
      style={{ backgroundColor: color, zIndex: 10 }}
    />
  );
};

export default function EventPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Auto show after 3 second delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => setIsVisible(false), []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Darkened Backdrop */}
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={handleClose} />

            {/* ── MUSICAL INSTRUMENTS (BEHIND CARD) ── */}
            <div className="absolute flex items-center justify-center">
              <MusicalInstrument Icon={Music} x={-220} y={-180} rotate={-15} delay={0.1} />
              <MusicalInstrument Icon={Mic2} x={240} y={-150} rotate={20} delay={0.2} />
              <MusicalInstrument Icon={Guitar} x={-240} y={150} rotate={-25} delay={0.3} />
              <MusicalInstrument Icon={Drum} x={220} y={180} rotate={15} delay={0.4} />

              {/* Extra Music Notes */}
              <MusicalInstrument Icon={Music} x={100} y={-250} rotate={10} delay={0.5} />
              <MusicalInstrument Icon={Music} x={-120} y={250} rotate={-10} delay={0.6} />
            </div>

            {/* Confetti Burst */}
            <div className="absolute pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <ConfettiPiece key={i} index={i} />
              ))}
            </div>

            {/* ── MAIN CARD ── */}
            <motion.div
              className="relative w-full max-w-[360px] h-[85vh] sm:h-auto z-20 flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* "NEW EVENT" Floating Badge */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 right-8 z-30 bg-black/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-black text-[9px] tracking-[0.2em] uppercase shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-white/30 hidden sm:block"
              >
                Techno Party
              </motion.div>

              <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] bg-white h-full flex flex-col">


                {/* Poster Image Area */}
                <div className="relative h-[35%] overflow-hidden flex-shrink-0">
                  <img src={POSTER_URL} alt="Event" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />



                </div>

                {/* Content Section */}
                <div className="relative px-5 pt-3 pb-4 text-center flex-1 flex flex-col justify-between">
                  <h3 className="text-amber-600 text-[12px] font-black tracking-[0.4em] uppercase mb-1">
                    Three O'Clock Presents
                  </h3>
                  <h2 className="text-black text-xl font-serif italic font-bold mb-2 leading-tight">
                    An Evening of <br /> Jazz & Harmony
                  </h2>

                  <div className="mb-2">
                    <p className="text-[9px] font-medium tracking-widest uppercase text-neutral-400 mb-2">
                      Entry · Per Person
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Stag – Girls Only */}
                      <button
                        onClick={() => { setSelectedCategory('Stag (Girls Only)'); setIsVisible(false); setShowBooking(true); }}
                        className="rounded-2xl border border-coffee/10 bg-linen p-3 relative overflow-hidden text-left transition-all hover:border-burnt-orange/30 hover:shadow-md cursor-pointer group active:scale-[0.98] w-full"
                      >
                        <p className="text-[9px] font-black tracking-[0.3em] uppercase text-burnt-orange mb-1">Stag</p>
                        <h4 className="text-black text-xl font-serif font-black leading-none mb-1 group-hover:text-burnt-orange transition-colors">₹499</h4>
                        <p className="text-[8px] font-bold text-coffee/60 uppercase tracking-widest">Girls Only · Per Head</p>
                        <div className="mt-2 text-[8px] font-bold tracking-widest text-[#4B2E2E]/50 uppercase bg-[#4B2E2E]/5 inline-block px-2 py-1 rounded w-full text-center group-hover:bg-burnt-orange group-hover:text-white transition-colors">
                          Tap to Register
                        </div>
                      </button>

                      {/* Couples */}
                      <button
                        onClick={() => { setSelectedCategory('Couple'); setIsVisible(false); setShowBooking(true); }}
                        className="rounded-2xl border border-white/10 bg-charcoal p-3 relative overflow-hidden text-left transition-all hover:border-burnt-orange/30 hover:shadow-md cursor-pointer group active:scale-[0.98] w-full"
                      >
                        <p className="text-[9px] font-black tracking-[0.3em] uppercase text-burnt-orange mb-1">Couples</p>
                        <h4 className="text-white text-xl font-serif font-black leading-none mb-1 group-hover:text-burnt-orange transition-colors">₹799</h4>
                        <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest">2 Persons · Per Couple</p>
                        <div className="mt-2 text-[8px] font-bold tracking-widest text-white/50 uppercase bg-white/5 inline-block px-2 py-1 rounded w-full text-center group-hover:bg-burnt-orange group-hover:text-white transition-colors">
                          Tap to Register
                        </div>
                      </button>
                    </div>

                    <p className="text-[9px] text-neutral-400 mt-2 text-center flex items-center justify-center gap-1.5 font-medium">
                      Select your pass above to secure a spot
                    </p>
                  </div>

                  {/* Enhanced Button */}
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => { setSelectedCategory(null); setIsVisible(false); setShowBooking(true); }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full py-3 rounded-xl bg-black/5 backdrop-blur-md border border-black/10 text-black font-black text-xs tracking-[0.3em] uppercase shadow-xl overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1 }}
                      />
                      <span className="relative text-black text-[13px] font-bold tracking-[0.2em] uppercase z-10 flex items-center justify-center gap-2">
                        Get Tickets Now
                      </span>
                    </motion.button>

                    <button
                      onClick={handleClose}
                      className="text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:text-slate-600 transition-colors"
                    >
                      Dismiss Invitation
                    </button>
                  </div>
                </div>
              </div>

              {/* Close Icon */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={showBooking}
        onClose={() => { setShowBooking(false); setSelectedCategory(null); setIsVisible(false); }}
        event={{ ...EVENT_DATA, category: selectedCategory }}
      />
    </>
  );
}