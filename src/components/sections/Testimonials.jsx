import { useRef } from "react";
import SectionTag from "../ui/SectionTag";
import { TestimonialCard } from "./TestimonialCard";
import { useTestimonialWaveSlider } from "../../hooks/useTestimonialWaveSlider";
import { PLACEHOLDER } from "../../data/placeholder";

const Testimonials = () => {
  const { testimonials } = PLACEHOLDER;
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useTestimonialWaveSlider(wrapRef, trackRef, cardsRef, testimonials.items.length);

  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div className="padding-global pb-8 pt-20 md:pt-28">
        <div className="mx-auto max-w-wide text-center">
          <SectionTag>{testimonials.tag}</SectionTag>
          <h2 className="heading-h2 mt-6 text-vast text-balance">
            {testimonials.title}{" "}
            <em className="italic">{testimonials.titleEm}</em>
          </h2>
        </div>
      </div>

      {/* Tall scroll area — height set by wave slider hook */}
      <div ref={wrapRef} className="testi-wave-height relative min-h-[350vh]">
        {/* Sticky 3D stage — cards orbit on rotateX as you scroll */}
        <div
          ref={trackRef}
          className="testi-wave-track sticky top-0 flex min-h-screen items-center justify-center overflow-hidden"
        >
          {testimonials.items.map((item, i) => (
            <div
              key={item.id || i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="testi-wave-card"
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
