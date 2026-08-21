import { useEffect } from "react";
import ScrollExpandMedia from "../ui/scroll-expansion-hero";
import Button from "../ui/Button";
import { PLACEHOLDER } from "../../data/placeholder";
import {
  PARALLAX_MOUNT_LAYERS,
  PARALLAX_PERSON_LAYER,
} from "../../data/heroAssets";
import profileImg from "../../assets/profile.png";
import resumePDF from "../../assets/Mohsin Rasheed Resume.pdf";

const RESUME_FILENAME = "Mohsin Rasheed Resume.pdf";

const handleResumeDownload = (e) => {
  e.preventDefault();
  const link = document.createElement("a");
  link.href = resumePDF;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const HeroAbout = ({ hero }) => (
  <>
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
      About me
    </p>
    <h2 className="mt-3 font-serif text-2xl leading-tight text-white md:text-3xl">
      {hero.title}
    </h2>
    <p className="mt-1 text-sm font-semibold text-glow">{hero.tag}</p>
    <p className="mt-5 text-sm leading-relaxed text-neutral-200 md:text-base">
      {hero.subtitle}
    </p>
    <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">
      {hero.about}
    </p>
    <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">
      {hero.aboutExtra}
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <Button href="#contact" className="!px-5 !py-3 text-sm">
        Contact me
      </Button>
      <Button
        href={resumePDF}
        download={RESUME_FILENAME}
        onClick={handleResumeDownload}
        variant="secondary"
        className="!border-neutral-500 !bg-transparent !px-5 !py-3 text-sm !text-neutral-100"
      >
        Download resume
      </Button>
    </div>
  </>
);
const Hero = () => {
  const { hero } = PLACEHOLDER;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollExpandMedia
      profileSrc={profileImg}
      personSrc={PARALLAX_PERSON_LAYER}
      bgLayers={PARALLAX_MOUNT_LAYERS}
      title={hero.title}
    >
      <HeroAbout hero={hero} />
    </ScrollExpandMedia>
  );
};

export default Hero;
