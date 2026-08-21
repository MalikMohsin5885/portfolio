import { useRef } from "react";
import { experience } from "../../data/experience";
import { useExperienceStack } from "../../hooks/useExperienceStack";
import { useScrollCorners } from "../../hooks/useScrollCorners";

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const outerRef = useRef(null);
  const pinRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);

  useScrollCorners(outerRef, 80);
  useExperienceStack(sectionRef, pinRef, backRef, frontRef, experience.items);

  const first = experience.items[0];

  return (
    <section id="experience" ref={sectionRef} className="exp-section relative">
      <div ref={outerRef} data-corners="80" data-corners-mobile="2.5rem" className="exp-outer bg-vast">
        <div ref={pinRef} className="exp-green-shell bg-fathom text-lumen">
          <div className="padding-global flex h-full min-h-[100dvh] flex-col">
            <div className="exp-header mx-auto max-w-content pt-16 text-center md:pt-20">
              <p className="section-tag !text-lumen/50">{experience.tag}</p>
              <h2 className="heading-h1 mt-5 is-small text-lumen">
                {experience.title} <em className="italic">{experience.titleEm}</em>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-lumen/75 text-balance md:mt-6">
                {experience.subtitle}
              </p>
            </div>

            <div className="exp-cards-stage mx-auto mt-10 w-full max-w-4xl flex-1 pb-12 md:mt-14 md:pb-16">
              {/* Back card — smaller, Wispr "Keyboard / 45 wpm" */}
              <div
                ref={backRef}
                className="exp-card-back absolute bottom-8 left-1/2 z-[1] w-[78%] max-w-md -translate-x-1/2 md:bottom-10"
              >
                <div className="rounded-[1.25rem] border-4 border-lumen/10 bg-vast/25 p-5 backdrop-blur-sm md:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <span data-exp-back-label className="font-serif text-xl md:text-2xl">
                      {first.label}
                    </span>
                    <span
                      data-exp-back-metric
                      className="font-serif text-2xl tracking-tight md:text-3xl"
                    >
                      {first.metric}
                    </span>
                  </div>
                  <div className="exp-marquee mt-4 overflow-hidden">
                    <p
                      data-exp-back-marquee
                      className="exp-marquee-text whitespace-nowrap text-sm font-semibold text-lumen/45"
                    >
                      {first.summary} · {first.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Front card — large, Wispr "Flow / 220 wpm" */}
              <div
                ref={frontRef}
                className="exp-card-front relative z-[2] mx-auto h-full min-h-[22rem] w-full max-w-3xl md:min-h-[26rem]"
              >
                <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-lumen/15 shadow-2xl">
                  <img
                    data-exp-front-image
                    src={first.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-vast/80 via-fathom/75 to-fathom/90" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span data-exp-front-label className="text-sm font-semibold uppercase tracking-wider text-lumen/70">
                          {first.label}
                        </span>
                        <span
                          data-exp-front-metric
                          className="font-serif text-3xl leading-none md:text-4xl"
                        >
                          {first.metric}
                        </span>
                      </div>
                      <h3 data-exp-front-company className="mt-4 font-serif text-2xl md:text-3xl">
                        {first.company}
                      </h3>
                      <p data-exp-front-role className="mt-1 text-lg font-semibold text-glow">
                        {first.role}
                      </p>
                      <p data-exp-front-period className="mt-1 text-sm text-lumen/60">
                        {first.period}
                      </p>
                      <p data-exp-front-summary className="mt-4 max-w-lg text-base leading-relaxed text-lumen/85">
                        {first.summary}
                      </p>
                    </div>

                    <div className="exp-marquee mt-6 overflow-hidden rounded-xl bg-vast/30 py-3">
                      <p
                        data-exp-front-marquee
                        className="exp-marquee-text exp-marquee-text-fast whitespace-nowrap px-4 text-sm font-semibold text-lumen/90"
                      >
                        {first.highlights} · {first.highlights}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
