import { type AppProps } from "next/app";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

import "@/styles/globals.css";

/* Display face for the oversized headlines. Inter Tight's narrower
   proportions at 900 are the closest free match to the reference's
   Helvetica-Now-Display-Black. */
const display = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
});

/* Body copy. */
const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

/* Every small label in the reference is wide-tracked uppercase mono. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable} font-sans`}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
