import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { marqueeRows } from "@/data/site";

/**
 * Scroll-linked marquee band.
 *
 * The two rows slide horizontally as the band travels through the viewport —
 * scroll position drives the translation rather than a timer, so the movement
 * reverses when you scroll back up. Rows move in opposite directions.
 *
 * The track repeats its phrase COPIES times and travels exactly one copy
 * width, which means text always fills the viewport at every scroll position
 * and no gap can appear at either end.
 *
 * Under prefers-reduced-motion the rows are rendered static at their midpoint.
 */
const COPIES = 4;
/** One copy of a COPIES-wide track. */
const STEP = 100 / COPIES;

type Row = readonly [string, string];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /* Progress from the band entering the bottom of the viewport to leaving
     the top, so the full travel is used on the way past. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Springing the progress keeps trackpad and wheel jitter from showing up
     as stutter in text this large. */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.0005,
  });

  const leftward = useTransform(smooth, [0, 1], ["0%", `-${STEP}%`]);
  const rightward = useTransform(smooth, [0, 1], [`-${STEP}%`, "0%"]);

  return (
    <section
      ref={ref}
      aria-label="What I build"
      className="relative mt-20 overflow-hidden border-y border-rule py-10 sm:mt-28 sm:py-14"
    >
      <div
        /* Hairline fade at both gutters so words dissolve rather than being
           chopped by the viewport edge. */
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
        className="flex flex-col gap-2 sm:gap-4"
      >
        {(marqueeRows as readonly Row[]).map((row, i) => (
          <MarqueeRow
            key={row.join("-")}
            row={row}
            x={reduceMotion ? undefined : i % 2 === 0 ? leftward : rightward}
            /* Static rows sit one half-step in so neither edge is empty. */
            staticOffset={reduceMotion ? `-${STEP / 2}%` : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({
  row,
  x,
  staticOffset,
}: {
  row: Row;
  x?: MotionValue<string>;
  staticOffset?: string;
}) {
  const [first, second] = row;

  return (
    <motion.div
      style={x ? { x } : { x: staticOffset }}
      className="flex w-max shrink-0 items-baseline whitespace-nowrap will-change-transform"
    >
      {Array.from({ length: COPIES }, (_, i) => (
        <span
          key={i}
          /* Only the first copy is read out; the rest are visual repetition. */
          aria-hidden={i > 0}
          className="flex shrink-0 items-baseline gap-[0.22em] pr-[0.22em] font-display text-[clamp(3rem,11.5vw,10rem)] font-black leading-[0.92] tracking-[-0.045em] text-ink"
        >
          {first}
          <span className="font-serif text-[0.85em] font-normal italic tracking-normal text-mute">
            &amp;
          </span>
          {second}
          <span className="font-serif text-[0.85em] font-normal italic tracking-normal text-mute">
            &amp;
          </span>
        </span>
      ))}
    </motion.div>
  );
}
