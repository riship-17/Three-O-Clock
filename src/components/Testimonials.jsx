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

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="bg-[#2A2A2A] rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-white/5 relative overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-500"
            >
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex text-stone mb-4 sm:mb-6">
                  <Star fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
                  <Star fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
                  <Star fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
                  <Star fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
                  <Star fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
                </div>
                
                <p className="text-cream/90 font-serif text-base sm:text-lg md:text-xl leading-relaxed italic mb-6 sm:mb-8 font-medium">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-3 sm:gap-4 border-t border-white/10 pt-4 sm:pt-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone flex items-center justify-center text-charcoal font-black text-xs sm:text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-widest uppercase">{t.author}</h4>
                    <span className="text-stone text-[9px] sm:text-[10px] uppercase tracking-widest font-black">{t.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
