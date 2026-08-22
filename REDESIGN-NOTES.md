# Redesign notes

Rebuild of the portfolio to match the reference layout. Read this before
`REVIEW-NOTES.md`, which is now historical — it documents the previous round of
work, most of which `src/pages/index.tsx` no longer contains.

**All six sections are in.** Run the dev server and go through it top to
bottom:

```bash
pnpm dev
```

## The page, in order

| Section | Component | Notes |
| --- | --- | --- |
| Shell | `Nav`, `ScrollProgress`, `SocialRail` | Fixed header with theme toggle and live GitHub star count; scroll progress bar; right-edge social rail |
| Hero | `Hero.tsx` | Role headline, availability pill, focus pills, image, giant name, meta row |
| Marquee | `Marquee.tsx` | **Scroll drives the horizontal slide** — the two rows move in opposite directions |
| About | `About.tsx` | Bio, then skills as oversized grey category headings |
| Featured work | `FeaturedWork.tsx` | **Scroll scrubs through the projects** while the panel stays pinned |
| Contact | `Contact.tsx` | Statement, circular socials, address card with a working copy button, footer |

## How the two scroll-driven sections work

**The marquee** maps its own progress through the viewport onto a horizontal
translation. Scroll down and the rows slide; scroll back up and they slide back,
because position — not a timer — is the input. The track repeats each phrase
four times and travels exactly one copy width, so no gap can ever appear at
either end.

**Featured work** is five screens tall with a pinned inner panel, so scrolling
through it advances the project instead of moving the page. Scroll position is
the single source of truth: clicking a thumbnail scrolls to the middle of that
project's band rather than setting state, so the thumbnail rail, the counter,
the segmented progress bar and the panel cannot disagree. Below `lg` the pin is
dropped entirely and every project renders as a plain stacked card — a
viewport-height pinned panel is a bad trade on a phone.

Both are static under `prefers-reduced-motion`.

## Decisions I made — tell me if any is wrong

**Fonts.** The reference's headline face is a Helvetica-Now-Display-Black. The
closest free match is **Inter Tight at 900**, with **Inter** for body and
**JetBrains Mono** for the labels, all via `next/font/google`. Clash Grotesk is
no longer used — the file is still in `public/fonts` if you want it back, but
its letterforms are too distinctive to pass for the reference.

**Locomotive Scroll and the Spline hero are dropped.** Locomotive virtualises
scroll position, which breaks Framer Motion's `useScroll` — and both
scroll-driven sections above depend on it. Native scroll is used instead. This
also removes the Spline scene, which is a large performance win.

**Copy lives in `src/data/site.ts`.** One file for every string and link, so you
can fix wording without touching components. Lines I drafted are marked
`CHECK`.

**Missing screenshots show a labelled placeholder, not a stand-in image.**
`projects.ts` now carries `hasImage`, and the three projects without a
screenshot render a block naming the file to add. Showing BlueFusion's
screenshot under "Amazon Clone" would have been worse than showing nothing.

**Two deliberate deviations from the reference**, both to avoid collisions:

- The persistent bottom-right clock is gone. It sat directly on top of the
  footer's own clock. The time still appears in the hero meta row, the footer
  and the menu. Say the word and I'll put it back with a fade-out near the
  footer.
- The **"SHOOT" toggle is omitted**, as you asked.

**Old shadcn tokens are kept** and retuned to light values rather than removed,
because `src/components/ui/*` still reference them.

## Two reference features I did not build

**"1 active users"** needs a realtime presence backend — websockets, Pusher or
similar. It cannot be faked from a static site, and a hardcoded number would be
a lie. Say the word if you want a real one.

**"MESSAGES"** needs a backend to receive messages. I kept the visual slot but
made it a `mailto:` link labelled **Message**.

The **GitHub star pill is real** — it fetches the live count from the public
GitHub API and renders without a number if the request is rate-limited.

## What I need from you

**A hero photo.** `Hero.tsx` renders a labelled placeholder because none
exists. Drop a wide landscape shot at `public/assets/hero.jpg` and set
`HERO_IMAGE` at the top of that file.

**The three project screenshots** — `Amazon-clone.jpg`, `Caresync.jpg`,
`Malware-detection-research.jpg` in `public/assets/`. Then set `hasImage: true`
for each in `src/data/projects.ts`.

**The `CHECK` lines in `src/data/site.ts`.** I do not know your city, so
location says "India". The tagline, the availability line, the short note, the
work and contact intros and the three about paragraphs are my drafts built from
your projects — they make claims about you and you should correct them.

**Now-orphaned components.** `Container.tsx`, `Footer.tsx`, `Preloader.tsx`,
`CommandPalette.tsx`, `SkillsGraph.tsx` and `SectionReveal.tsx` are no longer
imported by any page. They still compile, so nothing is broken — I left them
rather than deleting your work. Tell me and I'll remove them, along with the
now-unused `locomotive-scroll`, `@splinetool/*` and `vanilla-tilt` dependencies.

## Verification

**Checked:**

- `tsc --noEmit --noUnusedLocals --noUnusedParameters` — **exit 0**. No type
  errors, no unused imports, no dead locals.
- Tailwind compiles cleanly (50,635 bytes) with both token sets and every new
  class resolving, including the arbitrary values
  `text-[clamp(3rem,11.5vw,10rem)]` and `lg:h-[var(--work-track)]`.
- **The whole page renders server-side without throwing.** Next's own build
  cannot finish in my sandbox, so I compiled the TSX directly, mocked
  `next/image`, `next/head` and `next/font`, and rendered the real component
  tree with `react-dom/server`. Output confirms: one `<h1>`, correct heading
  order, all four section anchors present (so the hero's "Selected work" button
  now has a target), the marquee track repeating four times, `--work-track`
  resolving to `500vh` for five projects, all six placeholders naming the right
  file, and no project showing another project's image.
- **No interactive element without an accessible name** — every icon-only
  button and link carries an `aria-label`, checked programmatically.
- **No hardcoded colours** anywhere in `src/components/site/` or
  `src/pages/index.tsx`, so dark mode follows entirely from the tokens.
- Fixed two collision risks the markup revealed: the social rail now sits
  inside the 56px shell gutter instead of overlapping right-aligned content,
  and the fixed header has a translucent backdrop so content scrolling under it
  stays legible.

**Static previews** are in `.preview/light.html` and `.preview/dark.html`
(gitignored). Open them in a browser for a look at the real markup with the
real compiled CSS. They are server-rendered only — **no client JS runs**, so
the scroll-linked marquee sits at its start position, the project carousel
shows only the first project, the clock is blank and the copy button is inert.
Use them to judge type, colour and spacing; use `pnpm dev` to judge motion.

**Not checked:** I have no browser in this sandbox, so I have not seen the page
painted at any viewport size. Layout at specific breakpoints, and the feel of
the scroll timing, are the two things I most need your eyes on.

## Backing out

Snapshots of the overwritten files are in `.backup-pre-redesign/`
(gitignored). Your last commit `622c23c` is untouched, so `git checkout -- .`
returns you to the original site at any point.
