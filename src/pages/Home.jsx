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
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure the page has finished its initial paint
        // and images/videos haven't shifted the layout yet
        const timer = setTimeout(() => {
          const offset = 80; // height of the navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
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

