import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="hero-section relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-charcoal px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
        
        <motion.div style={{ scale }} className="h-full w-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            aria-hidden="true"
            poster="https://res.cloudinary.com/dgry55pvk/image/upload/v1774434021/unnamed_sgww6b.webp"
            className="w-full h-full object-cover"
          >
            <source 
              src="https://res.cloudinary.com/dgry55pvk/video/upload/v1774433723/New_favourite_cafe%CC%81_unlocked_Minimal._Premium._Aesthetic._Cafe_in_Gandhinagar_New_cafe_in_G_sibvds.mp4" 
              type="video/mp4" 
            />
            {/* Fallback */}
            <img src="https://res.cloudinary.com/dgry55pvk/image/upload/v1774434021/unnamed_sgww6b.webp" alt="Cafe Interior" className="w-full h-full object-cover" />
          </video>
        </motion.div>
      </div>

      {/* Hero Content */}
      <motion.div 
        className="hero-content relative z-20 text-center w-full max-w-7xl mx-auto"
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="hero-heading text-fluid-3xl font-black text-linen mb-4 md:mb-6 drop-shadow-2xl tracking-tighter"
        >
          Three O'Clock Café
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-fluid-lg text-linen/90 mb-8 md:mb-10 font-medium tracking-wide drop-shadow-lg max-w-3xl mx-auto leading-relaxed"
        >
          Authentic Vietnamese Brews. <br className="sm:hidden" /> 
          Late Night Vibes. Aesthetic Space.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6">
          <motion.a 
            href="#menu"
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="group relative w-full sm:w-auto px-6 lg:px-14 py-4 md:py-5 overflow-hidden rounded-full border-2 border-white text-white font-black text-sm uppercase tracking-[0.2em] transition-colors duration-300 flex items-center justify-center bg-black/10 backdrop-blur-[2px] min-h-[48px]"
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
            className="group relative w-full sm:w-auto px-6 lg:px-14 py-4 md:py-5 overflow-hidden rounded-full border-2 border-white/60 text-white/90 font-black text-sm uppercase tracking-[0.2em] transition-colors duration-300 flex items-center justify-center bg-black/5 backdrop-blur-[2px] min-h-[48px]"
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
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 md:gap-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-linen/60">Scroll</span>
        <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-white/80 to-transparent" />
      </motion.div>
    </section>
  );
}
