import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [posterVisible, setPosterVisible] = useState(true);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="hero-section relative w-full h-[100svh] min-h-[500px] flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-black/60" />

        <motion.div style={{ scale }} className="h-full w-full">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/RhQc9epEr4k?autoplay=1&mute=1&controls=0&loop=1&playlist=RhQc9epEr4k&playsinline=1&rel=0&iv_load_policy=3&modestbranding=1"
              className="absolute top-1/2 left-1/2 w-[100vw] h-[177.77vw] min-h-[100vh] min-w-[56.25vh] -translate-x-1/2 -translate-y-1/2"
              allow="autoplay; encrypted-media"
              title="Hero Background Video"
            ></iframe>
          </div>

          {/* ✅ FIXED: Poster image now ON TOP of iframe with fade-out */}
          <img
            src="https://ik.imagekit.io/zvgp583fb/unnamed_sgww6b%20(1).webp"
            alt=""
            className={`absolute inset-0 w-full h-full object-cover z-[5] transition-opacity duration-700 ease-in-out ${
              posterVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onLoad={() => {
              // Once iframe has had time to start, fade out poster
              setTimeout(() => setPosterVisible(false), 1600);
            }}
          />
        </motion.div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="hero-content relative z-20 text-center px-6 md:px-12 max-w-5xl mx-auto w-full"
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="hero-heading text-[clamp(2rem,9vw,5rem)] leading-[0.9] font-black text-linen mb-6 drop-shadow-2xl tracking-tighter"
        >
          Three O'Clock
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-linen/90 mb-10 font-medium tracking-wide drop-shadow-lg max-w-3xl mx-auto leading-relaxed px-4"
        >
          Authentic Vietnamese Brews. <br className="sm:hidden" />
          Late Night Vibes. Aesthetic Space.
        </motion.p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full max-w-md mx-auto sm:max-w-none">
          <motion.a
            href="#menu"
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 overflow-hidden rounded-full border-2 border-white text-white font-black text-sm uppercase tracking-[0.2em] transition-colors duration-300 w-full sm:w-auto flex items-center justify-center box-border bg-black/10 backdrop-blur-[2px]"
          >
            {/* Fill Layer */}
            <motion.div
              variants={{
                initial: { y: "100%" },
                hover: { y: 0 }
              }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 bg-white z-0"
            />
            {/* Text */}
            <motion.span
              variants={{
                initial: { color: "#ffffff" },
                hover: { color: "#000000" }
              }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              Explore Menu
            </motion.span>
          </motion.a>

          <motion.a
            href="#location"
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 overflow-hidden rounded-full border-2 border-white/60 text-white/90 font-black text-sm uppercase tracking-[0.2em] transition-colors duration-300 w-full sm:w-auto flex items-center justify-center box-border bg-black/5 backdrop-blur-[2px]"
          >
            {/* Fill Layer */}
            <motion.div
              variants={{
                initial: { y: "100%" },
                hover: { y: 0 }
              }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 bg-white z-0"
            />
            {/* Text */}
            <motion.span
              variants={{
                initial: { color: "#ffffff" },
                hover: { color: "#000000" }
              }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              Visit Us
            </motion.span>
          </motion.a>
        </div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[8px] sm:text-[10px] uppercase font-mono tracking-[0.4em] text-linen/60">Scroll</span>
        <div className="w-[1px] h-10 sm:h-16 bg-gradient-to-b from-stone/80 to-transparent" />
      </motion.div>
    </section>
  );
}
