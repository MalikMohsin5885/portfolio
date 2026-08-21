import SectionTag from "../ui/SectionTag";
import { PLACEHOLDER } from "../../data/placeholder";

const LogoMarquee = () => {
  const { marquee } = PLACEHOLDER;
  const doubled = [...marquee.logos, ...marquee.logos];

  return (
    <section className="py-16 md:py-20">
      <div className="padding-global text-center">
        <SectionTag>{marquee.tag}</SectionTag>
      </div>
      <div className="relative mt-10 overflow-hidden">
        <div className="marquee-track gap-16 px-8">
          {doubled.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="whitespace-nowrap font-serif text-2xl text-vast/30 md:text-3xl"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
