import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GAP_PCT = 14;
const GAP_GROW_PCT = 0;
const GAP_FROM_PX = 1920;
const GAP_PCT_MOBILE = 22;
const GAP_MIN_PX = 32;
const GAP_MAX_PX = 160;
const SCROLL_RATIO = 0.85;
const ORBIT_CARD_PCT = 65;
const ORBIT_MIN_PX = 220;
const PERSP_CARD_PCT = 260;
const ROT_IN = -50;
const ROT_OUT = 50;
const ROT_EASE = "power1.inOut";
const ROT_SPAN_PCT = 210;
const DECK_SCALE_GROW = 0.55;
const DECK_FROM_PX = 1920;
const DECK_SCALE_MAX = 2;
const CENTER_VH = 50;
const CENTER_VH_MOBILE = 50;
const MIN_W = 768;
const SCRUB = 1.5;
const SCRUB_MOBILE = true;
const LEAD_TRIM = true;
const EXIT_PAD_PCT = 12;

function attr(el, name) {
  const host = el?.closest?.(`[${name}]`);
  if (!host) return null;
  const v = parseFloat(host.getAttribute(name));
  return Number.isNaN(v) ? null : v;
}

/**
 * Wispr Flow testimonial wave slider — cards sweep L→R on a cylindrical
 * rotateX orbit while the track stays sticky. Ported from wisprflow.ai.
 */
