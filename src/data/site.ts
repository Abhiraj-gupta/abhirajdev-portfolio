/**
 * Every piece of site copy and every link lives here so it can be edited in
 * one place.
 *
 * Lines marked CHECK are drafts written from context — please correct them.
 */

export const site = {
  /** Nav wordmark, top-left. */
  wordmark: "AbhirajDev",

  name: { first: "ABHIRAJ", last: "GUPTA" },

  /** Hero headline, one word per line. */
  role: ["FULL-STACK", "DEVELOPER"],

  /** Outlined pills under the hero headline. */
  focus: ["AI / ML", "CYBERSECURITY", "MERN STACK"],

  /** CHECK — I don't know your city, so this says India only. */
  location: "INDIA",
  origin: "FROM INDIA WITH LOVE",

  /** CHECK — drafted tagline. */
  tagline: ["BUILDING SECURE, AI-DRIVEN", "WEB APPS THAT SHIP."],

  availability: {
    open: true,
    label: "OPEN FOR WORK",
    /** CHECK — is freelance accurate, or full-time only? */
    detail: ["OPEN FOR INTERNSHIPS / FULL-TIME", "BASED IN INDIA"],
  },

  /** CHECK — the reference has a short personal note here. */
  note: ["I BUILD ACROSS AI/ML,", "SECURITY AND THE WEB,", "AND CARE ABOUT THE DETAILS"],

  portfolioYear: "2026 PORTFOLIO",

  email: "abhirajgupta06072005@gmail.com",

  socials: {
    github: "https://github.com/Abhiraj-gupta",
    linkedin: "https://www.linkedin.com/in/abhiraj-gupta-1b33a528a/",
    leetcode: "https://leetcode.com/u/KGxAbhiraj01/",
  },

  /** Repo the nav star count is read from. */
  starRepo: "Abhiraj-gupta/BluefusionF",

  /** Oversized section headings. Second line is set in grey. */
  headings: {
    about: ["ABOUT", "ME"],
    work: ["FEATURED", "WORK"],
    contact: ["LET'S WORK", "TOGETHER"],
  },

  /** CHECK — intro line above the featured-work list. */
  workIntro:
    "A selection of things I have designed, built and shipped — full-stack products, machine-learning work and security research.",

  /** CHECK — intro line in the contact section. */
  contactIntro:
    "Open to internships, full-time roles and interesting freelance work. The fastest way to reach me is email — I reply to everything.",
} as const;

/**
 * Marquee rows. The reference sets the ampersand in grey italic serif as a
 * deliberate contrast against the bold grotesk.
 */
export const marqueeRows = [
  ["Web Dev", "App"],
  ["AI/ML", "Security"],
] as const;

/** CHECK — bio drafted from your projects. Correct anything overstated. */
export const aboutParagraphs = [
  "Full-stack developer working across AI/ML, cybersecurity and the MERN stack, focused on building applications that are fast, secure and actually finished.",
  "Authored IEEE-style research on Android malware detection using the MH-100K dataset, and built CareSync, a healthcare backend for care coordination and patient management.",
  "I care about clean code, sensible architecture and the details most projects skip — accessibility, performance and the parts of an interface people actually touch.",
] as const;

/**
 * Skill groups. Logos are rendered from local SVG files in
 * public/assets/logos/ — see REVIEW-NOTES.md for the list still needed.
 */
export const skillGroups = [
  {
    title: "FRONTEND",
    items: ["JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS", "TAILWIND CSS"],
  },
  {
    title: "BACKEND",
    items: ["NODE.JS", "EXPRESS", "PYTHON"],
  },
  {
    title: "DATABASE",
    items: ["MONGODB", "MYSQL"],
  },
  {
    title: "TOOLS",
    items: ["GIT", "DOCKER"],
  },
] as const;
