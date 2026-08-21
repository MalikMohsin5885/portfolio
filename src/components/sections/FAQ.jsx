import { useState } from "react";
import SectionTag from "../ui/SectionTag";
import { PLACEHOLDER } from "../../data/placeholder";

const FAQ = () => {
  const { faq } = PLACEHOLDER;
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="padding-global">
        <div className="mx-auto max-w-content text-center">
          <SectionTag>{faq.tag}</SectionTag>
          <h2 className="heading-h2 mt-6 text-vast">
            {faq.title} <em className="italic">{faq.titleEm}</em>
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-content gap-4 md:grid-cols-2 md:gap-6">
          <div className="gradient-mask-y max-h-[420px] overflow-y-auto rounded-section bg-lumen-dark p-4 md:p-6">
            <ul className="space-y-2">
              {faq.items.map((item, i) => (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`w-full rounded-xl px-4 py-4 text-left text-sm font-semibold transition-colors ${
                      active === i
                        ? "bg-vast text-lumen"
                        : "text-vast/70 hover:bg-vast/5 hover:text-vast"
                    }`}
                  >
                    {item.q}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-h-[280px] flex-col justify-center rounded-section bg-lumen-dark p-8 md:p-10">
            <div className="mb-6 font-serif text-4xl text-fathom/30">MR</div>
            <div key={active} className="faq-answer-enter">
              <h3 className="font-serif text-xl text-vast">{faq.items[active].q}</h3>
              <p className="mt-4 leading-relaxed text-vast/70">{faq.items[active].a}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
