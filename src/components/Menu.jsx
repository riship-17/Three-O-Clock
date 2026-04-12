import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const featuredItems = [
  {
    id: 1,
    name: 'Vietnamese Coffee with Condensed Milk',
    description: 'The drink that started it all. Strong Vietnamese oolong-roasted coffee dripped slow through a phin filter, sweetened with silky condensed milk — bold, rich, and unapologetically authentic. One phin. One pour. A hundred years of Vietnamese coffee culture.',
    specialty: "The Original Three O'Clock Ritual",
    image: 'https://res.cloudinary.com/dgry55pvk/image/upload/v1775972975/Whisk_575a69de62e19f097114e055dad5eaf5dr_rloajr.png'
  },
  {
    id: 2,
    name: 'Espresso Tiramisu',
    description: 'Layers of espresso-soaked sponge, velvety mascarpone, and a dusting of dark cocoa — our Tiramisu is built for the ones who take their coffee seriously, even in dessert form. Espresso soaked. Mascarpone layered. Worth every late night.',
    specialty: 'A Little Italy in Your Moment',
    image: 'https://res.cloudinary.com/dgry55pvk/image/upload/v1775973517/Whisk_cb2f57f4cf0bbeb9b7940eac57f97a1ddr_isabpz.png'
  },
  {
    id: 3,
    name: 'Oolong Pandan Tea',
    description: "Rooted in Southeast Asian tradition, our Oolong Pandan is slow-brewed with whole pandan leaves and premium Vietnamese oolong — earthy, fragrant, and made for the quiet hours. Pandan meets oolong. Vietnam meets your 3 AM.",
    specialty: "Vietnam's Favorite Pairing",
    image: 'https://res.cloudinary.com/dgry55pvk/image/upload/v1775972480/Whisk_1171fbddbbd32a4a3084fba3bcbf12f4dr_pyuzhb.png'
  }
];

const menuGallery = [
  'https://res.cloudinary.com/dgry55pvk/image/upload/v1774959548/Screenshot_2026-03-31_at_5.47.20_PM_tsvf50.png',
  'https://res.cloudinary.com/dgry55pvk/image/upload/v1774959539/Screenshot_2026-03-31_at_5.47.29_PM_ambh9w.png',
  'https://res.cloudinary.com/dgry55pvk/image/upload/v1774959556/Screenshot_2026-03-31_at_5.47.37_PM_wnwcw7.png',
  'https://res.cloudinary.com/dgry55pvk/image/upload/v1774959536/Screenshot_2026-03-31_at_5.47.44_PM_fpeokb.png',

  'https://res.cloudinary.com/dgry55pvk/image/upload/v1774959543/Screenshot_2026-03-31_at_5.47.50_PM_qkg3lk.png',
  'https://res.cloudinary.com/dgry55pvk/image/upload/v1774959563/Screenshot_2026-03-31_at_5.47.54_PM_bd6mud.png'
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
    <section id="menu" className="menu-section py-20 md:py-32 bg-[#fdfcf8] text-[#3c3c3c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-28 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter text-[#4B2E2E]"
          >
            Chef's Specialties
          </motion.h2>
          <div className="w-24 h-1 bg-[#4B2E2E]/30 mx-auto rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="font-sans text-[#61615f] font-medium text-lg md:text-xl lg:text-2xl tracking-wide mt-6"
          >
            Handpicked flavors inspired by Vietnamese café culture
          </motion.p>
        </div>

        {/* Featured Items — true zig-zag on desktop, stacked on mobile */}
        <div className="flex flex-col gap-24 md:gap-40 mb-24">
          {featuredItems.map((item, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 lg:gap-24`}
              >
                {/* Image — square crop to show food beautifully */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="group relative w-full rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.18)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* subtle dark vignette at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 flex flex-col ${isReversed ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center px-2`}>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-block px-5 py-2 mb-6 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase rounded-full bg-[#E8DCC4] text-[#4B2E2E] shadow-sm"
                  >
                    {item.specialty}
                  </motion.span>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.7 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight mb-6 text-[#4B2E2E] leading-tight"
                  >
                    {item.name}
                  </motion.h3>

                  {/* Divider line */}
                  <div className={`w-16 h-[2px] bg-[#4B2E2E]/20 mb-6 ${isReversed ? 'md:ml-auto' : ''}`} />

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="font-sans text-base md:text-lg text-[#61615f] leading-relaxed mb-10 font-medium opacity-80 max-w-md"
                  >
                    {item.description}
                  </motion.p>

                 
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View Full Menu Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-10"
        >
          <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-[#4B2E2E]/20 to-transparent" />
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-6 rounded-full bg-[#4B2E2E] text-[#fdfcf8] font-black text-sm uppercase tracking-[0.25em] hover:bg-[#2E1A1A] transition-all duration-500 shadow-2xl focus:outline-none"
          >
            View Full Menu
          </motion.button>
        </motion.div>

      </div>

      {/* Modal — unchanged */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="menu-modal fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#1a1a1a]/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 250, damping: 30 }}
              className="relative w-full max-w-6xl bg-[#fdfcf8] rounded-[48px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-10 py-8 border-b border-[#3c3c3c]/8">
                <div>
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#8f908a] mb-1">Three O'Clock Café</p>
                  <h3 className="text-3xl font-black tracking-tighter text-[#3c3c3c]">Digital Menu</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-4 rounded-full bg-[#f0ede6] hover:bg-black hover:text-white transition-all duration-300"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Slider */}
              <div className="flex-1 relative px-4 py-6 md:px-12 md:py-12 overflow-y-auto min-h-0 flex flex-col items-center">
                <div className="relative overflow-hidden rounded-[32px] shadow-2xl w-full aspect-[4/5] md:aspect-[3/4] max-w-2xl max-h-[80vh] bg-stone-100">
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
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full object-contain bg-charcoal/5"
                    />
                  </AnimatePresence>
                  <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 hover:bg-white shadow-2xl text-black hover:scale-110 transition-all z-10 hidden sm:flex">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 hover:bg-white shadow-2xl text-black hover:scale-110 transition-all z-10 hidden sm:flex">
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Mobile Arrows */}
                <div className="flex justify-between w-full max-w-2xl mt-8 sm:hidden px-4">
                  <button onClick={prev} className="p-5 rounded-2xl bg-black/5 text-black flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest">
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <button onClick={next} className="p-5 rounded-2xl bg-black text-white flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest">
                    Next <ChevronRight size={16} />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-4 mt-10 mb-4">
                  {menuGallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-12 bg-black' : 'w-3 bg-black/10'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}