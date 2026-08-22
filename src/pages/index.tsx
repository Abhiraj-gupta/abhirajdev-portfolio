import Head from "next/head";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import FeaturedWork from "@/components/site/FeaturedWork";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Nav from "@/components/site/Nav";
import ScrollProgress from "@/components/site/ScrollProgress";
import SocialRail from "@/components/site/SocialRail";
import { site } from "@/data/site";

const title = `${site.name.first} ${site.name.last} — Full-Stack Developer`;
const description =
  "Full-stack developer working across AI/ML, cybersecurity and the MERN stack.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ScrollProgress />
      <Nav />
      <SocialRail />

      <main className="min-h-screen pb-16">
        <Hero />
        <Marquee />
        <About />
        <FeaturedWork />
        <Contact />
      </main>
    </>
  );
}
