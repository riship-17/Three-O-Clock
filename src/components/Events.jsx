import { motion } from 'framer-motion';
import { useState } from 'react';
import BookingModal from './BookingModal';

const UPCOMING_EVENT = {
  title: "An Evening to Remember",
  date: "Saturday, 3rd April 2025",
  time: "7:00 PM Onwards",
  venue: "Three O'Clock Café, Gandhinagar",
  description: "An exclusive late-night gathering curated for those who appreciate the finer things — live music, artisanal Vietnamese brews, and an atmosphere that feels like a secret you'll want to share.",
  poster: "https://res.cloudinary.com/dgry55pvk/image/upload/v1774531468/SOCIAL_MEDIA_DESIGN_3.jpg_k60hoz.jpg",
  tags: ["Live Music", "Curated Menu", "Special Brews", "Limited Seats"],
};

export default function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="events" className="py-24 md:py-36 bg-charcoal relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-stone/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] text-stone uppercase font-bold"
          >
            Mark Your Calendar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-linen tracking-tighter"
          >
            Upcoming Event
          </motion.h2>
        </div>

        {/* Main Event Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[40px] overflow-hidden border border-linen/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        >
          {/* Left — Event Poster */}
          <div className="relative aspect-[4/5] lg:aspect-auto overflow-hidden group">
            <img
              src={UPCOMING_EVENT.poster}
              alt={UPCOMING_EVENT.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Bottom fade into charcoal on mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-charcoal to-transparent lg:hidden" />
          </div>

          {/* Right — Event Details */}
          <div className="flex flex-col justify-between bg-charcoal p-10 md:p-14 border-t border-linen/10 lg:border-t-0 lg:border-l">
            {/* Top meta */}
            <div className="space-y-8">
              {/* Date badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-linen/5 border border-linen/15 w-fit">
                <span className="w-2 h-2 rounded-full bg-stone animate-pulse shrink-0" />
                <span className="text-stone font-mono font-bold uppercase tracking-[0.2em] text-xs">
                  {UPCOMING_EVENT.date}
                </span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-black text-linen tracking-tight leading-none">
                  {UPCOMING_EVENT.title}
                </h3>
                <p className="text-stone font-semibold tracking-widest text-xs uppercase">
                  {UPCOMING_EVENT.time} · {UPCOMING_EVENT.venue}
                </p>
              </div>

              {/* Description */}
              <p className="text-linen/60 text-lg leading-relaxed max-w-md">
                {UPCOMING_EVENT.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {UPCOMING_EVENT.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-linen/15 text-linen/50 text-[10px] font-bold uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 space-y-4">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-linen text-charcoal rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(238,235,226,0.15)] hover:bg-white hover:shadow-[0_15px_40px_rgba(238,235,226,0.25)] transition-all duration-300"
              >
                Reserve Your Seat →
              </motion.button>
              <p className="text-center text-linen/25 text-[10px] uppercase tracking-widest font-semibold">
                Limited Capacity · First Come, First Served
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{ title: UPCOMING_EVENT.title, date: UPCOMING_EVENT.date }}
      />
    </section>
  );
}
