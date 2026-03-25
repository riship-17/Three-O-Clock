import { motion } from 'framer-motion';
import { useState } from 'react';
import BookingModal from './BookingModal';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    { title: "Acoustic Nights", date: "Every Friday, 9 PM", desc: "Unplugged melodies to soothe your soul." },
    { title: "Live Music Jams", date: "Saturdays, 10 PM", desc: "Local artists performing live." },
  ];

  const handleReserve = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <section id="events" className="py-24 bg-charcoal relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] text-stone uppercase font-bold"
          >
            Vibe With Us
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-linen tracking-tighter"
          >
            Late Night Events
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative group p-10 rounded-[40px] bg-white/5 border border-linen/10 hover:border-stone/50 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-stone/0 group-hover:bg-stone/5 transition-colors duration-500" />

              <div className="relative z-10 space-y-4">
                <span className="text-stone font-mono text-xs tracking-[0.3em] uppercase block font-bold">{event.date}</span>
                <h4 className="text-3xl font-black text-linen leading-none">{event.title}</h4>
                <p className="text-linen/60 font-light text-lg leading-relaxed">{event.desc}</p>

                <motion.button
                  onClick={() => handleReserve(event)}
                  whileHover={{ x: 5 }}
                  className="mt-8 flex items-center gap-3 text-stone font-bold tracking-widest uppercase text-xs group/btn"
                >
                  Reserve a Table
                  <span className="text-xl transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent || {}}
      />
    </section>
  );
}

