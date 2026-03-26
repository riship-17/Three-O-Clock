import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ShinyText from './ShinyText';
import BorderGlow from './BorderGlow';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['About', 'Menu', 'Gallery', 'Events', 'Location'];

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="navbar fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-coffee/80 border-b border-cream/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            <a href="/">
              <img
                src="/logo.png"
                alt="Three O'Clock Cafe"
                className="h-12 w-auto invert brightness-200"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <a
                  key={link}
                  href={link === 'Events' ? '/events' : `/#${link.toLowerCase()}`}
                  className="nav-item text-cream/80 hover:text-burnt-orange px-3 py-2 rounded-md font-medium text-sm tracking-widest uppercase transition-all duration-300 relative group"
                >
                  {link === 'Events' ? (
                    <span className="relative inline-flex items-center gap-2">
                      <ShinyText
                        text={link}
                        speed={2.5}
                        delay={0.5}
                        color="#eeebe2" 
                        shineColor="#ffffff"
                        spread={110}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={true}
                        disabled={false}
                        className="nav-events group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] font-bold text-cream"
                      />
                      <span className="flex items-center justify-center px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest bg-cream text-coffee rounded-sm shadow-[0_0_10px_rgba(238,235,226,0.5)] animate-pulse">
                        New
                      </span>
                    </span>
                  ) : (
                    link
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* CTAs and Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <BorderGlow
                edgeSensitivity={20}
                glowColor="30 60 70"
                backgroundColor="#4B2E2E"
                borderRadius={24}
                glowRadius={25}
                glowIntensity={1.5}
                coneSpread={25}
                animated={true}
                colors={['#eeebe2', '#E8DCC4', '#d97706']}
                className="w-full cursor-pointer hover:border-cream/40 transition-colors duration-300"
              >
                <a
                  href="https://www.swiggy.com/restaurants/1339878/dineout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-6 py-2.5 text-[#eeebe2] hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-bold"
                >
                  Book Slot
                </a>
              </BorderGlow>
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu}
                className="text-cream p-2 focus:outline-none z-50"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-coffee z-40 flex flex-col items-center justify-center space-y-8 md:hidden text-center"
          >
            {links.map((link) => (
              <motion.a
                key={link}
                href={link === 'Events' ? '/events' : `/#${link.toLowerCase()}`}
                onClick={toggleMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-cream tracking-[0.2em] uppercase hover:text-burnt-orange transition-colors"
                transition={{ delay: 0.1 }}
              >
                {link}
              </motion.a>
            ))}
            <div className="pt-8">
              <a
                href="https://www.swiggy.com/restaurants/1339878/dineout"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-burnt-orange text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-xl"
              >
                Book Slot
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
