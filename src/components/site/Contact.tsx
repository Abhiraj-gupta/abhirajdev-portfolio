import { useCallback, useEffect, useState } from "react";
import { ArrowUp, Check, Copy, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "./Reveal";
import Clock from "./Clock";

const socials = [
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "LeetCode", href: site.socials.leetcode, Icon: Code2 },
];

export default function Contact() {
  const [headA, headB] = site.headings.contact;
  const [local, domain] = site.email.split("@");
  const copy = useCopy(site.email);

  return (
    <section id="contact" className="mt-28 overflow-hidden pt-14 sm:mt-36 lg:mt-44">
      <div className="shell">
        <Reveal y={0}>
          <div className="eyebrow">
            <p className="label shrink-0">Contact</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — the statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-display-lg uppercase text-ink">
                <span className="block">{headA}</span>
                {/* Runs past the gutter and is clipped by the section, which
                    is the point — it reads as a fragment of something
                    larger. */}
                <span className="block whitespace-nowrap text-mute">{headB}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-body sm:text-lg">
                {site.contactIntro}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-10 flex flex-wrap gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — the address card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative border border-rule bg-bone-2 p-8 sm:p-10">
                <span className="bracket left-3 top-3 border-l border-t" aria-hidden />
                <span className="bracket bottom-3 right-3 border-b border-r" aria-hidden />

                <Mail className="h-7 w-7 text-ink" strokeWidth={1.5} aria-hidden />
                <p className="label mt-6">Drop me a line</p>

                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block break-all font-display text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-3xl"
                >
                  {local}
                  <span className="text-mute">@{domain}</span>
                </a>

                <button
                  type="button"
                  onClick={copy.run}
                  className="btn-outline mt-8 w-full bg-transparent"
                  /* The label changes, so the state is announced rather than
                     conveyed by the icon alone. */
                  aria-live="polite"
                >
                  {copy.done ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      Copy address
                    </>
                  )}
                </button>

                {copy.failed && (
                  <p className="mt-3 text-center font-mono text-label-sm uppercase text-mute">
                    Copy blocked — select the address above
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 flex flex-col gap-6 border-t border-rule py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {site.name.first} {site.name.last}
          </p>
          <div className="flex items-center gap-6">
            <Clock />
            <a href="#top" className="label-ink inline-flex items-center gap-2">
              Back to top
              <ArrowUp className="h-3 w-3" strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Clipboard write with an honest failure path — `navigator.clipboard` is
 * undefined on insecure origins and can reject when the document is not
 * focused, and silently doing nothing in those cases looks like a broken
 * button.
 */
function useCopy(text: string) {
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setDone(false), 2000);
    return () => window.clearTimeout(t);
  }, [done]);

  const run = useCallback(async () => {
    setFailed(false);
    try {
      if (!navigator.clipboard) throw new Error("unavailable");
      await navigator.clipboard.writeText(text);
      setDone(true);
    } catch {
      setFailed(true);
    }
  }, [text]);

  return { done, failed, run };
}