export function useTestimonialWaveSlider(wrapRef, trackRef, cardsRef, itemCount = 0) {
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !itemCount) return;

    if (ScrollTrigger.config) {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }
    if (ScrollTrigger.isTouch && !ScrollTrigger.__wsNormalized) {
      ScrollTrigger.__wsNormalized = true;
      ScrollTrigger.normalizeScroll(true);
    }

    let scrollTween = null;
    let rebuildTimer = null;
    let lastW = window.innerWidth;

    function destroy() {
      if (scrollTween) {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
        scrollTween = null;
      }
    }

    function build() {
      destroy();

      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      const vw = window.innerWidth;
      const mobile = vw < MIN_W;
      const scrubVal = mobile ? SCRUB_MOBILE : SCRUB;
      let gapPct = attr(wrap, mobile ? "data-gap-mobile" : "data-gap");
      if (gapPct == null) gapPct = mobile ? GAP_PCT_MOBILE : GAP_PCT;
      const gapGrow = attr(wrap, "data-gap-grow") ?? GAP_GROW_PCT;
      let centerVh = attr(wrap, mobile ? "data-center-mobile" : "data-center");
      if (centerVh == null) centerVh = mobile ? CENTER_VH_MOBILE : CENTER_VH;
      const scrollRatio = attr(wrap, "data-scroll-ratio") ?? SCROLL_RATIO;
      let orbitPct = attr(wrap, "data-orbit") ?? ORBIT_CARD_PCT;

      cards.forEach((card) => {
        card.style.position = "absolute";
        card.style.left = "50%";
        card.style.top = `${centerVh}vh`;
        card.style.transformStyle = "preserve-3d";
        card.style.backfaceVisibility = "hidden";
        card.style.willChange = "transform";
        card.style.margin = "0";
      });

      const scaleGrow = attr(wrap, "data-deck-grow") ?? DECK_SCALE_GROW;
      const deckScale = mobile
        ? 1
        : Math.min(DECK_SCALE_MAX, Math.max(1, 1 + (vw / DECK_FROM_PX - 1) * scaleGrow));

      const widths = cards.map((c) => (c.offsetWidth || 1) * deckScale);
      const maxW = Math.max(...widths);
      const sorted = [...widths].sort((a, b) => a - b);
      const medW = sorted[Math.floor(sorted.length / 2)];

      const wideBonus = (Math.max(0, vw - GAP_FROM_PX) * gapGrow) / 100;
      const gapFor = (w) =>
        Math.min(GAP_MAX_PX, Math.max(GAP_MIN_PX, (w * gapPct) / 100 + wideBonus));
      const gapPx = gapFor(medW);

      const offsets = [0];
      for (let i = 1; i < cards.length; i++) {
        const pairW = (widths[i - 1] + widths[i]) / 2;
        offsets[i] = offsets[i - 1] + pairW + gapPx;
      }
      const spanPx = offsets[offsets.length - 1];
      const travelHalf = (vw + maxW) / 2 + (maxW * EXIT_PAD_PCT) / 100;

      const orbitPx = Math.max(ORBIT_MIN_PX, (medW * orbitPct) / 100);
      const perspPx = (medW * PERSP_CARD_PCT) / 100;
      track.style.perspective = `${perspPx}px`;
      track.style.transformStyle = "preserve-3d";

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        scale: deckScale,
        transformOrigin: `50% 50% -${orbitPx}px`,
        force3D: true,
      });

      const rotEase = gsap.parseEase(ROT_EASE);
      const RAD = Math.PI / 180;
      let rotSpanPct = attr(wrap, "data-rot-span") ?? ROT_SPAN_PCT;
      const rotHalf = rotSpanPct ? (medW * rotSpanPct) / 100 : travelHalf;

      const rotAt = (sx) => {
        let p = (sx + rotHalf) / (rotHalf * 2);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        return ROT_IN + (ROT_OUT - ROT_IN) * rotEase(p);
      };

      const shrinkAt = (sx) => {
        const depth = orbitPx * (1 - Math.cos(rotAt(sx) * RAD));
        return perspPx / (perspPx + depth);
      };

      const stretchAt = (sx) => {
        const f = shrinkAt(sx);
        return (medW * f + gapPx) / (medW + gapPx);
      };

      const STEP = 4;
      const LIMIT = travelHalf * 1.2;

      const integrate = (dir) => {
        const tbl = [0];
        let s = 0;
        let guard = 0;
        while (Math.abs(s) < LIMIT && guard++ < 20000) {
          s += dir * STEP * stretchAt(s);
          tbl.push(s);
        }
        return tbl;
      };

      const sPos = integrate(1);
      const sNeg = integrate(-1);

      const screenAt = (u) => {
        const tbl = u >= 0 ? sPos : sNeg;
        const k = Math.abs(u) / STEP;
        const i0 = Math.floor(k);
        if (i0 >= tbl.length - 1) {
          const last = tbl.length - 1;
          const slope = (tbl[last] - tbl[last - 1]) / STEP;
          return tbl[last] + (Math.abs(u) - last * STEP) * slope;
        }
        return tbl[i0] + (tbl[i0 + 1] - tbl[i0]) * (k - i0);
      };

      const restack = () => {
        const order = [...cards].sort((a, b) => Math.abs(a._x) - Math.abs(b._x));
        order.forEach((card, rank) => {
          card.style.zIndex = String(order.length - rank);
        });
      };

      const render = (head) => {
        for (let j = 0; j < cards.length; j++) {
          const u = head - offsets[j];
          const sx = screenAt(u);
          const rot = rotAt(sx);
          const f = shrinkAt(sx);
          cards[j]._x = sx;
          cards[j]._f = f;
          cards[j]._r = rot;
          gsap.set(cards[j], { x: sx / f, rotateX: rot });
        }
        restack();
      };

      const headStart = LEAD_TRIM ? 0 : -travelHalf;
      const headEnd = LEAD_TRIM ? Math.max(1, spanPx) : spanPx + travelHalf;
      const proxy = { h: headStart };
      render(headStart);

      const trackH = track.offsetHeight || window.innerHeight;
      wrap.style.height = `${Math.round(trackH + (headEnd - headStart) * scrollRatio)}px`;

      scrollTween = gsap.to(proxy, {
        h: headEnd,
        ease: "none",
        onUpdate: () => render(proxy.h),
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: scrubVal,
        },
      });
    }

    const initId = requestAnimationFrame(() => {
      build();
      ScrollTrigger.refresh();
    });

    const onResize = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(() => {
        build();
        ScrollTrigger.refresh();
      }, 200);
    };

    const onLoad = () => {
      build();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);
    if (document.fonts?.ready) {
      document.fonts.ready.then(onLoad);
    }

    return () => {
      cancelAnimationFrame(initId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      clearTimeout(rebuildTimer);
      destroy();
    };
  }, [wrapRef, trackRef, cardsRef, itemCount]);
}
