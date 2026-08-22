# Review notes

Everything below is **uncommitted** in your working tree. Each section lists the
files touched, what to look at in the browser, and how to back that one change
out without disturbing the others.

Start the dev server before reviewing:

```bash
pnpm dev
```

---

## Part 1 — Projects refresh

**Files:** `src/data/projects.ts` (new), `src/pages/index.tsx`, `README.md`

The five projects you specified are in place, the old *Adventure Awaits* entry is
gone, and BlueFusion now points at `BluefusionF`.

One structural decision worth your approval: the array was moved out of
`index.tsx` into `src/data/projects.ts`. The command palette needs the same list
to build its "open project" entries, and duplicating it in two files would drift.
If you'd rather keep it inline in `index.tsx`, say so and I'll inline it and have
the palette import from there instead.

**⚠️ Three screenshots are still missing.** `Amazon-clone.jpg`, `Caresync.jpg`,
and `Malware-detection-research.jpg` do not exist in `public/assets/`. All three
entries currently fall back to `Bluefusion.jpg` via a `PLACEHOLDER_IMAGE`
constant, each marked with a `// TODO`. **Those three cards show the wrong
screenshot until you drop in real images.** Once added, replace
`PLACEHOLDER_IMAGE` with the real path and delete the TODO.

`README.md` mirrors the same five projects with one-line descriptions and links.

No orphaned `Adventure-awaits` references remain anywhere in the codebase —
metadata, manifest, and robots.txt were all checked. The unused file
`public/assets/Adventure-awaits.jpg` is still on disk; it is referenced by
nothing, so you can safely delete it. `public/assets/wrona.jpeg` is also
unreferenced (left over from the original template) — your call.

---

## Change 1 — Command palette (⌘K / Ctrl+K)

**Files:** `src/components/CommandPalette.tsx` (new),
`src/components/ui/command.tsx` + `src/components/ui/dialog.tsx` (new, shadcn),
`src/components/Container.tsx` (mounts it in the nav), `package.json`
(`cmdk`, `@radix-ui/react-dialog`)

**Check:** press ⌘K / Ctrl+K anywhere on the page, and press it again to close.
The hint pill reading "Press ⌘K" sits at the end of the desktop nav with a
blinking cursor block; it detects Mac vs Windows and relabels itself. Navigate
items jump to `#about`, `#projects`, `#services`, `#contact` using the same
`scrollTo` helper the nav uses, so Locomotive Scroll stays in sync. Project items
open in a new tab with `noopener,noreferrer`. The dialog has a monospace item
list, a `guest@abhirajdev` prompt bar, and a faint scanline overlay.

**Gap needing your decision:** you asked for a theme toggle "if applicable" — I
left it out. Tailwind is configured with `darkMode: ["class"]` but nothing ever
toggles that class, so the site has one fixed dark theme and a toggle would be a
no-op. Adding a real one means introducing light-theme tokens, which would breach
your "don't change the color tokens" constraint. Tell me if you want it.

The hint pill is `hidden sm:inline-flex`, so it does not appear on mobile, where
there is no keyboard to press. The shortcut itself still works on tablets with
keyboards.

**Back it out:**

```bash
rm src/components/CommandPalette.tsx
git checkout -- src/components/Container.tsx   # removes the nav mount
```

`ui/command.tsx` and `ui/dialog.tsx` are unused after that and can be removed
too, along with the `cmdk` / `@radix-ui/react-dialog` entries in `package.json`.

---

## Change 2 — Scan-reveal on project cards

**Files:** `src/styles/globals.css`, `src/pages/index.tsx` (wrapper div +
`<span className="project-scan-line" />`)

**Check:** hover a project card. A thin gradient line sweeps top-to-bottom across
the image once per hover-enter, 700ms ease-out, fading as it descends. Leave and
re-enter to retrigger. It must not loop. VanillaTilt's tilt and glare are
untouched and should still work — this layers a sibling element inside the image
wrapper rather than replacing anything.

The sweep animates `top: 0 → 100%` rather than a fixed pixel translate, so it
tracks the image height at every breakpoint. (It was originally written as
`translateY(320px)`, which overshot on the narrower two-column layout.)

Under `prefers-reduced-motion: reduce` the line is fully hidden and the card
falls back to its previous hover behavior. Verify in DevTools → Rendering →
Emulate CSS prefers-reduced-motion.

