import { motion } from 'framer-motion';

const testimonials = [
  { text: "Open till 3 AM 🌙", detail: "The perfect late-night sanctuary." },
  { text: "Strong Vietnamese Coffee", detail: "Authentic, rich, and keeps you awake." },
  { text: "Perfect for study & chill", detail: "Cozy corners and warm lighting." },
  { text: "Live Music Nights 🎶", detail: "Acoustic vibes every weekend." }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-coffee to-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] text-burnt-orange uppercase font-semibold"
          >
            Social Proof
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-cream"
          >
            Why People Love Us
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-burnt-orange/30 hover:bg-cream/10 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-burnt-orange mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <h4 className="text-xl font-semibold text-cream mb-2">{item.text}</h4>
              <p className="text-cream/60 font-light">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
