import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="hero-section relative w-full h-screen min-h-[500px] flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-black/60" />
        
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
        className="hero-content relative z-20 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="hero-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-linen mb-6 drop-shadow-2xl tracking-tighter"
        >
          Three O'Clock Café
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-base sm:text-xl md:text-2xl lg:text-3xl text-linen/90 mb-10 font-medium tracking-wide drop-shadow-lg max-w-3xl mx-auto leading-relaxed"
        >
          Authentic Vietnamese Brews. <br className="sm:hidden" /> 
          Late Night Vibes. Aesthetic Space.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <motion.a 
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-button px-10 py-4 sm:px-14 sm:py-5 bg-stone text-charcoal text-center rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 w-full sm:w-auto"
          >
            Explore Menu
          </motion.a>
          
          <motion.a 
            href="#location"
            whileHover={{ scale: 1.05, borderColor: '#eeebe2' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 sm:px-14 sm:py-5 bg-transparent border-2 border-linen/20 text-linen text-center rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-linen/10 backdrop-blur-md transition-all duration-300 w-full sm:w-auto"
          >
            Visit Us
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
