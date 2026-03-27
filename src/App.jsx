import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookieBanner from './components/CookieBanner';

const EventsTimeline = lazy(() => import('./pages/EventsTimeline'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
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
      </Routes>
      <CookieBanner />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </Layout>
  );
}

export default App;
