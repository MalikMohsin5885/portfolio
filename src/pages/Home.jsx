import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../components/layout";
import {
  Hero,
  HowItWorks,
  FeaturesSection,
  TrustStrip,
  Projects,
  SkillsSection,
  FAQ,
  CTA,
} from "../components/sections";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (!scrollTo) return undefined;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.replaceState({}, document.title);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <main className="pb-24 md:pb-28">
        <Hero />
        <Projects />
        <SkillsSection />
        <HowItWorks />
        <FeaturesSection />
        <TrustStrip />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
