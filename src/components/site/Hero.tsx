import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import Clock from "./Clock";

/**
 * Hero image. No photo of Abhiraj exists in public/assets yet, so this
 * renders a labelled placeholder rather than a broken image or a stand-in
 * that pretends to be him. Drop a wide landscape shot at
 * public/assets/hero.jpg and set HERO_IMAGE to that path.
 */
const HERO_IMAGE: string | null = null;

export default function Hero() {
  return (
    <section id="top" className="shell pt-28 sm:pt-32 lg:pt-36">
      {/* Row 1 — role headline left, availability and origin right */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <h1 className="font-display text-display-xl uppercase text-ink">
          {site.role.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="flex shrink-0 flex-col items-start gap-5 lg:items-end lg:pt-3">
          {site.availability.open && (
            <span className="pill">
              <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
              {site.availability.label}
            </span>
          )}
          <div className="lg:text-right">
            <p className="label mb-2">01/</p>
            <p className="label max-w-[16rem]">{site.origin}</p>
          </div>
        </div>
      </div>

      {/* Row 2 — focus pills */}
      <ul className="mt-8 flex flex-wrap gap-3">
        {site.focus.map((item) => (
          <li key={item}>
            <span className="pill">{item}</span>
          </li>
        ))}
      </ul>

      {/* Row 3 — wide image left, tagline and name right */}
      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7">
          {/* corner bracket, top-left */}
          <span className="bracket left-2 top-2 border-l border-t" aria-hidden />

          {HERO_IMAGE ? (
            <Image
              src={HERO_IMAGE}
              alt={`${site.name.first} ${site.name.last}`}
              width={1400}
              height={520}
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[1400/520] w-full flex-col items-center justify-center gap-3 bg-bone-2">
              <p className="label">Hero image</p>
              <p className="max-w-xs px-6 text-center font-mono text-label-sm uppercase leading-relaxed text-mute">
                Add a wide landscape photo at public/assets/hero.jpg
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:items-end lg:text-right">
          <div>
            {site.tagline.map((line) => (
              <p key={line} className="label">
                {line}
              </p>
            ))}
            <div className="mt-6">
              {site.availability.detail.map((line) => (
                <p key={line} className="label">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <h2 className="font-display text-display-xl uppercase text-ink">
            <span className="block">{site.name.first}</span>
            <span className="block">{site.name.last}</span>
          </h2>
        </div>
      </div>

      {/* Row 4 — note left, meta and jump link right */}
      <div className="mt-12 flex flex-col gap-8 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-6">
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
          <div>
            {site.note.map((line) => (
              <p key={line} className="label">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <p className="label">{site.portfolioYear}</p>
          <Clock />
          <a href="#work" className="btn-outline mt-2">
            Selected work
            <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
