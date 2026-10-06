import { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
// Lazy load heavy components below the fold
const Menu = lazy(() => import('../components/Menu'));
const Gallery = lazy(() => import('../components/Gallery'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));
const Location = lazy(() => import('../components/Location'));

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const offset = 80; // height of the navbar
    const scrollToTarget = (behavior) => {
      const element = document.getElementById(id);
      if (!element) return false;
      const top = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior });
      return true;
    };

    // Already rendered (in-page navigation): one smooth scroll is enough
    if (scrollToTarget('smooth')) return;

    // Sections below the fold are lazy loaded, so on a fresh visit (e.g. scanning
    // the menu QR code at /#menu) the target doesn't exist yet. Poll until it does,
    // then keep it aligned while images above it finish loading, unless the
    // visitor starts scrolling on their own.
    let userScrolled = false;
    const stopFollowing = () => { userScrolled = true; };
    const events = ['wheel', 'touchstart', 'keydown'];
    events.forEach((e) => window.addEventListener(e, stopFollowing, { passive: true }));

    let found = false;
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      if (userScrolled || attempts > 50) return clearInterval(interval);
      if (!found) found = scrollToTarget('auto');
      else if (attempts % 5 === 0) scrollToTarget('auto');
    }, 100);

    return () => {
      clearInterval(interval);
      events.forEach((e) => window.removeEventListener(e, stopFollowing));
    };
  }, [hash]);

  return (
    <main className="w-full">
      <Hero />
      <About />
      <Suspense fallback={<div className="h-20" />}>
        <Menu />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Location />
      </Suspense>
    </main>
  );
}

