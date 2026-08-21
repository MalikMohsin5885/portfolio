import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PER_ITEM = 110;
const SCRUB = 1.15;

export function useExperienceStack(sectionRef, pinRef, backRef, frontRef, items = []) {
  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!section || !pin || !back || !front || !items.length) return;

    let trigger = null;

    const fields = {
      backLabel: back.querySelector("[data-exp-back-label]"),
      backMetric: back.querySelector("[data-exp-back-metric]"),
      backMarquee: back.querySelector("[data-exp-back-marquee]"),
      frontLabel: front.querySelector("[data-exp-front-label]"),
      frontMetric: front.querySelector("[data-exp-front-metric]"),
      frontCompany: front.querySelector("[data-exp-front-company]"),
      frontRole: front.querySelector("[data-exp-front-role]"),
      frontPeriod: front.querySelector("[data-exp-front-period]"),
      frontSummary: front.querySelector("[data-exp-front-summary]"),
      frontMarquee: front.querySelector("[data-exp-front-marquee]"),
      frontImage: front.querySelector("[data-exp-front-image]"),
    };

    const setContent = (item, prev) => {
      if (!item) return;

      if (fields.frontLabel) fields.frontLabel.textContent = item.label;
      if (fields.frontMetric) fields.frontMetric.textContent = item.metric;
      if (fields.frontCompany) fields.frontCompany.textContent = item.company;
      if (fields.frontRole) fields.frontRole.textContent = item.role;
      if (fields.frontPeriod) fields.frontPeriod.textContent = item.period;
      if (fields.frontSummary) fields.frontSummary.textContent = item.summary;
      if (fields.frontMarquee) fields.frontMarquee.textContent = `${item.highlights} · ${item.highlights}`;
      if (fields.frontImage && item.image) fields.frontImage.src = item.image;

      const backItem = prev || item;
      if (fields.backLabel) fields.backLabel.textContent = backItem.label;
      if (fields.backMetric) fields.backMetric.textContent = backItem.metric;
      if (fields.backMarquee) fields.backMarquee.textContent = `${backItem.summary} · ${backItem.summary}`;
    };

    const render = (progress) => {
      const count = items.length;
      const idx = Math.min(count - 1, Math.floor(progress * count));
      const local = progress * count - idx;
      const item = items[idx];
      const prev = idx > 0 ? items[idx - 1] : null;

      setContent(item, prev);

      const grow = idx === 0 ? Math.min(1, local / 0.45) : 1;
      const swap = local < 0.12 && idx > 0 ? local / 0.12 : 1;

      gsap.set(back, {
        opacity: 0.45 + grow * 0.35,
        y: 24 - grow * 24,
        scale: 0.9 + grow * 0.05,
      });

      gsap.set(front, {
        opacity: swap,
        y: 56 - grow * 56,
        scale: 0.86 + grow * 0.14,
      });
    };

    render(0);

    const endScroll = items.length * SCROLL_PER_ITEM;

    const ctx = gsap.context(() => {
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${endScroll}%`,
        pin,
        scrub: SCRUB,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();

    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      ctx.revert();
      trigger = null;
    };
  }, [sectionRef, pinRef, backRef, frontRef, items]);
}
