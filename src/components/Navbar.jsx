import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'About', link: '#about' },
  { label: 'Menu', link: '#menu' },
  { label: 'Gallery', link: '#gallery' },
  { label: 'Events', link: '/events' },
  { label: 'Contact Us', link: '#location' },
];

const bookLink = "https://www.swiggy.com/restaurants/three-o-clock-raysan-koramangala-ahmedabad-1339878/dineout?is_retargeting=true&media_source=GoogleReserve&utm_campaign=GoogleMap&utm_source=GoogleReserve";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('/');

  // Handle sticky blur effect and active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (window.location.pathname === '/' || window.location.pathname === '') {
        const sections = menuItems.filter(item => item.link.startsWith('#')).map(i => i.link.substring(1));
        let current = '/'; 

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Is the element dominating the viewport?
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4) {
              current = `#${section}`;
            }
          }
        }
        
        // At the very top, fallback to Home
        if (window.scrollY < 100) {
          current = '/';
        }
        
        setActiveSection(current);
      } else {
        // If on another route (like /events)
        setActiveSection(window.location.pathname);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleLinkClick = (e, link) => {
    // If clicking a hash link while on the homepage, smoothly scroll to it
    if (link.startsWith('#')) {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        e.preventDefault();
        const id = link.substring(1);
        const target = document.getElementById(id);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80, // Offset for the fixed headers
            behavior: 'smooth'
          });
          window.history.pushState(null, '', link);
          setActiveSection(link);
        }
      } else {
        // If clicking a hash from another page, use react-router navigate
        e.preventDefault();
        navigate(`/${link}`);
      }
    }
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-out 
        ${isOpen ? 'bg-black !backdrop-blur-none transition-none' : scrolled ? 'bg-charcoal/90 backdrop-blur-md py-3 shadow-xl border-b border-cream/5' : 'bg-charcoal/40 backdrop-blur-sm py-5 md:py-6 border-b border-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-[110]">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            <a href="/">
              <img 
                src="https://res.cloudinary.com/dgry55pvk/image/upload/f_auto,q_auto,w_200/v1774620381/logo-footer_tudjvn.png" 

                alt="Three O'Clock" 
                className={`transition-all duration-500 ease-out invert brightness-200 object-contain 
                  ${scrolled ? 'h-11 md:h-14' : 'h-12 md:h-[84px]'}
                `}
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 font-bold xl:gap-14 pl-8">
            {menuItems.map((item, i) => {
              const isActive = activeSection === item.link;
              // Format link accurately if not on home page
              const finalLink = item.link.startsWith('#') ? `/${item.link}` : item.link;
              
              return (
                <a 
                  key={i} 
                  href={finalLink}
                  onClick={(e) => handleLinkClick(e, item.link)}
                  className={`text-base xl:text-[17px] font-bold tracking-widest uppercase transition-colors duration-300 relative group
                    ${isActive ? 'text-burnt-orange' : 'text-cream/80 hover:text-cream'}
                  `}
                >
                  {item.label}
                  {/* Underline hover effect */}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-burnt-orange transition-all duration-300 
                    ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}
                  `}/>
                </a>
              );
            })}
            
            {/* CTA Book Button */}
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 px-8 py-3.5 bg-white/10 border border-white/20 text-cream font-black text-base uppercase tracking-widest rounded-full hover:bg-burnt-orange hover:border-burnt-orange hover:text-white hover:shadow-[0_0_20px_rgba(196,85,8,0.4)] transition-all duration-300 transform active:scale-95 flex items-center gap-2"
            >
              Book Table
            </a>
          </nav>

          {/* Mobile Hamburger Touch Target */}
          <button 
            className="lg:hidden relative p-2.5 -mr-2 text-cream hover:text-burnt-orange transition-colors font-bold min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>

        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 w-full h-screen bg-black z-[100] lg:hidden flex flex-col pt-32 overflow-y-auto"
          >

            <div className="flex flex-col px-8 py-10 space-y-1">

              {menuItems.map((item, i) => {
                const isActive = activeSection === item.link;
                const finalLink = item.link.startsWith('#') ? `/${item.link}` : item.link;
                return (
                  <motion.a
                    key={i}
                    href={finalLink}
                    onClick={(e) => handleLinkClick(e, item.link)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                    className={`text-4xl font-serif tracking-tight border-b border-cream/5 py-4 transition-colors flex items-center justify-between
                      ${isActive ? 'text-burnt-orange font-bold' : 'text-cream hover:text-cream/80'}
                    `}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-cream/20">
                      0{i + 1}
                    </span>
                  </motion.a>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-10"
              >
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-16 bg-cream text-charcoal font-black text-base uppercase tracking-[0.25em] rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center shadow-[0_10px_30px_rgba(238,235,226,0.15)] hover:bg-white"
                >
                  Reserve a Table
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
