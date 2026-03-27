import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Animated Marker (Light/Warm Theme)
const cafeMarkerHTML = `
  <div class="relative flex items-center justify-center w-12 h-12 group">
    <div class="absolute inset-0 bg-burnt-orange rounded-full opacity-30 animate-[ping_3s_ease-out_infinite]"></div>
    <div class="relative w-10 h-10 bg-cream text-burnt-orange border-2 border-burnt-orange rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(143,144,138,0.4)] group-hover:scale-110 group-hover:bg-burnt-orange group-hover:text-white transition-all duration-300 z-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
    </div>
  </div>
`;

const customIcon = L.divIcon({
  className: 'bg-transparent border-0',
  html: cafeMarkerHTML,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -20]
});

// Component to handle map clicks
const MapController = ({ center }) => {
  const map = useMap();
  return (
    <Marker 
      position={center} 
      icon={customIcon}
      eventHandlers={{
        click: () => {
          map.flyTo(center, 17, { duration: 1.5 });
        }
      }}
    >
      <Popup className="custom-popup border-0">
        <div className="p-5 font-sans min-w-[220px]">
          <h4 className="font-bold text-lg mb-1 flex items-center gap-2">
            Three O'Clock Cafe ☕
          </h4>
          <p className="text-sm opacity-80 mb-1">Raysan, Gandhinagar</p>
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-burnt-orange bg-burnt-orange/10 px-2 py-1 rounded mb-4">
            Open till 3 AM 🌙
          </span>
          <a
            href="https://maps.google.com/?q=23.15745414390761, 72.65428913986581"
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center bg-burnt-orange text-white py-2 rounded-full font-medium text-sm hover:opacity-90 shadow-md transition-opacity duration-300"
          >
            👉 Get Directions
          </a>
        </div>
      </Popup>
    </Marker>
  );
};

export default function Location() {
  const position = [23.15745414390761, 72.65428913986581];

  return (
    <section id="location" className="py-24 bg-coffee/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm tracking-[0.3em] text-burnt-orange uppercase font-semibold">
                Visit Us
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-cream leading-tight">
                Find Your Night Owl Nest
              </h3>
            </div>
            
            <div className="bg-black/30 p-8 rounded-2xl border border-cream/10 backdrop-blur-sm space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-cream mb-2">Address</h4>
                <p className="text-cream/70 font-light leading-relaxed">
                  226/2, Koba, Khodiyar Pan Parlor,<br/>
                  PDPU Road, Raysan,<br/>
                  Gandhinagar, Gujarat - 382700
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-cream mb-2">Hours</h4>
                <p className="text-cream/70 font-light leading-relaxed">
                  Monday - Sunday<br/>
                  8:00 AM – 3:00 AM
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="https://maps.google.com/?q=23.15755592777538,72.65432003098762" target="_blank" rel="noreferrer" className="flex-1 py-4 text-center bg-burnt-orange text-white rounded-full font-medium tracking-wide shadow-[0_0_15px_rgba(143,144,138,0.3)] hover:shadow-[0_0_25px_rgba(143,144,138,0.6)] transition-all duration-300">
                  Get Directions
                </a>
                <a href="tel:+919876543210" className="flex-1 py-4 text-center bg-transparent border border-cream/30 text-cream rounded-full font-medium tracking-wide hover:bg-cream/10 transition-colors duration-300">
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-cream/10 relative z-10 group"
          >
            {/* Vignette Overlay for Industrial Aesthetic */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(60,60,60,0.6)] z-[400] transition-opacity duration-700" />
            
            {/* Soft Grain Tint Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[#3c3c3c] opacity-5 mix-blend-color-burn z-[400]" />
            
            <MapContainer 
              center={position} 
              zoom={14} 
              scrollWheelZoom={false}
              className="w-full h-full bg-charcoal opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                className="map-tiles-light"
              />
              <MapController center={position} />
            </MapContainer>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