**Back it out:** delete the `@keyframes project-scan`, `.project-scan-line`,
`.group:hover .project-scan-line`, and the matching reduced-motion block from
`globals.css`, then remove the `<span className="project-scan-line" />` line and
the `project-scan` class from `index.tsx`.

---

## Change 3 — Skills as a connected graph

**Files:** `src/components/SkillsGraph.tsx` (new), `src/pages/index.tsx`
(services section)

**Check:** the `#services` section now shows three nodes — AI/ML, Cybersecurity,
Full-Stack Dev — joined by dashed lines that slowly drift, with a dot orbiting
the triangle and "one practice" at the centroid. Sub-skills branch off each node
(Python / MH-100K / Risk models, Android malware / Secure APIs, MERN / Next.js /
Tailwind). Pure inline SVG plus Framer Motion transforms; no graph library.

Colors come from `hsl(var(--primary))`, `--secondary`, and `--muted-foreground`,
so it inherits your existing tokens. Under reduced motion all drift and orbiting
stop and the orbiting dot is not rendered at all.

**This replaced the previous services markup**, so backing it out means restoring
that markup:

```bash
git show HEAD:src/pages/index.tsx > /tmp/old-index.tsx   # copy the old section back
rm src/components/SkillsGraph.tsx
```

Check the sub-skill labels for accuracy — I inferred them from your projects and
you may want different ones.

---

## Change 4 — Bento-grid about/stats

**Files:** `src/pages/index.tsx` (`aboutTiles` replaces `aboutStats`)

**Check:** the `#about` stat row is now a four-column grid where the featured
"Currently building" tile spans `md:col-span-2 md:row-span-2` and three smaller
tiles carry 1+ years, 5+ technologies, and an IEEE research tile with a
`MH-100K` detail line. All tiles reuse the existing
`rounded-md bg-white/5 p-6 shadow-md backdrop-blur` language. Collapses to one
column on mobile.

**Please fact-check the copy** — I wrote the "Currently building" blurb and the
research tile from context, and both make claims about you that should be true.

**Back it out:** revert the `aboutTiles` array and the `#about` grid markup in
`index.tsx` (see hunk selection below).

---

## Change 5 — Clip-path section reveals

**Files:** `src/components/SectionReveal.tsx` (new), `src/pages/index.tsx`
(wraps about / projects / services / contact)

**Check:** scrolling into each section wipes it in from the top edge
(`inset(0 0 100% 0)` → `inset(0 0 0% 0)`) combined with the existing opacity and
a 16px x-offset, 500ms ease-out, `viewport={{ once: true }}` so it fires once.
Should read as precise, not showy. Under reduced motion it degrades to a plain
200ms opacity fade with no clipping or movement.

Watch for interaction with Locomotive Scroll: the reveal is driven by Framer
Motion's `whileInView`, and the `amount: 0.2` threshold means a section must be
20% visible. If any section feels late on a tall viewport, that number is the
dial to turn.

**Back it out:** remove the `<SectionReveal>` wrappers in `index.tsx` and delete
the component.

---

## Backing out one of changes 2–5 specifically

Items 2, 4, and 5 all edit `src/pages/index.tsx`, so a blanket
`git checkout -- src/pages/index.tsx` would revert all of them plus the projects
refresh. To pick and choose, step through hunks interactively:

```bash
git checkout -p src/pages/index.tsx
```

Answer `y` to discard a hunk, `n` to keep it.

---

## Housekeeping included

- **`_app.tsx`** — swapped `AppType` (imported from an internal Next path) for
  the public `AppProps` from `next/app`, which fixes two implicit-`any` errors.
- **`src/types/styled-jsx.d.ts`** (new) — declares the `jsx` / `global`
  attributes for `<style jsx global>` in `Container.tsx`, fixing the third error.
- **`.gitattributes`** (new) — your working tree had been converted to CRLF,
  which made all 32 tracked files show as modified. I converted them back to LF
  and added this file so it does not recur.
- **`.gitignore`** — added `tsconfig.tsbuildinfo` (generated cache).
- **Removed a stale `.git/index.lock`** — a git process crashed during the
  interrupted session on 2026-08-21 at 18:21 and left a zero-byte lock file
  behind. There was no merge/rebase/cherry-pick state alongside it, so it was
  dead, but it would have made your next `git add` or `git commit` fail with
  *"Another git process seems to be running in this repository."* It is gone now.

