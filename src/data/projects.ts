export type Project = {
  title: string;
  description: string;
  image: string;
  href: string;
};

/** Fallback until real screenshots are added to public/assets/. */
const PLACEHOLDER_IMAGE = "/assets/Bluefusion.jpg";

export const projects: Project[] = [
  {
    title: "BlueFusion",
    description: "AI, Machine Learning, and modern software development projects.",
    image: "/assets/Bluefusion.jpg",
    href: "https://github.com/Abhiraj-gupta/BluefusionF",
  },
  {
    title: "Amazon Clone",
    description: "An Amazon-inspired e-commerce clone with a rule-based AI chatbot.",
    // TODO: real screenshot at /assets/Amazon-clone.jpg
    image: PLACEHOLDER_IMAGE,
    href: "https://abhiraj-amazon-clone.vercel.app/",
  },
  {
    title: "CareSync",
    description: "A healthcare backend platform for care coordination and patient management.",
    // TODO: real screenshot at /assets/Caresync.jpg
    image: PLACEHOLDER_IMAGE,
    href: "https://github.com/Abhiraj-gupta/CareSync-Healthcare-Backend",
  },
  {
    title: "Android Malware Detection Research",
    description: "IEEE-style research paper on Android malware detection using the MH-100K dataset.",
    // TODO: real screenshot at /assets/Malware-detection-research.jpg
    image: PLACEHOLDER_IMAGE,
    href: "https://github.com/Abhiraj-gupta",
  },
  {
    title: "Heart Disease Predictor",
    description: "A machine learning app for early risk prediction",
    image: "/assets/Heart-disease-predictor.jpg",
    href: "https://github.com/Abhiraj-gupta/Heart-Disease-Predictor",
  },
];
