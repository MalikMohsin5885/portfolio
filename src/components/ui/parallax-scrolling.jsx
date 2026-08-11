import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { TypeAnimation } from "react-type-animation";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import resumePDF from "../../assets/Mohsin Rasheed Resume.pdf";
import "./parallax-scrolling.css";

const LAYER_1 =
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp";
const LAYER_2 =
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp";
const LAYER_4 =
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp";

export function ParallaxComponent() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = parallaxRef.current;
    const triggerElement = root?.querySelector("[data-parallax-layers]");
    const previousScrollBehavior =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    let tl;
    if (triggerElement) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(
            `[data-parallax-layer="${layerObj.layer}"]`
          ),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      gsap.ticker.remove(tickerCb);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef} id="home">
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />
          <div data-parallax-layers className="parallax__layers">
            <img
              src={LAYER_1}
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
            />
            <img
              src={LAYER_2}
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <div className="parallax__title-block">
                <h1 className="parallax__title">Mohsin</h1>
                <TypeAnimation
                  sequence={[
                    "Web Developer",
                    2000,
                    "Mobile Developer",
                    2000,
                    "Freelancer",
                    2000,
                    "",
                  ]}
                  speed={30}
                  wrapper="p"
                  repeat={Infinity}
                  className="parallax__subtitle"
                />
                <div className="parallax__actions">
                  <a href="#contact" className="parallax__btn parallax__btn--primary">
                    Hire Me
                  </a>
                  <a
                    href={resumePDF}
                    download
                    className="parallax__btn parallax__btn--ghost"
                  >
                    Resume <FiDownload />
                  </a>
                </div>
                <div className="parallax__socials">
                  <a
                    className="parallax__social"
                    href="https://github.com/MalikMohsin5885"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                    <AiFillGithub className="h-[1.35rem] w-[1.35rem]" />
                  </a>
                  <a
                    className="parallax__social"
                    href="https://www.linkedin.com/in/mohsin-rasheed-b81b9a233/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Linkedin
                    <FaLinkedinIn className="h-[1.2rem] w-[1.2rem]" />
                  </a>
                </div>
              </div>
            </div>
            <img
              src={LAYER_4}
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt=""
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade" />
        </div>
      </section>
      <section className="parallax__content" aria-hidden="true">
        <div className="parallax__content-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 160 160"
            fill="none"
            className="osmo-icon-svg"
          >
            <path
              d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
              fill="currentColor"
            />
          </svg>
          <p>Building web &amp; mobile products with clean code and clear craft.</p>
        </div>
      </section>
    </div>
  );
}

export default ParallaxComponent;
