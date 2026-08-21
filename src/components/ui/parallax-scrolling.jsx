import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronDown } from "react-icons/fi";
import Button from "./Button";
import SectionTag from "./SectionTag";
import "./parallax-scrolling.css";

gsap.registerPlugin(ScrollTrigger);

const LAYER_1 =
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp";
const LAYER_2 =
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp";
const LAYER_4 =
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp";

const PARALLAX_LAYERS = [
  { layer: "1", yPercent: 70 },
  { layer: "2", yPercent: 55 },
  { layer: "3", yPercent: 40 },
  { layer: "4", yPercent: 10 },
];

export function ParallaxHero({
  tag = "Full-stack developer",
  title = "Build fast,",
  titleEm = "ship clean code.",
  subtitle = "I design and develop web & mobile products with React, Node, and modern cloud tooling.",
  cta = "Get in touch",
  ctaSecondary = "View experience",
  availability = "Open to freelance, full-time, and remote roles",
  techStack = ["React", "TypeScript", "Node.js", "React Native", "PostgreSQL"],
}) {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const root = parallaxRef.current;
    const triggerElement = root?.querySelector("[data-parallax-layers]");
    if (!triggerElement) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
          invalidateOnRefresh: true,
        },
      });

      PARALLAX_LAYERS.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          { yPercent: layerObj.yPercent, ease: "none" },
          idx === 0 ? undefined : "<",
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="parallax" ref={parallaxRef} id="home">
      <section className="parallax__header" data-parallax-layers>
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" aria-hidden="true" />
          <div className="parallax__layers">
            <img
              src={LAYER_1}
              loading="eager"
              width={800}
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
            />
            <img
              src={LAYER_2}
              loading="eager"
              width={800}
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <div className="parallax__title-block">
                <SectionTag className="parallax__tag">{tag}</SectionTag>
                <h1 className="parallax__title">
                  {title}
                  <br />
                  <em>{titleEm}</em>
                </h1>
                <p className="parallax__subtitle">{subtitle}</p>
                <div className="parallax__actions">
                  <Button href="#contact">{cta}</Button>
                  <Button href="#experience" variant="secondary">
                    {ctaSecondary}
                  </Button>
                </div>
                <p className="parallax__availability">{availability}</p>
                <div className="parallax__tech-pills">
                  {techStack.map((item) => (
                    <span key={item} className="parallax__tech-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <img
              src={LAYER_4}
              loading="eager"
              width={800}
              data-parallax-layer="4"
              alt=""
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade" aria-hidden="true" />
        </div>
      </section>

      <section className="parallax__content">
        <div className="parallax__scroll-hint">
          <FiChevronDown className="parallax__scroll-icon" aria-hidden="true" />
          <span>Scroll to explore</span>
        </div>
      </section>
    </div>
  );
}

/** Original Osmo export name */
export const ParallaxComponent = ParallaxHero;

export default ParallaxHero;
