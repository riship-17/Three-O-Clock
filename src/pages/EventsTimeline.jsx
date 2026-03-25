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
    videoSrc: '/videos/video2.mp4',
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

  // Intro is full-width centered
  if (isIntro) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="timeline-item relative flex flex-col items-center gap-8 max-w-2xl mx-auto text-center"
      >
        {/* Dot */}
        <div className="timeline-dot absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#d97706] shadow-[0_0_24px_6px_rgba(217,119,6,0.5)] border-4 border-[#fdfcf8] z-10" />

        {/* Video */}
        <div
          className="event-video relative w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.35)] cursor-pointer group"
          onClick={() => onPlay(event)}
        >
          <video
            src={event.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            onMouseOver={e => e.target.play()}
            onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 text-[#4B2E2E] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="event-content space-y-3 px-4">
          <span className="inline-block text-[#d97706] text-xs font-bold tracking-[0.25em] uppercase">{event.date}</span>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#4B2E2E]">{event.title}</h3>
          <p className="text-[#61615f] leading-relaxed text-lg italic">"{event.desc}"</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className={`timeline-item event-card relative flex flex-col md:flex-row items-start gap-10 md:gap-16 ${isRight ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Dot */}
      <div className="timeline-dot absolute left-[calc(50%-10px)] md:left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-[#E8DCC4] shadow-[0_0_18px_4px_rgba(232,220,196,0.7)] border-4 border-[#fdfcf8] z-10 hidden md:block" />
      {/* Mobile dot */}
      <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-[#E8DCC4] shadow-[0_0_12px_3px_rgba(232,220,196,0.6)] border-2 border-[#fdfcf8] z-10 md:hidden" />

      {/* Video half */}
      <div className="event-video w-full md:w-1/2">
        <div
          className="relative rounded-2xl md:rounded-[28px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.4)] cursor-pointer group"
          onClick={() => onPlay(event)}
        >
          <video
            src={event.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            onMouseOver={e => e.target.play()}
            onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Golden overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4B2E2E]/40 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 text-[#4B2E2E] flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] transform group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>
          {/* Bottom label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
            <p className="text-white/90 text-xs font-bold tracking-[0.2em] uppercase">{event.date} · {event.artist}</p>
          </div>
        </div>
      </div>

      {/* Content half */}
      <div className={`event-content w-full md:w-1/2 space-y-5 pl-8 md:pl-0 ${isRight ? 'md:text-right md:items-end' : ''} flex flex-col`}>
        {/* Tags */}
        <div className={`flex flex-wrap gap-2 ${isRight ? 'md:justify-end' : ''}`}>
          {event.tags.map(tag => (
            <span key={tag} className="text-[#d97706] bg-[#d97706]/10 border border-[#d97706]/30 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Date label */}
        <span className="text-[#4B2E2E]/50 text-xs tracking-[0.3em] uppercase font-bold">{event.date}</span>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#4B2E2E] leading-tight">
          {event.title}
        </h3>

        {/* Divider */}
        <div className={`w-16 h-[2px] bg-gradient-to-r from-[#d97706] to-[#E8DCC4] rounded-full ${isRight ? 'md:ml-auto' : ''}`} />

        {/* Description */}
        <p className="text-[#61615f] leading-relaxed text-lg font-light max-w-md">
          {event.desc}
        </p>

        {/* Click-to-play note */}
        <button
          onClick={() => onPlay(event)}
          className={`inline-flex items-center gap-2 text-[#4B2E2E] hover:text-[#d97706] font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${isRight ? 'md:self-end' : 'self-start'}`}
        >
          <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
            <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
          </div>
          Watch Performance
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

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setActiveVideo(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="events-page bg-[#fdfcf8] min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[600px] flex items-end justify-center bg-black overflow-hidden">
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-75 pointer-events-none"
        >
          <source src="public/videos/video2.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4B2E2E]/30 via-transparent to-[#4B2E2E]/30" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 pb-24 md:pb-32 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[#E8DCC4] text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6"
          >
            Featuring Offbeat, Vhalam Band &amp; Local Artists
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[0.95] tracking-tight drop-shadow-2xl mb-6"
          >
            A Night to<br />
            <span className="text-[#E8DCC4]">Remember</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="text-white/75 text-lg md:text-2xl font-light tracking-wide"
          >
            Where music, people, and moments came alive
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <a href="#timeline" className="text-white/40 hover:text-[#E8DCC4] transition-colors duration-300">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                <ChevronDown size={32} />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────── */}
      <section id="timeline" className="timeline relative py-32 md:py-48">

        {/* Section heading */}
        <div className="text-center mb-24 px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#d97706] text-xs tracking-[0.4em] uppercase font-bold mb-4"
          >
            Live Music Night · March 2026
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl font-serif font-black text-[#4B2E2E] tracking-tight"
          >
            The Night's Journey
          </motion.h2>
        </div>

        {/* Center vertical line */}
        <div className="timeline-line absolute left-4 md:left-1/2 top-40 bottom-16 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-[#d97706]/80 via-[#E8DCC4]/40 to-transparent rounded-full" />

        {/* Timeline items */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-28 md:space-y-40">
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

      {/* ── CAPTURED MOMENTS (MASONRY) ───────────────── */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-[#fdfcf8] to-[#f5ede0]/40 border-t border-[#4B2E2E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#d97706] text-xs tracking-[0.4em] uppercase font-bold mb-3"
            >
              Captured Moments
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-black text-[#4B2E2E] tracking-tight"
            >
              Fragments of the Night
            </motion.h2>
            <p className="text-[#61615f] mt-4 text-lg font-light">Every frame tells a story.</p>
          </div>
          <Masonry
            items={masonryItems}
            ease="power4.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </section>

      {/* ── VIDEO MODAL ───────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/96 backdrop-blur-lg p-4"
            onClick={() => setActiveVideo(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-[201] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.7)] bg-black"
              onClick={e => e.stopPropagation()}
            >
              <video
                ref={modalRef}
                controls
                autoPlay
                playsInline
                src={activeVideo.videoSrc}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
              {/* Modal caption */}
              <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <p className="text-[#E8DCC4] text-xs font-bold tracking-[0.25em] uppercase mb-1">{activeVideo.date}</p>
                <p className="text-white font-serif font-bold text-xl">{activeVideo.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
