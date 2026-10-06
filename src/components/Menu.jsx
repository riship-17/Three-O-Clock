import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand, Download, ZoomIn, ZoomOut } from 'lucide-react';

// Pages rendered from the printed menu PDF (public/menu). Re-generate the images
// whenever the PDF changes, keeping the same file names.
const pageLabels = [
  'Cover',
  'Our Story',
  'Hot Beverages',
  'Cold Beverages',
  'Cold Beverages',
  'Food & Dessert',
  'Food & Dessert',
  'Food & Dessert',
  'Food & Dessert',
  'Visit Us',
  'Signature Collection',
  'Specials',
];

const pages = pageLabels.map((label, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    label,
    small: `/menu/page-${n}-800.webp`,
    large: `/menu/page-${n}-1600.webp`,
    thumb: `/menu/page-${n}-thumb.webp`,
  };
});

const categories = [
  'Hot Beverages',
  'Cold Beverages',
  'Food & Dessert',
  'Signature Collection',
  'Specials',
  'Our Story',
].map((label) => ({ label, page: pageLabels.indexOf(label) }));

const MENU_PDF = '/menu/three-oclock-menu.pdf';
const GOLD = '#DBA554';

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

// Swipe left/right on touch devices; ignored while zoomed so the user can pan.
function swipeHandler(onPrev, onNext) {
  return (_, { offset, velocity }) => {
    if (offset.x < -60 || velocity.x < -400) onNext();
    else if (offset.x > 60 || velocity.x > 400) onPrev();
  };
}

