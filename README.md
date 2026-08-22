# Abhiraj Gupta – Full Stack Developer

🚀 Passionate Full Stack Developer with experience in MERN, Docker, and AI-based applications.

## 🔧 Skills
- Frontend: React, Next.js, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB, MySQL
- Tools: Git, Docker, GitHub

## 📌 Featured Projects
### BlueFusion
- AI, Machine Learning, and modern software development projects.
- GitHub: https://github.com/Abhiraj-gupta/BluefusionF

### Amazon Clone
- An Amazon-inspired e-commerce clone with a rule-based AI chatbot.
- Live: https://abhiraj-amazon-clone.vercel.app/

### CareSync
- A healthcare backend platform for care coordination and patient management.
- GitHub: https://github.com/Abhiraj-gupta/CareSync-Healthcare-Backend

### Android Malware Detection Research
- IEEE-style research paper on Android malware detection using the MH-100K dataset.
- GitHub: https://github.com/Abhiraj-gupta

### Heart Disease Predictor
- A machine learning app for early risk prediction
- GitHub: https://github.com/Abhiraj-gupta/Heart-Disease-Predictor

## 📫 Contact
- GitHub: https://github.com/Abhiraj-gupta
- LinkedIn: https://www.linkedin.com/in/abhiraj-gupta-1b33a528a/
- LeetCode: https://leetcode.com/u/KGxAbhiraj01/

---

## 🛠 Running the site

```bash
pnpm install
pnpm dev
```

## 🗂 Where things live

All copy and links are in `src/data/site.ts`, and the project list is in
`src/data/projects.ts` — edit those rather than the components. Sections are
composed in `src/pages/index.tsx` from `src/components/site/`:

| File | What it is |
| --- | --- |
| `Nav.tsx` | Fixed header, theme toggle, live GitHub star count, full-screen menu |
| `Hero.tsx` | Name, role, focus pills, hero image |
| `Marquee.tsx` | Scroll-linked horizontal band |
| `About.tsx` | Bio and grouped skills |
| `FeaturedWork.tsx` | Scroll-scrubbed project carousel |
| `Contact.tsx` | Address card, socials, footer |
| `ScrollProgress.tsx` `SocialRail.tsx` `Clock.tsx` `Reveal.tsx` | Shell and helpers |

Design tokens are defined once in `src/styles/globals.css` (`--bone`, `--ink`,
`--body`, `--mute`, `--rule`, `--live`) with a matching dark set under `.dark`,
and exposed to Tailwind in `tailwind.config.ts`. There are no hardcoded colours
in any component, so both themes follow from the tokens.

## ⚠️ Screenshots still needed

`src/data/projects.ts` marks three projects `hasImage: false`. Until the files
below exist, those projects render a labelled placeholder rather than another
project's screenshot. Add the file, then flip the flag to `true`:

- `public/assets/Amazon-clone.jpg`
- `public/assets/Caresync.jpg`
- `public/assets/Malware-detection-research.jpg`

A hero photo is also missing — add `public/assets/hero.jpg` and set
`HERO_IMAGE` at the top of `src/components/site/Hero.tsx`.

## 📝 Notes

Locomotive Scroll and the Spline 3D scene were removed: Locomotive virtualises
scroll position, which breaks the `useScroll` hook the marquee and the project
carousel depend on. The site uses native scrolling.

Every animation is behind `prefers-reduced-motion` — scroll-linked movement
becomes static, reveals render in their final state, and smooth scrolling falls
back to instant.

See `REDESIGN-NOTES.md` for the current state of the rebuild.
