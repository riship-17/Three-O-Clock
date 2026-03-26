import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-coffee/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Side - Order 2 on mobile, 1 on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] rounded-[24px] md:rounded-[40px] overflow-hidden relative shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dgry55pvk/image/upload/v1774434021/unnamed_sgww6b.webp" 
                alt="Cafe Details" 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-coffee/60 to-transparent mix-blend-multiply pointer-events-none" />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-olive rounded-full -z-10 opacity-40 blur-3xl hidden md:block" />
          </motion.div>

          {/* Text Side - Order 1 on mobile, 2 on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6 md:space-y-10 order-1 lg:order-2"
          >
            <div className="space-y-3">
              <h2 className="text-xs md:text-sm tracking-[0.4em] text-burnt-orange uppercase font-black">
                Our Story
              </h2>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-cream leading-tight tracking-tighter">
                Where coffee <br /> meets art.
              </h3>
            </div>
            
            <div className="space-y-6 max-w-xl">
              <p className="text-cream/80 text-lg md:text-xl font-light leading-relaxed">
                Designed for late-night thinkers, creators, and coffee lovers. Three O'Clock Cafe isn't just a place to grab a drink; it's a sanctuary for those who find their rhythm when the rest of the world goes to sleep.
              </p>
              <p className="text-cream/80 text-lg md:text-xl font-light leading-relaxed">
                We specialize in authentic Vietnamese brews, serving strong, rich flavors that keep your ideas flowing till the early morning hours.
              </p>
            </div>

            <div className="pt-4 md:pt-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-4 text-cream font-bold tracking-[0.2em] uppercase text-xs md:text-sm"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-cream/30 flex items-center justify-center group-hover:bg-cream group-hover:text-coffee transition-all duration-300 shadow-xl">
                  <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <span>Read more about us</span>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
