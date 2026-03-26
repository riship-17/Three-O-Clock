import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Play, X, ChevronDown } from 'lucide-react';
import Masonry from '../components/Masonry';

// ─── Data ───────────────────────────────────────────────────────────────────

const timeline = [
  {
    id: 'intro',
    type: 'intro',
    date: 'Evening Opener',
    title: 'The Night Begins',
    tags: [],
    artist: null,
    desc: 'As the evening unfolded, the café transformed into a space of rhythm and connection. Warm lights, clinking cups, and the quiet hum of anticipation.',
    videoSrc: 'https://res.cloudinary.com/dgry55pvk/video/upload/v1774433227/If_you_weren_t_here_you_missed_this.Raw_unfiltered_moments_from_our_live_music_night_at_Three_ysbchl.mp4',
    side: 'center',
  },
  {
    id: 1,
    type: 'performance',
    date: 'First Set',
    title: 'Offbeat – PDEU Band',
    tags: ['College Energy', 'Live Fusion'],
    artist: 'Offbeat',
    desc: 'A vibrant performance by Offbeat, the talented band from PDEU, setting the tone for the night with youthful energy and dynamic sounds that had the entire café on their feet.',
    videoSrc: '/videos/video1.mp4',
    side: 'left',
  },
  {
    id: 2,
    type: 'performance',
    date: 'Second Set',
    title: 'Vhalam Band',
    tags: ['Local Vibes', 'Soulful Sound'],
    artist: 'Vhalam Band',
    desc: 'Vhalam Band brought a soulful and grounded performance, blending local musical essence with powerful stage presence that resonated deeply with the audience.',
    videoSrc: '/videos/video3.mp4',
    side: 'right',
  },
  {
    id: 3,
    type: 'performance',
    date: 'Closing Set',
    title: 'Local Artist Performance',
    tags: ['Raw Talent', 'Intimate Set'],
    artist: 'Local Artist',
    desc: 'A heartfelt solo performance that closed the night on a high note, creating an intimate and unforgettable connection between the artist and audience.',
    videoSrc: '/videos/video4.mp4',
    side: 'left',
  },
];

const masonryItems = [
  { id: '1', img: '/images/2026-03-07 (2).jpg', height: 520 },
  { id: '2', img: '/images/unnamed (4).jpg', height: 380 },
  { id: '3', img: '/images/1772095339914.jpeg', height: 460 },
  { id: '4', img: '/images/unnamed (3).jpg', height: 600 },
  { id: '5', img: '/images/2026-03-07 (3).jpg', height: 420 },
  { id: '6', img: '/images/unnamed (5).jpg', height: 340 },
];

// ─── Video Card ──────────────────────────────────────────────────────────────

