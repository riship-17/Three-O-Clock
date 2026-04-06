import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Coffee, Users, Moon, ArrowRight, Clock, MapPin, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Masonry from '../components/Masonry';
import { useEffect, useRef } from 'react';

const masonryItems = [
  { id: '1', img: '/images/2026-03-07 (2).jpg', height: 520 },
  { id: '2', img: '/images/unnamed (4).jpg', height: 380 },
  { id: '3', img: '/images/1772095339914.jpeg', height: 460 },
  { id: '4', img: '/images/unnamed (3).jpg', height: 600 },
  { id: '5', img: '/images/2026-03-07 (3).jpg', height: 420 },
  { id: '6', img: '/images/unnamed (5).jpg', height: 340 },
];

const pillars = [
  {
    icon: Coffee,
    title: "Always Brewing",
    desc: "Open 24 hours in our flagship locations — no last call, no closing time.",
    number: "01",
  },
  {
    icon: Users,
    title: "Always Connecting",
    desc: "A space to meet, create, and share — your second home in the city.",
    number: "02",
  },
  {
    icon: Globe,
    title: "Always Growing",
    desc: "From Saigon's alleys to India's bustling streets, the ritual continues.",
    number: "03",
  },
];

// Animated number counter
function AnimatedStat({ label, value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-base md:text-xl font-black tracking-[0.3em] uppercase text-center leading-snug">
        {value}
      </span>
      {label && (
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#4B2E2E]/50 font-medium text-center">
          {label}
        </span>
      )}
    </motion.div>
  );
}