export default function Menu() {
  const [{ index, direction }, setView] = useState({ index: 0, direction: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const thumbRefs = useRef([]);

  const step = useCallback((delta) => {
    setView((v) => ({ index: (v.index + delta + pages.length) % pages.length, direction: delta }));
    setZoomed(false);
  }, []);

  const goTo = useCallback((target) => {
    setView((v) => ({ index: target, direction: target > v.index ? 1 : -1 }));
    setZoomed(false);
  }, []);

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setZoomed(false);
  }, []);

  // Preload neighbouring pages so flipping feels instant
  useEffect(() => {
    const size = isFullscreen ? 'large' : 'small';
    [index - 1, index + 1].forEach((i) => {
      const img = new Image();
      img.src = pages[(i + pages.length) % pages.length][size];
    });
  }, [index, isFullscreen]);

  // Keep the active thumbnail visible without scrolling the page
  useEffect(() => {
    const el = thumbRefs.current[index];
    const strip = el?.parentElement;
    if (!el || !strip) return;
    strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, closeFullscreen, prev, next]);

  const page = pages[index];
  const activeCategory = page.label;

  return (
    <section id="menu" className="menu-section scroll-mt-20 pt-10 pb-20 md:py-28 bg-[#0e0c0a] text-[#eeebe2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-6 md:mb-14 space-y-3 md:space-y-4">
          <p className="text-[10px] md:text-xs font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
            Three O'Clock Gandhinagar
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-7xl font-serif font-black tracking-tighter text-[#fdfcf8]"
          >
            Our Menu
          </motion.h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: `${GOLD}66` }} />
          <p className="font-sans text-[#b9b5ab] font-medium text-sm md:text-lg tracking-wide">
            Swipe through the pages, or tap a page to zoom in.
          </p>
        </div>

        {/* Category quick-jump */}
        <div className="flex sm:flex-wrap sm:justify-center gap-2 md:gap-3 mb-6 md:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-lenis-prevent>
          {categories.map((cat) => {
            const isActive = cat.label === activeCategory;
            return (
              <button
                key={cat.label}
                onClick={() => goTo(cat.page)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.15em] border transition-colors duration-300 ${
                  isActive ? 'text-black' : 'text-[#eeebe2] border-white/15 hover:border-white/40'
                }`}
                style={isActive ? { backgroundColor: GOLD, borderColor: GOLD } : undefined}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Page viewer */}
        <div className="flex items-center justify-center gap-3 md:gap-8">
          <button
            onClick={prev}
            aria-label="Previous page"
            className="hidden sm:flex shrink-0 p-4 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-full max-w-[560px] aspect-[1600/2270] rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <motion.img
                key={index}
                src={page.small}
                srcSet={`${page.small} 800w, ${page.large} 1600w`}
                sizes="(min-width: 640px) 560px, 100vw"
                alt={`Three O'Clock menu – ${page.label} (page ${index + 1} of ${pages.length})`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={swipeHandler(prev, next)}
                onClick={() => setIsFullscreen(true)}
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain cursor-zoom-in select-none touch-pan-y"
              />
            </AnimatePresence>

            <button
              onClick={() => setIsFullscreen(true)}
              aria-label="Open full screen"
              className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 backdrop-blur border border-white/15 hover:bg-black/80 transition-colors z-10"
            >
              <Expand size={18} />
            </button>
          </div>

          <button
            onClick={next}
            aria-label="Next page"
            className="hidden sm:flex shrink-0 p-4 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile controls + counter */}
        <div className="flex items-center justify-between sm:justify-center gap-6 max-w-[560px] mx-auto mt-6">
          <button
            onClick={prev}
            className="sm:hidden px-5 py-3 rounded-xl bg-white/10 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <p className="text-xs font-black tracking-[0.25em] uppercase text-[#b9b5ab]">
            {index + 1} / {pages.length}
          </p>
          <button
            onClick={next}
            className="sm:hidden px-5 py-3 rounded-xl text-black flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"
            style={{ backgroundColor: GOLD }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto max-w-3xl mx-auto mt-8 px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-lenis-prevent>
          {pages.map((p, i) => (
            <button
              key={p.thumb}
              ref={(el) => { thumbRefs.current[i] = el; }}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}: ${p.label}`}
              className={`shrink-0 w-14 md:w-16 rounded-md overflow-hidden ring-2 transition-all duration-300 ${
                i === index ? 'opacity-100' : 'ring-transparent opacity-50 hover:opacity-90'
              }`}
              style={i === index ? { '--tw-ring-color': GOLD } : undefined}
            >
              <img src={p.thumb} alt="" loading="lazy" className="w-full aspect-[1600/2270] object-cover" />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setIsFullscreen(true)}
            className="w-full sm:w-auto px-8 py-4 font-black text-xs uppercase tracking-[0.25em] text-black border-2 border-black transition-all shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] flex items-center justify-center gap-3"
            style={{ backgroundColor: GOLD }}
          >
            <Expand size={16} /> View Full Screen
          </button>
          <a
            href={MENU_PDF}
            download="Three-OClock-Menu.pdf"
            className="w-full sm:w-auto px-8 py-4 font-black text-xs uppercase tracking-[0.25em] text-[#eeebe2] border-2 border-white/25 hover:border-white/60 transition-colors flex items-center justify-center gap-3"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>
      </div>

      {/* Full-screen reader */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="menu-modal fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-xl text-[#eeebe2]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu full screen"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-3 md:py-4 border-b border-white/10">
              <div className="min-w-0">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase truncate" style={{ color: GOLD }}>
                  {page.label}
                </p>
                <p className="text-xs font-black tracking-[0.2em] uppercase text-[#b9b5ab]">
                  Page {index + 1} / {pages.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </button>
                <button
                  onClick={closeFullscreen}
                  aria-label="Close"
                  className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Page */}
            <div className="relative flex-1 min-h-0 overflow-auto overscroll-contain" data-lenis-prevent>
              <div className={`mx-auto py-4 px-2 ${zoomed ? 'w-[220%] md:w-[160%] max-w-none' : 'w-full max-w-[min(100%,calc((100vh-170px)*1600/2270))]'}`}>
                <motion.img
                  key={index}
                  src={page.large}
                  alt={`Three O'Clock menu – ${page.label} (page ${index + 1} of ${pages.length})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  drag={zoomed ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={swipeHandler(prev, next)}
                  onDoubleClick={() => setZoomed((z) => !z)}
                  draggable={false}
                  className={`w-full h-auto select-none rounded-lg ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in touch-pan-y'}`}
                />
              </div>
            </div>

            {/* Bottom nav */}
            <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-3 border-t border-white/10">
              <button
                onClick={prev}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest transition-colors"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <p className="hidden sm:block text-[10px] font-bold tracking-[0.2em] uppercase text-[#8f908a]">
                Double-tap or use the zoom button to read details
              </p>
              <button
                onClick={next}
                className="px-5 py-3 rounded-xl text-black flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"
                style={{ backgroundColor: GOLD }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
