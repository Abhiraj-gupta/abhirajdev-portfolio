import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import Reveal from "./Reveal";

const TOTAL = projects.length;
const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Featured work, scrubbed by scroll.
 *
 * The section is TOTAL screens tall and its inner panel is sticky, so
 * scrolling through it advances the active project instead of moving the
 * page — the whole travel is one continuous scroll gesture. Scroll position
 * is the single source of truth: clicking a thumbnail scrolls to that
 * project's band rather than setting state directly, so the two can never
 * disagree.
 *
 * Below `lg` the pin is dropped entirely (a viewport-height panel is a bad
 * trade on a phone) and every project renders as a plain stacked card.
 */
export default function FeaturedWork() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  /* Progress -> active index. Equal bands, one per project. */
  useEffect(() => {
    const pick = (p: number) => {
      const next = Math.min(TOTAL - 1, Math.max(0, Math.floor(p * TOTAL)));
      setActive((current) => (current === next ? current : next));
    };
    pick(scrollYProgress.get());
    return scrollYProgress.on("change", pick);
  }, [scrollYProgress]);

  /* Scroll to the middle of a project's band. Middle rather than the edge so
     a rounding error cannot land on the neighbour. */
  const goTo = useCallback(
    (i: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const scrubbable = el.offsetHeight - window.innerHeight;
      if (scrubbable <= 0) {
        /* Not pinned (mobile layout) — nothing to scrub. */
        setActive(i);
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + ((i + 0.5) / TOTAL) * scrubbable,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  const [headA, headB] = site.headings.work;
  const project = projects[active];

  /* `projects` is a non-empty literal, so this is unreachable — it exists to
     satisfy noUncheckedIndexedAccess without an assertion. */
  if (!project) return null;

  return (
    <section
      id="work"
      ref={wrapRef}
      /* Track height must follow the project count, which a static Tailwind
         class cannot express — hence the custom property. */
      style={{ "--work-track": `${TOTAL * 100}vh` } as CSSProperties}
      className="relative mt-28 sm:mt-36 lg:mt-44 lg:h-[var(--work-track)]"
    >
      {/* ---------------- Pinned scrubber, lg and up ---------------- */}
      <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="shell grid w-full grid-cols-12 gap-10">
          {/* Left rail */}
          <div className="col-span-5 flex flex-col">
            <div className="eyebrow">
              <p className="label shrink-0">Selected projects</p>
            </div>

            <h2 className="mt-6 font-display text-display-md uppercase text-ink">
              <span className="block">{headA}</span>
              <span className="block text-mute">{headB}</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-body">{site.workIntro}</p>

            {/* Thumbnails double as the navigation. */}
            <ul className="mt-8 flex flex-col">
              {projects.map((p, i) => {
                const isActive = i === active;
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex w-full items-center gap-4 border-t border-rule py-3 text-left"
                    >
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          isActive ? "bg-ink" : "bg-rule group-hover:bg-mute"
                        }`}
                      />
                      <span className="label w-6 shrink-0">{pad(i)}</span>
                      <span className="relative h-10 w-16 shrink-0 overflow-hidden bg-bone-2">
                        {p.hasImage && (
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </span>
                      <span
                        className={`truncate font-mono text-label-sm uppercase transition-colors ${
                          isActive ? "text-ink" : "text-mute group-hover:text-body"
                        }`}
                      >
                        {p.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid mt-8 self-start"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </a>
          </div>

          {/* Right panel — the active project */}
          <div className="col-span-7 flex flex-col">
            <div className="flex items-baseline justify-between">
              <p className="label-ink tabular-nums">
                {pad(active)}
                <span className="text-mute"> / {pad(TOTAL - 1)}</span>
              </p>
              <p className="label">{site.portfolioYear}</p>
            </div>

            {/* Every panel is stacked and cross-faded by opacity. Swapping a
                single node instead would unload and refetch the image on
                every step. */}
            <div className="relative mt-4 h-[44vh] w-full overflow-hidden bg-bone-2">
              <span className="bracket left-2 top-2 z-10 border-l border-t" aria-hidden />
              <span className="bracket bottom-2 right-2 z-10 border-b border-r" aria-hidden />

              {projects.map((p, i) => (
                <div
                  key={p.title}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none"
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  {p.hasImage ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  ) : (
                    <ScreenshotPending path={p.image} />
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-7 font-display text-display-md uppercase text-ink">
              {project.title}
            </h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-body">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {project.tech.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-interactive"
              >
                Open
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} aria-hidden />
              </a>
            </div>

            {/* Segmented progress — one segment per project, each filling
                across its own band of the scroll. */}
            <div className="mt-8 flex gap-2" aria-hidden>
              {projects.map((p, i) => (
                <Segment key={p.title} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Stacked list, below lg ---------------- */}
      <div className="shell lg:hidden">
        <div className="eyebrow">
          <p className="label shrink-0">Selected projects</p>
        </div>
        <h2 className="mt-6 font-display text-display-lg uppercase text-ink">
          <span className="block">{headA}</span>
          <span className="block text-mute">{headB}</span>
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-body">{site.workIntro}</p>

        <ul className="mt-12 flex flex-col gap-16">
          {projects.map((p, i) => (
            <li key={p.title}>
              <Reveal>
                <p className="label-ink tabular-nums">
                  {pad(i)}
                  <span className="text-mute"> / {pad(TOTAL - 1)}</span>
                </p>
                <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden bg-bone-2">
                  {p.hasImage ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  ) : (
                    <ScreenshotPending path={p.image} />
                  )}
                </div>
                <h3 className="mt-5 font-display text-display-md uppercase text-ink">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-body">{p.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill-interactive"
                  >
                    Open
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2} aria-hidden />
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid mt-14"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </a>
      </div>
    </section>
  );
}

/** One bar of the segmented progress indicator. */
function Segment({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, (p) =>
    Math.min(1, Math.max(0, p * TOTAL - index)),
  );

  return (
    <span className="relative h-px flex-1 bg-rule">
      <motion.span
        style={{ scaleX }}
        className="absolute inset-0 origin-left bg-ink"
      />
    </span>
  );
}

/**
 * Stands in for a screenshot that does not exist yet, naming the file to add.
 * Shown instead of another project's image so nothing is ever mislabelled.
 */
function ScreenshotPending({ path }: { path: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="label">Screenshot pending</p>
      <p className="font-mono text-label-sm uppercase leading-relaxed text-mute">
        Add {path.replace(/^\//, "public/")}
      </p>
    </div>
  );
}
