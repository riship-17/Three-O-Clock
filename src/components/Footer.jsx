import { useScrollReveal } from '../hooks/useScrollReveal'
import { Instagram, MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const { ref: footerRef, style: footerStyle } = useScrollReveal({ y: 30, duration: 1 })

  return (
    <footer className="footer" ref={footerRef} style={footerStyle}>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-logo">
            Three O'<span>Clock</span>
          </div>
          <p className="footer-brand-tagline">
            Gandhinagar's favorite night owl destination. Artisan coffee, delicious snacks, and the perfect ambiance for late-prime conversations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="https://www.instagram.com/threeoclock_gandhinagar/?hl=en" className="footer-insta" target="_blank" rel="noopener noreferrer">
              <Instagram size={18} />
            </a>
            <a href="#location" className="footer-insta"><MapPin size={18} /></a>
            <a href="mailto:3oclockgandhinagar@gmail.com" className="footer-insta"><Mail size={18} /></a>
            <a href="tel:+919898947333" className="footer-insta"><Phone size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Navigate</div>
          <ul className="footer-links">
            <li><a href="#about" className="footer-link">Our Story</a></li>
            <li><a href="#menu" className="footer-link">The Menu</a></li>
            <li><a href="#gallery" className="footer-link">Gallery</a></li>
            <li><a href="#location" className="footer-link">Find Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Offerings</div>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Artisan Coffee</a></li>
            <li><a href="#" className="footer-link">Specialty Teas</a></li>
            <li><a href="#" className="footer-link">Late Night Snacks</a></li>
            <li><a href="#" className="footer-link">Gourmet Desserts</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Connect</div>
          <ul className="footer-links">
            <li><a href="https://www.instagram.com/threeoclock_gandhinagar/?hl=en" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>

          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="flex flex-col gap-3">
          <div className="footer-copy">
            © {new Date().getFullYear()} Three O'Clock Gandhinagar. Brewed for the Night 🌙.
          </div>
          <div
            className="text-white/90 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-black hover:text-white transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', Oswald, sans-serif" }}
          >
            Created & Designed by <span className="text-burnt-orange">Rishi Parekh</span>
          </div>
        </div>
        <a href="https://www.instagram.com/threeoclock_gandhinagar/?hl=en" target="_blank" rel="noopener noreferrer" className="footer-copy hover:text-burnt-orange transition-colors">
          @THREEOCLOCK_GANDHINAGAR
        </a>
      </div>
    </footer>
  )
}
