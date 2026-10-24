import { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';

// Standalone menu opened from the table QR code (/#menu, also /menu): just the printed menu
// pages stacked vertically, with quick-jump chips. Same images as the Menu section.
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
  return { label, small: `/menu/page-${n}-800.webp`, large: `/menu/page-${n}-1600.webp` };
});

const categories = [
  'Hot Beverages',
  'Cold Beverages',
  'Food & Dessert',
  'Signature Collection',
  'Specials',
].map((label) => ({ label, page: pageLabels.indexOf(label) }));

const MENU_PDF = '/menu/three-oclock-menu.pdf';
const GOLD = '#DBA554';

export default function MenuPage() {
  const [current, setCurrent] = useState(0);
  const pageRefs = useRef([]);
  const chipRefs = useRef({});
  const navRef = useRef(null);

  useEffect(() => {
    document.title = "Menu | Three O'Clock Gandhinagar";
    window.scrollTo(0, 0);
  }, []);

  // Track which page is in view so the matching category chip stays highlighted.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: '-45% 0px -55% 0px' }
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeLabel = pageLabels[current];

  // Center the active chip by scrolling only the chip row. scrollIntoView would
  // also scroll the window, which on mobile jumps the page back to the top
  // because the chips live in a sticky header.
  useEffect(() => {
    const chip = chipRefs.current[activeLabel];
    const nav = navRef.current;
    if (!chip || !nav) return;
    nav.scrollTo({ left: chip.offsetLeft - (nav.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' });
  }, [activeLabel]);

  const jumpTo = (page) => {
    pageRefs.current[page]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#1a1714] text-[#eeebe2]">
      <header className="sticky top-0 z-20 bg-[#1a1714]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: GOLD }}>
              Three O'Clock
            </p>
            <h1 className="text-xl font-serif font-black tracking-tight leading-tight">Our Menu</h1>
          </div>
          <a
            href={MENU_PDF}
            download
            className="shrink-0 px-4 py-2 rounded-full text-black flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"
            style={{ backgroundColor: GOLD }}
          >
            <Download size={14} /> PDF
          </a>
        </div>
        <nav ref={navRef} className="relative max-w-3xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(({ label, page }) => {
            const active = label === activeLabel;
            return (
              <button
                key={label}
                ref={(el) => (chipRefs.current[label] = el)}
                onClick={() => jumpTo(page)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border transition-colors duration-300 ${
                  active ? 'text-black border-transparent' : 'text-[#eeebe2] border-white/20'
                }`}
                style={active ? { backgroundColor: GOLD } : undefined}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-2 sm:px-4 py-4 flex flex-col gap-3">
        {pages.map((page, i) => (
          <section
            key={page.small}
            ref={(el) => (pageRefs.current[i] = el)}
            data-index={i}
            className="scroll-mt-28"
          >
            <img
              src={page.small}
              srcSet={`${page.small} 800w, ${page.large} 1600w`}
              sizes="(min-width: 768px) 768px, 100vw"
              width={800}
              height={1131}
              alt={`Menu page ${i + 1}: ${page.label}`}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-auto rounded-lg shadow-2xl bg-white/5"
            />
          </section>
        ))}
        <p className="text-center text-[10px] font-bold tracking-[0.25em] uppercase text-[#8f908a] py-6">
          Pinch to zoom · Ask our staff for today's specials
        </p>
      </main>
    </div>
  );
}
