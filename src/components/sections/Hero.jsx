import { ParallaxHero } from "../ui/parallax-scrolling";
import { PLACEHOLDER } from "../../data/placeholder";

const Hero = () => {
  const { hero } = PLACEHOLDER;

  return (
    <ParallaxHero
      tag={hero.tag}
      title={hero.title}
      titleEm={hero.titleEm}
      subtitle={hero.subtitle}
      cta={hero.cta}
      ctaSecondary={hero.ctaSecondary}
      availability={hero.availability}
      techStack={["React", "TypeScript", "Node.js", "React Native", "Firebase"]}
    />
  );
};

export default Hero;