---

## About the noisy `git status`

`git status` currently lists **33 modified files. Only 8 of them are real.** I
verified this the hard way rather than trusting the report — for each flagged
file I compared the working-tree blob hash against the index blob hash, and 25
of the 33 are **byte-for-byte identical** (same OID, `cmp` clean).

The cause is a stale stat cache. The index still holds the CRLF-era file sizes
(for `.dockerignore`: cached `size: 55`, actual 48), and it records
`dev: 0  ino: 0`, so git sees a stat mismatch and short-circuits to "modified"
without comparing content. `git diff` applies the `.gitattributes` eol filter to
both sides, finds nothing, and prints nothing — which is why the two commands
disagree. `git update-index --really-refresh` rewrites the index but the cache
goes stale again immediately, because this repo is being read through a Linux
view of a Windows filesystem that can't return stable inode data.

**Nothing spurious can reach your commit.** `git add -An` (dry run) stages
exactly these 17 paths and no others:

```
 M .gitignore          M src/components/Container.tsx
 M README.md           M src/pages/_app.tsx
 M package.json        M src/pages/index.tsx
 M pnpm-lock.yaml      M src/styles/globals.css

?? .gitattributes              ?? src/components/SkillsGraph.tsx
?? REVIEW-NOTES.md             ?? src/components/ui/command.tsx
?? src/components/CommandPalette.tsx  ?? src/components/ui/dialog.tsx
?? src/components/SectionReveal.tsx   ?? src/data/projects.ts
                                      ?? src/types/styled-jsx.d.ts
```

If the noise still bothers you on Windows, run `git update-index --really-refresh`
there once — native stat data will make it stick.

---

## Verification status — read before committing

**Done:** `tsc --noEmit` passes with zero errors (it reported three before the
housekeeping fixes above). I also re-ran it as
`tsc --noEmit --noUnusedLocals --noUnusedParameters`, which **also passes with
zero errors** — that is the direct answer to your "is there dead code or an
unused image import anywhere" question: there are no unused imports, unused
locals, or dead parameters left in the codebase.

Tailwind compiles the stylesheet cleanly and I confirmed the scanline keyframe,
hover trigger, and reduced-motion override all reach the compiled CSS. Every
`/assets/` reference in the codebase was cross-checked against the actual
contents of `public/assets/`, and the only `Adventure-awaits` mentions left
anywhere are the ones in this file.

**ESLint did not run.** I reconstructed enough of a dependency tree to get it
installed, but it exceeded the sandbox's ~170s per-command wall clock during
startup on the slow filesystem mount. The `tsc` run above covers the
unused-import and dead-code half of what it would have caught. For the
`react-hooks` half I checked the new components by hand instead: `CommandPalette`
is the only one with hooks, both of its `useEffect`s are unconditional and at top
level, and both close over nothing but stable state setters — the open/close
toggle uses the functional `setOpen((prev) => !prev)` form, so the empty
dependency arrays are correct and `exhaustive-deps` has nothing to flag. Still
worth a `pnpm lint` on your side for the project config's own rules.

I also checked the two things that fail *silently* rather than loudly:
`styles.pill` does resolve (`Home.module.css` line 6 — a missing CSS-module key
would have quietly rendered an unstyled pill), and `animate-blink` plus
`@keyframes blink` are both present in `globals.css`.

**Not done — this is the part I could not do for you.** I could not run
`next build` or `next dev`. This sandbox has the npm registry blocked, and your
`node_modules` was installed by pnpm on Windows, so its symlinks are unreadable
from Linux. I reconstructed a working dependency tree from the pnpm store and
lockfile, which is how the type check and Tailwind compile above ran, but a full
build did not complete.

**So nothing here has been seen in a browser.** Please run `pnpm dev` and check
the five items above — in particular that scroll, tilt, and glare still behave —
before you commit. Animation and layout work needs eyes on it, and mine never
got there.

**Known gaps:** the three missing screenshots; no theme toggle in the palette;
and VanillaTilt itself does not honor `prefers-reduced-motion` (pre-existing, not
introduced here — worth a follow-up if you care about that).
