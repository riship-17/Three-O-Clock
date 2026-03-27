import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import BookingModal from './BookingModal';
import CountUp from './CountUp';

const UPCOMING_EVENT = {
  title: "An Evening to Remember",
  date: "Friday, 3rd April 2026", // Updated to 2026 for active countdown
  time: "5:00 PM Onwards",
  targetDate: "2026-04-03T17:00:00",
  venue: "Three O'Clock Café, Gandhinagar",
  description: "An exclusive late-night gathering curated for those who appreciate the finer things — live music, artisanal Vietnamese brews, and an atmosphere that feels like a secret you'll want to share.",
  poster: "https://res.cloudinary.com/dgry55pvk/image/upload/v1774531468/SOCIAL_MEDIA_DESIGN_3.jpg_k60hoz.jpg",
  tags: ["Live Music", "Curated Menu", "Special Brews", "Limited Seats"],
};

export default function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(UPCOMING_EVENT.targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeSegments = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

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
            {/* Ambient vignette on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent pointer-events-none" />
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

            {/* Countdown & CTA */}
            <div className="mt-10 space-y-8">
              {/* Countdown Timer */}
              <div className="space-y-4">
                <p className="text-stone text-[10px] uppercase tracking-[0.4em] font-black">Book Fast · Time Remaining</p>
                <div className="grid grid-cols-4 gap-4">
                  {timeSegments.map((segment, idx) => (
                    <div key={idx} className="flex flex-col items-center p-4 rounded-2xl bg-linen/5 border border-linen/10">
                      <div className="text-2xl md:text-3xl font-black text-linen mb-1 font-mono">
                        <CountUp 
                          from={segment.value + 1} 
                          to={segment.value} 
                          duration={0.5} 
                          startWhen={true} 
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-stone font-bold">{segment.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
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
