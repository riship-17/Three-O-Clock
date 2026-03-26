import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
// Lazy load heavy components below the fold
const Menu = lazy(() => import('../components/Menu'));
const Gallery = lazy(() => import('../components/Gallery'));
const Events = lazy(() => import('../components/Events'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Location = lazy(() => import('../components/Location'));

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Suspense fallback={<div className="h-20" />}>
        <Menu />
        <Gallery />
        <Events />
        <Testimonials />
        <Location />
      </Suspense>
    </main>
  );
}
