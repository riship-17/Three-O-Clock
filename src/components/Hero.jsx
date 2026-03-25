import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="hero-section relative w-full h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {/* Dark subtle gradient overlay defined in CSS */}
        <div className="hero-overlay" />
        
        <motion.div style={{ scale }} className="h-full w-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            aria-hidden="true"
            className="hero-video"
            poster="/unnamed.webp"
          >
            <source 
              src="public/Video.mp4" 
              type="video/mp4" 
            />
            {/* Fallback for browsers that don't support video */}
            <img src="/unnamed.webp" alt="Cafe Background" className="w-full h-full object-cover" />
          </video>
        </motion.div>
      </div>

      {/* Hero Content */}
      <motion.div 
        className="hero-content relative z-20 text-center px-4 max-w-4xl mx-auto"
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="hero-heading text-5xl md:text-8xl font-black text-linen mb-6 drop-shadow-2xl tracking-tighter">
          Three O'Clock Café
        </h1>
        <p className="text-lg md:text-2xl text-linen/90 mb-10 font-medium tracking-wide drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
          Authentic Vietnamese Brews. <br className="sm:hidden" /> 
          Late Night Vibes. Aesthetic Space.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a 
            href="#menu"
            whileHover={{ scale: 1.05, backgroundColor: '#eeeee4' }}
            whileTap={{ scale: 0.95 }}
            className="hero-button px-12 py-5 bg-stone text-charcoal text-center rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 w-full sm:w-auto"
          >
            Explore Menu
          </motion.a>
          
          <motion.a 
            href="#location"
            whileHover={{ scale: 1.05, borderColor: '#eeebe2' }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-transparent border-2 border-linen/20 text-linen text-center rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-linen/10 backdrop-blur-md transition-all duration-300 w-full sm:w-auto"
          >
            Visit Us
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-linen/60">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-stone/80 to-transparent" />
      </motion.div>
    </section>
  );
}
