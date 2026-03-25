import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const featuredItems = [
  {
    id: 1,
    name: 'Mushroom Bánh Mì',
    description: 'A Vietnamese street-style sandwich filled with sautéed mushrooms, fresh herbs, and crisp vegetables in a toasted baguette.',
    specialty: 'Signature Vietnamese Street Flavor',
    image: '/29recipehealth-superJumbo.jpg'
  },
  {
    id: 2,
    name: 'BBQ Paneer Veggies',
    description: 'Smoky grilled paneer tossed with vibrant vegetables, infused with bold BBQ flavors and a hint of spice.',
    specialty: "Chef's Smoky Special",
    image: '/download (9).jpeg'
  },
  {
    id: 3,
    name: 'Vietnamese Coffee with Milk',
    description: 'A rich, slow-brewed coffee using a traditional phin filter, blended with sweet condensed milk for a bold yet smooth taste.',
    specialty: 'Authentic Phin Brew',
    image: '/download (10).jpeg'
  }
];

const menuGallery = [
  '/2026-03-07 (4).webp',
  '/2026-03-07 (3).webp',
  '/2026-03-07 (2).webp',
  '/2026-03-07 (1).webp'
];

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentIndex(0);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + menuGallery.length) % menuGallery.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % menuGallery.length);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeModal, prev, next]);

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <section id="menu" className="menu-section py-24 bg-[#fdfcf8] text-[#3c3c3c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="menu-header text-center mb-24 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="menu-title text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter text-[#4B2E2E]"
          >
            Chef's Specialties
          </motion.h2>
          <div className="w-24 h-1 bg-[#4B2E2E]/30 mx-auto rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="menu-subtitle font-sans text-[#61615f] font-medium text-lg md:text-xl md:text-2xl tracking-wide mt-6"
          >
            Handpicked flavors inspired by Vietnamese café culture
          </motion.p>
        </div>

        {/* Featured Items Showcase */}
        <div className="featured-items flex flex-col gap-24 md:gap-32 lg:gap-40 mb-32 max-w-6xl mx-auto">
          {featuredItems.map((item, index) => {
            const isEven = index % 2 !== 0; // Alternating zig-zag
            return (
              <div 
                key={item.id} 
                className={`menu-item flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16 lg:gap-24`}
              >
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-1/2"
                >
                  <div className="group relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-item-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#3c3c3c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                  className="menu-item-content w-full md:w-1/2 flex flex-col items-start"
                >
                  <span className="menu-item-special inline-block px-5 py-2 mb-6 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase rounded-full bg-[#E8DCC4] text-[#4B2E2E] shadow-sm">
                    {item.specialty}
                  </span>
                  
                  <h3 className="menu-item-title text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-5 text-[#4B2E2E] leading-[1.1]">
                    {item.name}
                  </h3>
                  
                  <p className="menu-item-description font-sans text-base md:text-lg lg:text-xl text-[#61615f] leading-relaxed mb-8 max-w-lg font-medium">
                    {item.description}
                  </p>
                  
                  <button className="text-xs md:text-sm font-black tracking-[0.2em] uppercase text-[#4B2E2E] hover:text-[#2E1A1A] transition-all duration-300 flex items-center gap-2 group">
                    Explore
                    <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Centralized View Full Menu Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-10"
        >
          {/* Subtle horizontal break line */}
          <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-[#8f908a]/30 to-transparent" />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="show-menu-btn px-10 py-5 md:px-14 md:py-6 rounded-full bg-[#4B2E2E] text-[#fdfcf8] font-black text-xs md:text-sm uppercase tracking-[0.25em] hover:bg-[#2E1A1A] transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-4 focus:ring-[#4B2E2E]/40"
          >
            View Full Menu
          </motion.button>
        </motion.div>

      </div>

      {/* ─── Full-Screen Menu Modal / Slider ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="menu-modal fixed inset-0 z-[100] flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#1a1a1a]/85 backdrop-blur-2xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="modal-content relative w-full max-w-4xl bg-[#fdfcf8] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#3c3c3c]/8">
                <div>
                  <p className="text-xs font-black tracking-[0.3em] uppercase text-[#8f908a]">Three O'Clock Café</p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-[#3c3c3c]">Full Menu</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-3 rounded-full bg-[#f0ede6] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300 shadow-md"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Slider */}
              <div className="menu-slider relative px-4 py-6 md:px-8 md:py-10">

                {/* Image Stage */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[3/4] max-h-[58vh] mx-auto bg-stone-100"
                  style={{ maxWidth: '420px' }}
                >
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={menuGallery[currentIndex]}
                      alt={`Menu page ${currentIndex + 1}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="menu-image-large absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Left Arrow */}
                  <button
                    onClick={prev}
                    className="nav-arrow absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-xl backdrop-blur-md text-[#3c3c3c] hover:scale-110 transition-all duration-200 z-10"
                  >
                    <ChevronLeft size={26} />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={next}
                    className="nav-arrow absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-xl backdrop-blur-md text-[#3c3c3c] hover:scale-110 transition-all duration-200 z-10"
                  >
                    <ChevronRight size={26} />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-8">
                  {menuGallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? 'w-8 h-3 bg-[#3c3c3c]'
                          : 'w-3 h-3 bg-[#3c3c3c]/20 hover:bg-[#3c3c3c]/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <p className="text-center text-xs font-black tracking-[0.3em] uppercase text-[#8f908a] mt-4">
                  {currentIndex + 1} / {menuGallery.length}
                </p>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
