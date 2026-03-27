import Masonry from './Masonry';
import { motion } from 'framer-motion';

const aestheticItems = [
  { id: "1", img: "/images/1772095339914.jpeg", height: 600, caption: "Brewed Calm" },
  { id: "2", img: "/images/2026-03-07 (2).jpg", height: 800, caption: "Morning Ritual" },
  { id: "3", img: "/images/2026-03-07 (3).jpg", height: 500, caption: "Café Details" },
  { id: "4", img: "/images/unnamed (3).jpg", height: 700, caption: "Warm Aesthetics" },
  { id: "5", img: "/images/unnamed (4).jpg", height: 900, caption: "Vietnamese Culture" },
  { id: "6", img: "/images/unnamed (2).jpg", height: 650, caption: "Quiet Corner" },
  { id: "7", img: "/images/unnamed (5).jpg", height: 550, caption: "Everyday Moments" }
];

export default function Gallery() {
  return (
    <section id="gallery" className="aesthetic-section py-24 md:py-32 bg-[#fdfcf8] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Header */}
        <div className="aesthetic-header text-center mb-16 md:mb-24 space-y-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter text-[#4B2E2E]"
          >
            Aesthetic Corner
          </motion.h2>
          <div className="w-24 h-1 bg-[#4B2E2E]/30 mx-auto rounded-full" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="font-sans text-[#61615f] font-medium text-lg md:text-xl lg:text-2xl tracking-wide mt-6"
          >
            Moments brewed with culture and calm
          </motion.p>
        </div>

        {/* Masonry Grid Setup */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="aesthetic-grid w-full relative"
        >
          <Masonry
            items={aestheticItems}
            ease="power4.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </motion.div>
        
      </div>
    </section>
  );
}
