import { ReactLenis } from '@studio-freight/react-lenis'

export default function Layout({ children }) {

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {/* Grain Texture */}
      <div className="grain-overlay"></div>
      
      {/* Page Content */}
      <div className="relative z-10 font-sans bg-coffee text-cream selection:bg-burnt-orange selection:text-white">
        {children}
      </div>
    </ReactLenis>
  )
}
