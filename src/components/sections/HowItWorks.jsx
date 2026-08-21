import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "../ui/SectionTag";
import { PLACEHOLDER } from "../../data/placeholder";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const { process } = PLACEHOLDER;
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const tabsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const idx = Math.min(
            process.tabs.length - 1,
            Math.floor(self.progress * process.tabs.length)
          );
          setActiveTab(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [process.tabs.length]);

  const tab = process.tabs[activeTab];

  return (
    <section id="process" ref={sectionRef} className="py-24 md:py-32">
      <div className="padding-global">
        <div className="mx-auto max-w-content text-center">
          <SectionTag>{process.tag}</SectionTag>
          <h2 className="heading-h2 mt-6 text-vast text-balance">
            {process.title}{" "}
            <em className="italic">{process.titleEm}</em>
          </h2>
        </div>

        <div className="mx-auto mt-12 flex max-w-lg justify-center gap-2 md:gap-4">
          {process.tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (tabsRef.current[i] = el)}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                activeTab === i
                  ? "bg-vast text-lumen"
                  : "bg-lumen-dark text-vast/60 hover:text-vast"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-wide items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h3 className="heading-h3 text-vast">{tab.title}</h3>
            <p className="mt-4 text-vast/70">{tab.description}</p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mockup-card overflow-hidden rounded-section-lg border border-vast/10 bg-white">
              <div className="border-b border-vast/10 px-4 py-3 text-xs font-semibold text-vast/40">
                Message…
              </div>
              <div className="space-y-4 p-5">
                <div
                  key={`raw-${activeTab}`}
                  className="faq-answer-enter rounded-xl bg-lumen-dark p-4 text-sm text-vast/50"
                >
                  {tab.raw}
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-glow">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow" />
                  Cleaning up…
                </div>
                <div
                  key={`polished-${activeTab}`}
                  className="faq-answer-enter rounded-xl border border-fathom/20 bg-fathom/5 p-4 text-sm text-vast"
                >
                  {tab.polished}
                </div>
              </div>
              <div className="mx-4 mb-4 flex items-center gap-2 rounded-full border border-vast/10 bg-lumen px-3 py-2">
                <span className="text-xs text-vast/40">Flow</span>
                <div className="flex flex-1 gap-0.5">
                  {[...Array(16)].map((_, i) => (
                    <span
                      key={i}
                      className="w-0.5 rounded-full bg-fathom"
                      style={{ height: `${6 + Math.sin(i + activeTab) * 6}px` }}
                    />
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

export default HowItWorks;
