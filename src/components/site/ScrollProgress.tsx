import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline scroll progress bar pinned to the top edge.
 *
 * Under reduced motion the spring smoothing is dropped so the bar tracks
 * scroll position directly rather than easing.
 */
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-ink"
    />
  );
}
