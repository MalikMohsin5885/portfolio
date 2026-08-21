import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "../ui/SectionTag";
import { PLACEHOLDER } from "../../data/placeholder";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_DEMO = [
  { label: "English", text: "I'm getting started with the project. Here are a few options." },
  { label: "Deutsch", text: "Wie möchten Sie die Datei einrichten? Hier sind ein paar Optionen." },
  { label: "Español", text: "Estoy empezando con el proyecto. Aquí van algunas opciones." },
  { label: "हिन्दी", text: "प्रोजेक्ट पर काम शुरू हो गया। यहाँ कुछ विकल्प हैं।" },
];

const FeaturesSection = () => {
  const { features } = PLACEHOLDER;
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          const idx = Math.min(
            features.items.length - 1,
            Math.floor(self.progress * features.items.length)
          );
          setActive(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [features.items.length]);

  return (
    <section id="features" ref={sectionRef} className="py-24 md:py-32">
      <div className="padding-global">
        <div className="mx-auto max-w-content text-center">
          <SectionTag>{features.tag}</SectionTag>
          <h2 className="heading-h2 mt-6 text-vast text-balance">
            {features.title}{" "}
            <em className="italic">{features.titleEm}</em>
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-wide gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            {features.items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                className={`w-full rounded-section border p-6 text-left transition-all duration-300 ${
                  active === i
                    ? "border-vast/20 bg-lumen-dark shadow-lg"
                    : "border-transparent bg-transparent hover:bg-lumen-dark/50"
                }`}
              >
                <h3 className="font-serif text-xl text-vast">{item.title}</h3>
                <p className="mt-2 text-sm text-vast/60">{item.description}</p>
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center">
            <div className="mockup-card w-full max-w-md overflow-hidden rounded-section-lg border border-vast/10 bg-white p-6">
              {active === 0 && (
                <div className="faq-answer-enter space-y-4">
                  <p className="text-xs font-semibold uppercase text-vast/40">Language</p>
                  <div className="flex gap-2">
                    {FEATURE_DEMO.map((lang, i) => (
                      <span
                        key={lang.label}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          i === active % FEATURE_DEMO.length
                            ? "bg-fathom text-lumen"
                            : "bg-lumen-dark text-vast/60"
                        }`}
                      >
                        {lang.label}
                      </span>
                    ))}
                  </div>
                  <p className="font-serif text-lg text-vast">
                    {FEATURE_DEMO[active % FEATURE_DEMO.length].text}
                  </p>
                </div>
              )}
              {active === 1 && (
                <div className="faq-answer-enter space-y-4">
                  <p className="text-xs font-semibold uppercase text-vast/40">Add to vocabulary</p>
                  <div className="rounded-xl border border-vast/10 p-4">
                    <input
                      readOnly
                      value="Wispr Flow"
                      className="w-full bg-transparent font-medium text-vast outline-none"
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-vast/50">Share with team</span>
                      <div className="h-6 w-11 rounded-full bg-vast p-0.5">
                        <div className="h-5 w-5 translate-x-5 rounded-full bg-lumen transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {active === 2 && (
                <div className="faq-answer-enter space-y-4">
                  <p className="text-xs font-semibold uppercase text-vast/40">Snippets</p>
                  <div className="rounded-full bg-lumen-dark px-4 py-2 text-sm text-vast/60">
                    "my LinkedIn"
                  </div>
                  <div className="rounded-xl border border-fathom/20 bg-fathom/5 p-4 font-mono text-xs text-fathom break-all">
                    https://www.linkedin.com/in/john-doe/
                  </div>
                </div>
              )}
              {active === 3 && (
                <div className="faq-answer-enter space-y-4">
                  <div className="flex gap-2">
                    {["Formal", "Casual", "Very casual"].map((tone, i) => (
                      <span
                        key={tone}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          i === 1 ? "bg-vast text-lumen" : "bg-lumen-dark text-vast/60"
                        }`}
                      >
                        {tone}
                      </span>
                    ))}
                  </div>
                  <p className="text-vast">
                    Hey are you free for lunch tomorrow? Let's do 12 if that works for you
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
