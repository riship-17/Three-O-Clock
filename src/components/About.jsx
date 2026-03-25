import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-coffee/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <img 
                src="public/unnamed.webp" 
                alt="Cafe Details" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-coffee/60 to-transparent mix-blend-multiply" />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-olive rounded-2xl -z-10 opacity-50 blur-2xl" />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm tracking-[0.3em] text-burnt-orange uppercase font-semibold">
                Our Story
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-cream leading-tight">
                A place where coffee meets art.
              </h3>
            </div>
            
            <p className="text-cream/70 text-lg font-light leading-relaxed">
              Designed for late-night thinkers, creators, and coffee lovers. Three O'Clock Cafe isn't just a place to grab a drink; it's a sanctuary for those who find their rhythm when the rest of the world goes to sleep.
            </p>
            <p className="text-cream/70 text-lg font-light leading-relaxed">
              We specialize in authentic Vietnamese brews, serving strong, rich flavors that keep your ideas flowing till the early morning hours.
            </p>

            <div className="pt-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 text-cream font-medium tracking-wider"
              >
                <div className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center group-hover:bg-cream/10 transition-colors">
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
