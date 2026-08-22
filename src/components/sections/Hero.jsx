import { useEffect } from "react";
import ScrollExpandMedia from "../ui/scroll-expansion-hero";
import Button from "../ui/Button";
import { PLACEHOLDER } from "../../data/placeholder";
import {
  PARALLAX_MOUNT_LAYERS,
  PARALLAX_PERSON_LAYER,
} from "../../data/heroAssets";
import profileImg from "../../assets/profile.png";
import { downloadResume, RESUME_FILENAME, RESUME_URL } from "../../utils/resumeDownload";

const HeroAbout = ({ hero }) => (
  <div className="hero-about flex h-full min-h-0 flex-col">
    <div className="hero-about__scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
        About me
      </p>
      <h2 className="mt-2 font-serif text-xl leading-tight text-white md:mt-3 md:text-3xl">
        {hero.title}
      </h2>
      <p className="mt-1 text-sm font-semibold text-glow">{hero.tag}</p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-200 md:mt-5 md:text-base">
        {hero.subtitle}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:mt-4 md:text-base">
        {hero.about}
      </p>
      <p className="mt-3 hidden text-sm leading-relaxed text-neutral-300 md:mt-4 md:block md:text-base">
        {hero.aboutExtra}
      </p>
    </div>

    <div className="hero-about__actions shrink-0 border-t border-neutral-800/80 bg-black pt-3 md:border-0 md:pt-4">
      <div className="flex flex-wrap gap-2.5 md:gap-3">
        <Button
          href="#contact"
          className="!border-vast/20 !bg-lumen-dark !px-4 !py-2.5 text-sm !text-vast hover:!bg-lumen md:!px-5 md:!py-3"
        >
          Contact me
        </Button>
        <Button
          href={RESUME_URL}
          download={RESUME_FILENAME}
          onClick={downloadResume}
          variant="secondary"
          className="!border-neutral-500/50 !bg-transparent !px-4 !py-2.5 text-sm !text-neutral-100 hover:!bg-neutral-800/40 md:!px-5 md:!py-3"
        >
          Download resume
        </Button>
      </div>
    </div>
  </div>
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
      hook={hero.hook}
      title={hero.title}
    >
      <HeroAbout hero={hero} />
    </ScrollExpandMedia>
  );
};

export default Hero;
