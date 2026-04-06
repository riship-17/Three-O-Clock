import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Phone, Instagram, Clock } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Custom marker icon for Three O'Clock
const customIcon = L.divIcon({
  className: 'custom-marker-wrapper',
  html: '<div class="custom-marker">✦ Three O\'Clock</div>',
  iconSize: [120, 30],
  iconAnchor: [60, 35]
})

export default function Location() {
  const { ref: mapRef, style: mapStyle } = useScrollReveal({ y: 50, duration: 1 })
  const { ref: infoRef, style: infoStyle } = useScrollReveal({ y: 50, duration: 1, delay: 0.2 })

  const position = [23.15745414390761, 72.65428913986581]

  return (
    <section className="map-section" id="location">
      <div className="map-container" ref={mapRef} style={mapStyle}>
        <MapContainer 
          center={position} 
          zoom={15} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              Three O'Clock Cafe — Brewed for the Night 
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="map-info" ref={infoRef} style={infoStyle}>
        <div className="section-label">Find Us</div>
        <h2 className="section-title">Visit Our Cafe </h2>
        
        <div className="map-details">
          <div className="map-detail-row">
            <MapPin className="map-detail-icon" size={20} />
            <div>
              <div className="map-detail-label">Address</div>
              <div className="map-detail-value">
               Three O'clock 226/2, Koba, Nr. Khodiyar Pan Parlor,<br/>
                PDPU Road, Raysan, Gandhinagar, Gujarat 382700
              </div>
            </div>
          </div>
          
          <div className="map-detail-row">
            <Phone className="map-detail-icon" size={20} />
            <div>
              <div className="map-detail-label">Contact</div>
              <div className="map-detail-value">+91 98989 47333</div>
            </div>
          </div>
          
          <div className="map-detail-row">
            <Instagram className="map-detail-icon" size={20} />
            <div>
              <div className="map-detail-label">Follow</div>
              <div className="map-detail-value">@threeoclock_gandhinagar</div>
            </div>
          </div>
          
          <div className="map-detail-row">
            <Clock className="map-detail-icon" size={20} />
            <div>
              <div className="map-detail-label">Today</div>
              <div className="map-detail-value">Open until 3:00 AM</div>
            </div>
          </div>
        </div>
        
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=23.15745414390761,72.65428913986581" 
          target="_blank" 
          rel="noopener noreferrer"
          className="map-btn"
        >
          Get Directions
        </a>
      </div>
    </section>
  )
}
