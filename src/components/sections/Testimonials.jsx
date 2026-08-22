import SectionTag from "../ui/SectionTag";
import { CircularTestimonials } from "../ui/circular-testimonials";
import { circularTestimonials } from "../../data/circularTestimonials";
import { PLACEHOLDER } from "../../data/placeholder";

const Testimonials = () => {
  const { testimonials } = PLACEHOLDER;

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="padding-global">
        <div className="mx-auto max-w-wide text-center">
          <SectionTag>{testimonials.tag}</SectionTag>
          <h2 className="heading-h2 mt-6 text-vast text-balance">
            {testimonials.title} <em className="italic">{testimonials.titleEm}</em>
          </h2>
        </div>

        <div className="mx-auto mt-12 flex justify-center md:mt-16">
          <CircularTestimonials
            testimonials={circularTestimonials}
            autoplay
            colors={{
              name: "#1a1a1a",
              designation: "#454545",
              testimony: "#171717",
              arrowBackground: "#1a1a1a",
              arrowForeground: "#ffffeb",
              arrowHoverBackground: "#536b79",
            }}
            fontSizes={{
              name: "1.75rem",
              designation: "1rem",
              quote: "1.125rem",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
