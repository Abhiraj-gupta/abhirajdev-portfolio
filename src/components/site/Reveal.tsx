import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveals its children once, when they first scroll into view.
 *
 * Under prefers-reduced-motion the children render in their final state with
 * no transition at all, rather than a faster version of the same animation.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** Distance travelled, in px. Set to 0 for a pure fade. */
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
