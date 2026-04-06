import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * A hook to handle scroll reveal animations using framer-motion's useInView logic.
 * @param {Object} options - Options for the reveal animation.
 * @param {number} options.y - Initial Y displacement.
 * @param {number} options.duration - Animation duration in seconds.
 * @param {number} options.delay - Animation delay in seconds.
 * @returns {Object} { ref: React.RefObject, style: Object }
 */
export function useScrollReveal({ y = 30, duration = 0.8, delay = 0 } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const style = {
    transform: isInView ? 'none' : `translateY(${y}px)`,
    opacity: isInView ? 1 : 0,
    transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
  };

  return { ref, style };
}
