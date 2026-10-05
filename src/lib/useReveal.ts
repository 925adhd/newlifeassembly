"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

// Shared scroll-reveal presets. Desktop keeps the slower, editorial reveal;
// phones get a quicker one that starts as soon as an element enters the screen,
// so fast scrollers never pass content that's still faded out.

const MOBILE_QUERY = "(max-width: 767px)";
const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getIsMobile = () => window.matchMedia(MOBILE_QUERY).matches;
const getServerIsMobile = () => false;

export const ease = [0.16, 1, 0.3, 1] as const;

export function useReveal() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(subscribe, getIsMobile, getServerIsMobile);

  // Reduced motion: fade only, and snap any offset left over from first paint
  const reduced = {
    transition: { duration: 0.4, ease, x: { duration: 0 }, y: { duration: 0 }, scale: { duration: 0 } },
    target: { opacity: 1, x: 0, y: 0, scale: 1 },
  };
  const viewport = isMobile
    ? { once: true, amount: 0 as const }
    : { once: true, margin: "-80px" };
  const speed = isMobile ? 0.5 : 1;
  const stagger = isMobile ? 0.35 : 1;

  const inView = (from: Record<string, number>, duration: number, delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, whileInView: reduced.target, viewport: { once: true }, transition: reduced.transition }
      : {
          initial: { opacity: 0, ...from },
          whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
          viewport,
          transition: { duration: duration * speed, delay: delay * stagger, ease },
        };

  // Page-load hero fade (not scroll-triggered)
  const fadeIn = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: reduced.target, transition: reduced.transition }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9 * speed, ease } };

  return {
    prefersReducedMotion,
    fadeIn,
    slideUp: (delay = 0) => inView({ y: 24 }, 0.8, delay),
    slideLeft: (delay = 0) => inView({ x: -32 }, 0.9, delay),
    slideRight: (delay = 0) => inView({ x: 32 }, 0.9, delay),
    scaleIn: (delay = 0) => inView({ scale: 0.96 }, 0.7, delay),
  };
}
