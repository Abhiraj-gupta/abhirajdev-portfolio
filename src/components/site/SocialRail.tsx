import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { href: site.socials.github, label: "GitHub", Icon: Github },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.socials.leetcode, label: "LeetCode", Icon: Code2 },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
];

/**
 * Fixed vertical social rail on the right edge.
 *
 * Hidden below lg — at narrow widths it would sit on top of the content. The
 * same links appear in the contact section, so nothing becomes unreachable.
 *
 * `right-2` is deliberate: at 44px wide the rail then occupies 8–52px, which
 * fits inside the 56px (`lg:px-14`) shell gutter, so right-aligned content
 * such as the hero name can never run underneath it.
 */
export default function SocialRail() {
  return (
    <nav
      aria-label="Social links"
      className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={label}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-rule text-mute transition-colors hover:border-ink hover:text-ink"
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </a>
      ))}
    </nav>
  );
}
