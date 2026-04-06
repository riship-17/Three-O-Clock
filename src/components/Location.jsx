import React, { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Overlay from 'ol/Overlay'
import { fromLonLat } from 'ol/proj'
import { defaults as defaultControls } from 'ol/control'
import 'ol/ol.css'

import { MapPin, Phone, Instagram, Clock } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Location() {
  const { ref: mapRevealRef, style: mapStyle } = useScrollReveal({ y: 50, duration: 1 })
  const { ref: infoRef, style: infoStyle } = useScrollReveal({ y: 50, duration: 1, delay: 0.2 })

  const mapContainerRef = useRef(null)
  const markerRef = useRef(null)
  const popupRef = useRef(null)
  const mapRef = useRef(null)

  // Coordinates: [longitude, latitude]
  const lonLat = [72.65428913986581, 23.15745414390761]
  const position = fromLonLat(lonLat)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Marker Overlay
    const markerOverlay = new Overlay({
      element: markerRef.current,
      position: position,
      positioning: 'bottom-center',
      stopEvent: true, // Let React handle the click event on the marker
    })

    // Popup Overlay
    const popupOverlay = new Overlay({
      element: popupRef.current,
      position: position,
      positioning: 'bottom-center',
      offset: [0, -45], // Position above the marker
      stopEvent: true,
    })

    // Initialize Map
    const map = new Map({
      target: mapContainerRef.current,
      controls: defaultControls({ zoom: true, attribution: true }),
      layers: [
        new TileLayer({
          source: new OSM(),
          className: 'map-tiles-light', // Keep our custom aesthetic styling
        })
      ],
      view: new View({
        center: position,
        zoom: 15,
      }),
      overlays: [markerOverlay, popupOverlay],
    })

    mapRef.current = map

    // Cleanup map on unmount
    return () => {
      map.setTarget(undefined)
    }
  }, [])

  // Click-to-Zoom & Show Popup
  const handleMarkerClick = () => {
    if (mapRef.current) {
      const view = mapRef.current.getView()
      view.animate({
        center: position,
        zoom: 17,
        duration: 1500,
      })

      if (popupRef.current) {
        popupRef.current.style.display = 'block'
      }
    }
  }

  // Hide Popup
  const closePopup = (e) => {
    e.stopPropagation()
    if (popupRef.current) {
      popupRef.current.style.display = 'none'
    }
  }

  return (
    <section className="map-section" id="location">
      <div className="map-container" ref={mapRevealRef} style={mapStyle}>
        <div className="map-overlay"></div>
        {/* OpenLayers Map Target */}
        <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }}></div>
        
        {/* React DOM Elements for OpenLayers Overlays */}
        <div style={{ display: 'none' }}>
          
          {/* Custom Marker */}
          <div ref={markerRef} onClick={handleMarkerClick} className="cursor-pointer group flex flex-col items-center">
            <div className="bg-burnt-orange text-cream px-3 py-1.5 rounded-full font-bold text-[10px] whitespace-nowrap shadow-xl border border-cream/20 flex items-center gap-2 group-hover:scale-110 group-hover:bg-olive transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
              THREE O'CLOCK
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-burnt-orange -mt-1 shadow-lg"></div>
          </div>

          {/* Popup */}
          <div ref={popupRef} style={{ display: 'none' }}>
            <div className="bg-cream p-4 rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.15)] border border-[rgba(143,144,138,0.1)] relative min-w-[180px] text-center mb-2">
              <button 
                onClick={closePopup}
                className="absolute top-2 right-2 text-coffee/50 hover:text-coffee transition-colors font-bold text-lg leading-none"
              >
                &times;
              </button>
              <strong className="block text-coffee mb-1 font-bold">Three O'Clock Café</strong>
              <span className="text-xs text-coffee/70 block">Brewed for the Night 🌙</span>
            </div>
          </div>
          
        </div>
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
