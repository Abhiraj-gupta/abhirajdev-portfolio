import { useCallback, useEffect, useState } from "react";
import { Github, Menu, Moon, Star, Sun, X } from "lucide-react";
import { site } from "@/data/site";
import Clock from "./Clock";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Featured work" },
  { id: "contact", label: "Contact" },
];

/** Reads the star count for the configured repo. Public endpoint, no auth. */
function useStarCount(repo: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${repo}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { stargazers_count?: number } | null) => {
        if (typeof d?.stargazers_count === "number") setStars(d.stargazers_count);
      })
      /* Rate-limited or offline: the pill simply renders without a count. */
      .catch(() => undefined);
    return () => controller.abort();
  }, [repo]);

  return stars;
}

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* Private browsing can throw on write — the toggle still works for
         this page view, it just will not persist. */
    }
    setDark(next);
  }, []);

  return { dark, toggle };
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const stars = useStarCount(site.starRepo);
  const { dark, toggle } = useTheme();

  /* Escape closes the menu, and the page behind it must not scroll. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-bone/80 backdrop-blur-md">
        <div className="shell flex items-center justify-between py-5">
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-[-0.04em] text-ink"
          >
            {site.wordmark}
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`mailto:${site.email}`} className="pill pill-interactive hidden sm:inline-flex">
              Message
            </a>

            <a
              href={`https://github.com/${site.starRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-interactive hidden sm:inline-flex"
              aria-label={
                stars === null ? "GitHub repository" : `GitHub repository, ${stars} stars`
              }
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              {stars !== null && <span className="tabular-nums">{stars}</span>}
              <Star className="h-3 w-3" strokeWidth={1.75} aria-hidden />
            </a>

            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
            >
              {dark ? (
                <Sun className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              ) : (
                <Moon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center text-ink"
            >
              <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 bg-bone">
          <div className="shell flex items-center justify-between py-5">
            <span className="font-display text-lg font-extrabold tracking-[-0.04em] text-ink">
              {site.wordmark}
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              autoFocus
              className="flex h-11 w-11 items-center justify-center text-ink"
            >
              <X className="h-6 w-6" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <nav className="shell mt-10 flex flex-col gap-2">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-6 border-b border-rule py-5 text-ink"
              >
                <span className="label w-8 shrink-0">{`0${i + 1}`}</span>
                <span className="font-display text-display-md uppercase transition-opacity group-hover:opacity-50">
                  {s.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="shell mt-10 flex flex-wrap items-center justify-between gap-4">
            <a href={`mailto:${site.email}`} className="label-ink underline decoration-rule underline-offset-4">
              {site.email}
            </a>
            <Clock />
          </div>
        </div>
      )}
    </>
  );
}