function VideoCard({ event, onPlay, isIntro }) {
  const isLeft = event.side === 'left';
  const isRight = event.side === 'right';

  if (isIntro) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="timeline-item relative flex flex-col items-center gap-8 max-w-2xl mx-auto text-center px-4"
      >
        {/* Intro Dot */}
        <div className="timeline-dot absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#d97706] shadow-[0_0_24px_6px_rgba(217,119,6,0.5)] border-4 border-[#fdfcf8] z-10" />

        {/* Video Area */}
        <div
          className="event-video relative w-full rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl cursor-pointer group"
          onClick={() => onPlay(event)}
        >
          <video
            src={event.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Intro Text */}
        <div className="event-content space-y-4">
          <span className="inline-block text-[#d97706] text-xs font-black tracking-[0.3em] uppercase">{event.date}</span>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#4B2E2E] tracking-tight">{event.title}</h3>
          <p className="text-[#61615f] leading-relaxed text-lg italic max-w-xl mx-auto opacity-70">"{event.desc}"</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`timeline-item event-card relative flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-24 ${isRight ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Visual connection dot on desktop */}
      <div className="timeline-dot absolute left-[calc(50%-10px)] md:left-1/2 -translate-x-1/2 top-10 w-5 h-5 rounded-full bg-[#E8DCC4] border-4 border-[#fdfcf8] z-10 hidden lg:block" />

      {/* Video Container */}
      <div className="event-video w-full lg:w-1/2">
        <div
          className="relative rounded-[24px] lg:rounded-[40px] overflow-hidden shadow-2xl cursor-pointer group"
          onClick={() => onPlay(event)}
        >
          <video
            src={event.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl transform opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>
          {/* Mobile persistent play icon */}
          <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full text-black lg:hidden">
             <Play size={18} fill="currentColor" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <p className="text-white text-[10px] font-black tracking-widest uppercase">{event.date} · {event.artist}</p>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className={`event-content w-full lg:w-1/2 space-y-6 flex flex-col ${isRight ? 'lg:text-right lg:items-end' : ''}`}>
        <div className={`flex flex-wrap gap-2 ${isRight ? 'lg:justify-end' : ''}`}>
          {event.tags.map(tag => (
            <span key={tag} className="text-[#d97706] bg-[#d97706]/5 border border-[#d97706]/20 text-[10px] font-black uppercase px-4 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#4B2E2E] tracking-tighter leading-none">
          {event.title}
        </h3>
        <p className="text-[#61615f] leading-relaxed text-lg font-light max-w-md opacity-80">
          {event.desc}
        </p>
        <button
          onClick={() => onPlay(event)}
          className={`group inline-flex items-center gap-4 text-black hover:text-[#d97706] font-black text-xs tracking-widest uppercase transition-all ${isRight ? 'lg:self-end' : 'self-start'}`}
        >
          <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-current group-hover:text-white transition-all">
            <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
          </div>
          Watch Now
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function EventsTimeline() {
  const [activeVideo, setActiveVideo] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (activeVideo && modalRef.current) {
      modalRef.current.play().catch(() => {});
    }
  }, [activeVideo]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setActiveVideo(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="events-page bg-[#fdfcf8] min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[640px] flex items-end justify-center bg-black overflow-hidden">
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          poster="https://res.cloudinary.com/dgry55pvk/image/upload/v1774434021/unnamed_sgww6b.webp"
        >
          <source src="https://res.cloudinary.com/dgry55pvk/video/upload/v1774433227/If_you_weren_t_here_you_missed_this.Raw_unfiltered_moments_from_our_live_music_night_at_Three_ysbchl.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        <div className="relative z-10 text-center px-6 pb-20 md:pb-32 max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#E8DCC4] text-[10px] md:text-sm font-black tracking-[0.5em] uppercase mb-8"
          >
            A Selection of Live Experiences
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl mb-8"
          >
            Fragments <br />
            <span className="text-[#E8DCC4]">of Light</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          >
            A vertical journey through the soulful sounds and late-night rhythms of our home.
          </motion.p>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-16">
            <ChevronDown size={36} className="text-white/30 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────── */}
      <section id="timeline" className="timeline relative py-32 md:py-60">
        
        {/* Section Title */}
        <div className="text-center mb-32 px-4">
          <h2 className="text-5xl md:text-7xl font-serif font-black text-[#4B2E2E] tracking-tighter">The Journey</h2>
        </div>

        {/* Center line (Desktop Only) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-48 w-px bg-gradient-to-b from-[#d97706] to-transparent hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 md:space-y-64">
          {timeline.map((event) => (
            <VideoCard
              key={event.id}
              event={event}
              onPlay={setActiveVideo}
              isIntro={event.type === 'intro'}
            />
          ))}
        </div>
      </section>

      {/* ── CAPTURED ─────────────────────────────────── */}
      <section className="py-24 md:py-48 bg-[#1a1a1a] text-[#fdfcf8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#d97706] text-xs font-black tracking-[0.4em] uppercase mb-4 block">Archive 001</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter">Captured Memories</h2>
            </div>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-xs md:text-right">
              Still frames that define the atmosphere of late night Gandhinagar.
            </p>
          </div>
          <Masonry
            items={masonryItems}
            animateFrom="bottom"
            scaleOnHover
          />
        </div>
      </section>

      {/* ── MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 z-[201] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-black"
              onClick={e => e.stopPropagation()}
            >
              <video
                ref={modalRef}
                controls
                autoPlay
                playsInline
                src={activeVideo.videoSrc}
                className="w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
