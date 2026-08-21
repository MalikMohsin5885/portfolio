import { NavBar, BottomBar, Footer } from "../components/layout";
import {
  Hero,
  LogoMarquee,
  ExperienceSection,
  HowItWorks,
  FeaturesSection,
  TrustStrip,
  Projects,
  FAQ,
  CTA,
} from "../components/sections";

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <LogoMarquee />
        <ExperienceSection />
        <HowItWorks />
        <FeaturesSection />
        <TrustStrip />
        <Projects />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <BottomBar />
    </>
  );
};

export default Home;
