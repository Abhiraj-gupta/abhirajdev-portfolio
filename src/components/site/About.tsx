import { aboutParagraphs, site, skillGroups } from "@/data/site";
import Reveal from "./Reveal";

export default function About() {
  const [headA, headB] = site.headings.about;

  return (
    <section id="about" className="shell pt-28 sm:pt-36 lg:pt-44">
      <Reveal y={0}>
        <div className="eyebrow">
          <p className="label shrink-0">About</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
        {/* Left — heading and bio */}
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="font-display text-display-lg uppercase text-ink">
              <span className="block">{headA}</span>
              <span className="block text-mute">{headB}</span>
            </h2>
          </Reveal>

          <div className="mt-10 max-w-xl space-y-6">
            {aboutParagraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p className="text-base leading-relaxed text-body sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-8 sm:max-w-md">
              <div>
                <dt className="label">Based in</dt>
                <dd className="label-ink mt-2">{site.location}</dd>
              </div>
              <div>
                <dt className="label">Availability</dt>
                <dd className="label-ink mt-2">{site.availability.label}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Right — skills, grouped. The oversized grey category headings are
            the structural device the reference uses here. */}
        <div className="lg:col-span-6 lg:pl-8">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={0.05 * i}>
              <div className="border-t border-rule py-8 first:border-t-0 first:pt-0 sm:py-10">
                <h3 className="font-display text-display-md uppercase text-mute">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="label-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
