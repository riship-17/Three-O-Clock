import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-charcoal py-12 md:py-16 border-t border-cream/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-8"
        >
          <img 
            src="/logo.png" 
            alt="Three O'Clock Cafe" 
            className="h-12 md:h-16 w-auto invert brightness-200"
          />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-cream/50 uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-10 text-center font-semibold"
        >
          Brewed for the Night 🌙
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex space-x-6 mb-10 md:mb-12"
        >
          <a
            href="https://www.instagram.com/threeoclock_gandhinagar/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/60 hover:text-burnt-orange transition-colors text-xs md:text-sm tracking-wider uppercase"
          >
            Instagram
          </a>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent mb-8" />
        
        <div className="text-cream/40 text-[10px] md:text-xs tracking-wider flex flex-col sm:flex-row justify-between w-full items-center gap-4 sm:gap-0">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Three O'Clock Cafe. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
