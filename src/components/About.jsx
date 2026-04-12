import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee, MapPin, Users, ArrowRight } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Founded', value: '2016', icon: Coffee },
    { label: 'Cafés in India', value: '8', icon: MapPin },
    { label: 'Gandhinagar Space', value: '1,500 sq ft', icon: Users },
  ];

  return (
    <section id="about" className="py-24 md:py-40 relative overflow-hidden bg-[#fdfcf8]">

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Sans:wght@300;400;700&display=swap');
        .img-zoom img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .img-zoom:hover img { transform: scale(1.04); }
      `}</style>

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#3c2a21]/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#435334]/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── NEW: thin amber rule at top ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d97706] to-transparent" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {/* ── NEW: eyebrow with flanking dashes ── */}
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#d97706]" />
                <h2 className="text-[#d97706] text-xs md:text-sm font-black tracking-[0.4em] uppercase" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                  The Origin Story
                </h2>
                <div className="h-px w-8 bg-[#d97706]" />
              </div>

              {/* ── Playfair Display headline, italic second line ── */}
              <h3
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-[clamp(1.75rem,8vw,5.5rem)] font-black text-[#3c2a21] leading-[1.05] tracking-tighter"
              >
                Born in Saigon,{' '}
                <br />
                <em className="text-[#435334]">Rooted in Stillness.</em>
              </h3>
            </div>

            {/* ── NEW: left amber border on quote ── */}
            <p className="text-[#61615f] text-lg md:text-xl font-light leading-relaxed max-w-xl italic border-l-4 border-[#d97706]/50 pl-5" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              "Founded in Ho Chi Minh City in 2016, Three O'Clock Café was built around the '3 AM coffee ritual' — a moment to pause, connect, and find stillness in the rhythm of the night."
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-5 py-2 bg-[#3c2a21] text-[#fdfcf8] text-[10px] font-bold uppercase tracking-widest rounded-full" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Authentic Vietnamese</span>
              <span className="px-5 py-2 border border-[#3c2a21]/20 text-[#3c2a21] text-[10px] font-bold uppercase tracking-widest rounded-full" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Craft Coffee</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full"
          >
            {/* ── Image with zoom-on-hover ── */}
            <div className="img-zoom aspect-[4/3] w-full rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl relative">
              <img
                src="https://res.cloudinary.com/dgry55pvk/image/upload/f_auto,q_auto,w_1200/v1774434021/unnamed_sgww6b.webp"
                alt="Vietnamese Cafe Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3c2a21]/40 to-transparent" />

              {/* ── NEW: Est. badge ── */}
              <div className="absolute top-5 right-5 bg-[#d97706] text-white text-[9px] font-black tracking-widest uppercase px-4 py-2 rounded-full shadow-lg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                Est. 2016
              </div>
            </div>

            {/* Floating Detail */}
            <div className="absolute -bottom-8 -left-8 bg-[#fdfcf8] p-8 rounded-3xl shadow-xl hidden md:block max-w-[280px] border border-[#3c2a21]/5">
              <p className="text-[#3c2a21] font-serif font-bold text-xl mb-2">Our Ritual</p>
              <p className="text-[#61615f] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Bringing authentic Ho Chi Minh City coffee traditions to the modern seeker.</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 md:mb-40 py-12 border-y border-[#3c2a21]/10"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-[#3c2a21]/5 flex items-center justify-center text-[#d97706] group-hover:bg-[#d97706] group-hover:text-white transition-all duration-500">
                <stat.icon size={28} />
              </div>
              <div>
                {/* ── Playfair for stat numbers ── */}
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl font-black text-[#3c2a21]">{stat.value}</p>
                <p className="text-[#61615f] text-[10px] uppercase font-black tracking-widest" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* India Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl md:text-4xl font-black text-[#3c2a21]">The India Journey</h4>
              <p className="text-[#61615f] text-lg font-light leading-relaxed" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                Entering India through Gurugram, we've expanded across Delhi NCR to share our passion. Our 8th and newest sanctuary has just opened on{' '}
                {/* ── NEW: amber highlight on location name ── */}
                <strong className="text-[#d97706] font-semibold bg-[#d97706]/10 px-1 rounded">PDPU Road, Gandhinagar</strong>
                {' '}— marking our first foray into Gujarat's capital.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-[#435334]/5 rounded-[32px] border border-[#435334]/10"
            >
              <h5 className="text-[#435334] font-bold uppercase text-xs tracking-widest mb-4" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Gandhinagar Highlights</h5>
              <div className="grid grid-cols-2 gap-4">
                {['Phin-filtered Brews', 'Vietnamese Salted Coffee', 'Vietnamese Coconut Coffee', 'Authentic Bánh Mì', 'Mango Passion Tea', 'Signature Cold Brews'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-[#3c2a21] text-sm font-medium" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                    {/* ── NEW: rotated square diamond instead of circle ── */}
                    <div className="w-2 h-2 bg-[#d97706] rotate-45 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            {/* ── Owner card — image full-bleed, name overlaid ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] bg-[#3c2a21] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97706]/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

              {/* ── Full-bleed portrait ── */}
              <div className="img-zoom relative w-full h-72 md:h-[420px] overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dgry55pvk/image/upload/v1775971927/Gemini_Generated_Image_3s43i73s43i73s43_komzju.png"
                  alt="Dhruv Soni"
                  className="w-full h-full object-cover object-top"
                />
                {/* gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3c2a21]/90 via-[#3c2a21]/10 to-transparent" />

                {/* ── Name overlaid on image ── */}
                <div className="absolute bottom-0 left-0 p-8 md:p-10 z-10">
                  <h5
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}
                    className="text-2xl md:text-4xl font-bold text-[#fdfcf8] leading-none mb-1"
                  >
                    Dhruv Soni & Dhwani Soni
                  </h5>
                  <p className="text-[#d97706] text-[10px] font-black uppercase tracking-[0.25em]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                    Owner · Gandhinagar Outlet
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8"
            >
              <div className="max-w-md">
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-[#3c2a21] font-bold text-xl mb-2">Our Philosophy</h4>
                <p className="text-[#61615f] text-sm" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Creating community-oriented, work- and social-friendly spaces that bring Vietnamese coffee culture to Indian coffee lovers.</p>
              </div>

              {/* ── CTA with amber glow ── */}
              <motion.button
                onClick={() => { window.scrollTo(0, 0); navigate('/about'); }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 48px -8px rgba(217,119,6,0.45)' }}
                whileTap={{ scale: 0.98 }}
                className="group w-full md:w-auto px-10 py-5 bg-[#d97706] text-white rounded-full flex items-center justify-center gap-4 transition-all duration-300"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                <span className="font-black text-xs tracking-widest uppercase">Full Experience</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}