// Horizontal marquee strip
function MarqueeStrip() {
  const text = ['THREE O\'CLOCK', '·', 'EST. 2016', '·', 'SAIGON', '·', 'INDIA', '·', 'GANDHINAGAR', '·'];
  const repeated = [...text, ...text, ...text, ...text];
  return (
    <div className="overflow-hidden py-5 border-y border-olive/10 bg-black/30 relative">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap"
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className={`text-xs md:text-sm font-black tracking-[0.35em] uppercase ${
              t === '·' ? 'text-burnt-orange' : 'text-cream/30'
            }`}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutExtended() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-coffee text-cream min-h-screen overflow-x-hidden selection:bg-burnt-orange selection:text-white pb-20 md:pb-0">

      {/* ── SECTION 1 · HERO ──────────────────────────────── */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img
            src="https://res.cloudinary.com/dgry55pvk/image/upload/f_auto,q_auto,w_1920/v1774434021/unnamed_sgww6b.webp"
            alt="Cafe Atmosphere"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/50 to-black/60" />
        </motion.div>

        {/* Noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28"
        >
          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-burnt-orange/30 bg-burnt-orange/10 backdrop-blur-sm"
          >
            <Globe size={12} className="text-burnt-orange" />
            <span className="text-burnt-orange text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
              Global Vision
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,12vw,6.5rem)] font-serif font-black text-white leading-[1.05] tracking-tighter drop-shadow-2xl mb-6 md:mb-8"
          >
            Saigon Heart.<br />
            <em className="text-burnt-orange not-italic">India<br className="md:hidden" /> Soul.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-sm md:text-lg font-bold tracking-[0.22em] uppercase max-w-xl mx-auto font-sans leading-relaxed"
          >
            From the 3 AM ritual in Ho Chi Minh City to the vibrant streets of PDPU Road, Gandhinagar.
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 md:mt-20 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-12 bg-gradient-to-b from-burnt-orange to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee between sections */}
      <MarqueeStrip />

      {/* ── SECTION 2 · OUR STORY ─────────────────────────── */}
      <section className="py-24 md:py-44 relative overflow-hidden">
        {/* Decorative large faded text */}
        <div className="absolute -top-4 right-0 text-[120px] md:text-[220px] font-serif font-black text-cream/[0.03] leading-none pointer-events-none select-none translate-x-1/4">
          JOURNEY
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <h2 className="text-[10px] md:text-xs tracking-[0.45em] text-burnt-orange uppercase font-black">
              The Evolution
            </h2>

            <div className="space-y-6 text-xl md:text-2xl font-light leading-relaxed text-cream/85">
              <p>
                THREE O'CLOCK was born in Ho Chi Minh City in{' '}
                <strong className="text-cream font-black">2016</strong>. What started as a local ritual for night owls quickly transcended borders, driven by a philosophy of stillness and connection.
              </p>
              <p>
                Our entry into India marked a new chapter—beginning with Gurugram and expanding through Delhi NCR. Today, we stand as a community of <strong className="text-cream font-black">8 cafés</strong> across the nation, each maintaining our authentic Vietnamese heritage.
              </p>
            </div>

            {/* Pull quote */}
            <div className="border-l-2 border-burnt-orange pl-6 mt-4">
              <p className="text-2xl md:text-3xl font-serif font-black text-cream/90 leading-snug italic">
                "Saigon's ritual,<br />reimagined for India."
              </p>
            </div>
          </motion.div>

          {/* 2016 Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[40px] md:rounded-[56px] overflow-hidden min-h-[400px] md:min-h-[520px] group"
          >
            <img
              src="https://res.cloudinary.com/dgry55pvk/image/upload/f_auto,q_auto,w_1200/v1774673317/stores-htm-3293_poskca.png"
              alt="Three O'Clock Roots"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
              <span className="text-white/60 text-xs font-black tracking-[0.3em] uppercase">
                From 2016 to Forever
              </span>
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                <Coffee size={16} className="text-burnt-orange" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3 · THE INDIA CHAPTER ──────────────────── */}
      <section className="py-24 md:py-44 relative bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:order-2"
          >
            <div className="aspect-square rounded-[48px] overflow-hidden shadow-2xl relative border border-white/10">
              <img 
                src="https://res.cloudinary.com/dgry55pvk/image/upload/v1774672744/1772095339914_sm1iqw.jpg" 
                alt="Gandhinagar Outlet" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee/80 to-transparent" />
            </div>
            
            <div className="absolute top-10 -right-10 bg-burnt-orange p-8 rounded-[32px] shadow-2xl hidden lg:block transform rotate-6 border-4 border-coffee">
              <p className="text-4xl font-serif font-black text-white">8th</p>
              <p className="text-xs font-black uppercase tracking-widest text-white/80 leading-none">Outlet in India</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12 lg:order-1"
          >
            <div className="space-y-4">
              <h2 className="text-xs tracking-[0.4em] text-burnt-orange uppercase font-black">Present Day</h2>
              <h3 className="text-[clamp(2rem,10vw,4rem)] font-serif font-black text-cream leading-[1.1] tracking-tighter">
                Arrived in <br />
                <span className="text-white">Gandhinagar.</span>
              </h3>
            </div>

            <div className="space-y-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-cream/70">
                Our latest sanctuary has opened its doors on <strong>PDPU Road, Gandhinagar</strong>. A 1,500 sq ft space designed to be a bridge between work and ritual, bringing the authentic taste of Phin-filter coffee, Bánh Mì, and Baos to Gujarat's capital.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-[#d97706] text-xs font-black uppercase tracking-widest leading-none">Heritage</p>
                  <p className="text-cream text-lg font-serif italic">Vietnamese Beans</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#d97706] text-xs font-black uppercase tracking-widest leading-none">Signature</p>
                  <p className="text-cream text-lg font-serif italic">Vietnamese Salted & Coconut Coffee</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4 · THREE PILLARS ─────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        {/* BG texture */}
        <div className="absolute inset-0 bg-black/25" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.4) 39px, rgba(255,255,255,0.4) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.4) 39px, rgba(255,255,255,0.4) 40px)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 space-y-16 md:space-y-24">
          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-cream tracking-tighter leading-[1.05]"
            >
              A Space to Work.<br />Connect. Stay.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-lg md:text-xl font-light leading-relaxed text-cream/60 max-w-2xl mx-auto"
            >
              THREE O'CLOCK is a bridge between vibrant energy and quiet focus. Whether in Saigon or India, our mission remains: to provide a workplace, a creative sanctuary, and a community corner.
            </motion.p>
          </div>

          {/* Pillar cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative group rounded-[32px] md:rounded-[40px] overflow-hidden border border-olive/10 bg-olive/5 hover:bg-olive/10 transition-colors duration-500 p-8 md:p-10"
              >
                {/* Number watermark */}
                <div className="absolute top-6 right-8 text-6xl font-serif font-black text-cream/[0.06] leading-none select-none pointer-events-none">
                  {pillar.number}
                </div>

                {/* Icon */}
                <div className="mb-8 w-16 h-16 rounded-2xl bg-burnt-orange/10 border border-burnt-orange/20 flex items-center justify-center text-burnt-orange relative overflow-hidden">
                  <div className="absolute inset-0 bg-burnt-orange scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-left rounded-2xl" />
                  <pillar.icon size={28} strokeWidth={1.5} className="relative z-10 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-black text-cream mb-3">
                  {pillar.title}
                </h3>
                <p className="text-cream/55 font-light text-base md:text-lg leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Bottom accent line */}
                <div className="mt-8 h-px w-0 bg-burnt-orange group-hover:w-full transition-all duration-700 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 · DESIGN PHILOSOPHY ────────────────── */}
      <section className="py-24 md:py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-28 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="max-w-xl space-y-5"
            >
              <span className="text-burnt-orange text-[10px] md:text-xs font-black tracking-[0.45em] uppercase block">
                The Design Philosophy
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tighter text-cream leading-[1.05]">
                Designed to<br />Feel Different
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="text-lg md:text-xl font-light leading-relaxed text-cream/60 max-w-sm md:text-right"
            >
              Inspired by the raw energy of coffee roasting factories — an industrial style that speaks without shouting.
            </motion.p>
          </div>

          {/* Large italic quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative mb-20 md:mb-36 pl-8 border-l-2 border-burnt-orange/40"
          >
            <span className="absolute -top-6 -left-2 text-8xl font-serif text-burnt-orange/20 leading-none select-none">"</span>
            <p className="text-2xl md:text-4xl font-serif font-light italic leading-relaxed text-cream/80 max-w-5xl">
              Exposed pipes, raw bricks, bare concrete — architectural elements left intentionally visible. Rustic materials mixed with carefully chosen furniture, accent lighting, and open floor plans come together to create spaces that feel cool, comfortable, and completely alive.
            </p>
          </motion.div>

          {/* Masonry */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Masonry items={masonryItems} animateFrom="bottom" scaleOnHover />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7 · CLOSING CTA ───────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative mb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto relative rounded-[40px] md:rounded-[80px] overflow-hidden bg-[#0a0a09] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] group"
        >
          {/* BG image */}
          <img
            src="https://res.cloudinary.com/dgry55pvk/image/upload/f_auto,q_auto,w_1920/v1774434021/unnamed_sgww6b.webp"
            alt="Three O'Clock Environment"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />

          {/* Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-burnt-orange/15 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:bg-burnt-orange/25 transition-colors duration-1000" />

          {/* Decorative clock */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-10">
            <Clock size={80} className="text-burnt-orange" strokeWidth={0.5} />
          </div>

          <div className="relative z-10 px-6 py-20 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-14">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-serif font-black text-cream tracking-tighter leading-[1.05]">
                Come as you are.<br />
                <span className="text-burnt-orange italic font-light">
                  Stay as long as you need.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light text-cream/70 tracking-wide font-serif max-w-xl mx-auto lg:mx-0">
                Whether it's Saigon or Gandhinagar — there's always a seat for you at THREE O'CLOCK.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-4 w-full lg:w-auto shrink-0">
              <motion.button
                onClick={() => { window.scrollTo(0, 0); navigate('/'); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-burnt-orange text-cream px-8 py-5 md:px-10 rounded-full font-bold tracking-[0.2em] uppercase text-xs md:text-sm shadow-[0_0_40px_rgba(217,119,6,0.25)] hover:shadow-[0_0_60px_rgba(217,119,6,0.5)] transition-all duration-300 flex items-center justify-between gap-6 sm:min-w-[280px]"
              >
                <span>Explore Our Menu</span>
                <div className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center">
                  <ArrowRight size={14} />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}