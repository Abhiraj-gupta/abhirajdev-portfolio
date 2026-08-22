export type Project = {
  title: string;
  description: string;
  /**
   * Intended screenshot path. When `hasImage` is false the file does not
   * exist yet and the UI renders a labelled placeholder naming this path —
   * drop the file in, flip the flag, done. It deliberately never shows one
   * project's screenshot under another project's title.
   */
  image: string;
  hasImage: boolean;
  href: string;
  /** Rendered as outlined pills on the featured-work panel. */
  tech: string[];
};

export const projects: Project[] = [
  {
    title: "BlueFusion",
    description: "AI, Machine Learning, and modern software development projects.",
    image: "/assets/Bluefusion.jpg",
    hasImage: true,
    href: "https://github.com/Abhiraj-gupta/BluefusionF",
    tech: ["Python", "Machine Learning", "Next.js"],
  },
  {
    title: "Amazon Clone",
    description: "An Amazon-inspired e-commerce clone with a rule-based AI chatbot.",
    image: "/assets/Amazon-clone.jpg",
    hasImage: false,
    href: "https://abhiraj-amazon-clone.vercel.app/",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "CareSync",
    description: "A healthcare backend platform for care coordination and patient management.",
    image: "/assets/Caresync.jpg",
    hasImage: false,
    href: "https://github.com/Abhiraj-gupta/CareSync-Healthcare-Backend",
    tech: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Android Malware Detection Research",
    description:
      "IEEE-style research paper on Android malware detection using the MH-100K dataset.",
    image: "/assets/Malware-detection-research.jpg",
    hasImage: false,
    href: "https://github.com/Abhiraj-gupta",
    tech: ["Python", "Scikit-learn", "Security"],
  },
  {
    title: "Heart Disease Predictor",
    description: "A machine learning app for early risk prediction",
    image: "/assets/Heart-disease-predictor.jpg",
    hasImage: true,
    href: "https://github.com/Abhiraj-gupta/Heart-Disease-Predictor",
    tech: ["Python", "Machine Learning", "Streamlit"],
  },
];
