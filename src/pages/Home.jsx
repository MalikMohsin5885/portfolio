import { NavBar, BottomBar, Footer } from "../components/layout";
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
  return (
    <>
      <NavBar />
      <main>
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
      <BottomBar />
    </>
  );
};

export default Home;
