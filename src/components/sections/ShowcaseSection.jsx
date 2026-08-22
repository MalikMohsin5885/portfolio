import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "../ui/SectionTag";
import { PLACEHOLDER } from "../../data/placeholder";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const cardRef = useRef(null);
  const slowRef = useRef(null);
  const { showcase } = PLACEHOLDER;

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const card = cardRef.current;
    const slow = slowRef.current;
    if (!section || !pin || !card || !slow) return;

    const ctx = gsap.context(() => {
      gsap.set(card, { scale: 0.85, opacity: 0.6, y: 40 });
      gsap.set(slow, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: pin,
          scrub: 1.2,
        },
      });

      tl.to(slow, { opacity: 0.3, y: -20, duration: 1 }, 0)
        .to(card, { scale: 1, opacity: 1, y: 0, duration: 1 }, 0.3)
        .to(card, { boxShadow: "0 32px 80px rgba(0,0,0,0.25)", duration: 0.5 }, 0.8);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="relative">
      <div ref={pinRef} className="corner-section section-surface mx-4 overflow-hidden md:mx-8">
        <div className="padding-global py-20 md:py-28">
          <div className="mx-auto max-w-content text-center">
            <SectionTag className="!text-lumen/60">{showcase.tag}</SectionTag>
            <h2 className="heading-h2 mt-6 text-lumen">
              {showcase.title} <em className="italic">{showcase.titleEm}</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-lumen/70 text-balance">
              {showcase.subtitle}
            </p>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div
              ref={slowRef}
              className="mb-6 rounded-section border border-lumen/10 bg-vast/20 p-6"
            >
              <div className="mb-3 flex items-center justify-between text-sm text-lumen/60">
                <span>{showcase.slowLabel}</span>
                <span className="font-mono">{showcase.slowSpeed}</span>
              </div>
              <p className="overflow-hidden whitespace-nowrap font-mono text-sm text-lumen/40">
                {showcase.slowText}
              </p>
            </div>

            <div
              ref={cardRef}
              className="mockup-card rounded-section-lg border border-lumen/20 bg-vast p-1"
            >
              <div className="rounded-[1.2rem] bg-gradient-to-br from-vast to-vast/80 p-6 md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-serif text-xl text-lumen">{showcase.fastLabel}</span>
                  <span className="rounded-full bg-glow px-3 py-1 font-mono text-sm font-bold text-vast">
                    {showcase.fastSpeed}
                  </span>
                </div>
                <p className="text-lg leading-relaxed text-lumen/90">{showcase.fastText}</p>
                <div className="mt-6 flex gap-2">
                  {["Filler removed", "Correction caught", "Formatted"].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-lumen/10 px-3 py-1 text-xs font-medium text-glow"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
