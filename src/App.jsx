import { Suspense, lazy, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookieBanner from './components/CookieBanner';

const EventsTimeline = lazy(() => import('./pages/EventsTimeline'));
const AboutExtended = lazy(() => import('./pages/AboutExtended'));
const Footer = lazy(() => import('./components/Footer'));
const MenuPage = lazy(() => import('./pages/MenuPage'));

// The printed table QR code points at /#menu. Only a fresh page load on that URL
// opens the standalone menu; in-site "Menu" links (#menu) still scroll the home page.
const { pathname: initialPath, hash: initialHash } = window.location;
const openedFromMenuQr = (initialPath === '/' || initialPath === '') && initialHash === '#menu';

function App() {
  const { pathname } = useLocation();
  const [standaloneMenu] = useState(openedFromMenuQr);

  // QR-code menu: standalone page without the site navbar, footer or smooth scroll.
  if (standaloneMenu || pathname.replace(/\/+$/, '') === '/menu') {
    return (
      <Suspense fallback={<div className="h-screen bg-[#1a1714]" />}>
        <MenuPage />
      </Suspense>
    );
  }

  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/events" 
          element={
            <Suspense fallback={<div className="h-screen bg-[#fdfcf8] flex items-center justify-center text-[#4B2E2E] tracking-widest text-sm uppercase">Loading Experiences...</div>}>
              <EventsTimeline />
            </Suspense>
          } 
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<div className="h-screen bg-[#fdfcf8] flex items-center justify-center text-[#4B2E2E] tracking-widest text-sm uppercase">Loading Story...</div>}>
              <AboutExtended />
            </Suspense>
          } 
        />
      </Routes>
      <CookieBanner />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </Layout>
  );
}

export default App;
