import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MIN_W = 768;
const SCRUB_DESKTOP = 1.6;
const SCRUB_MOBILE = 1.2;
const GAP_PCT = 22;
const GAP_PCT_MOBILE = 28;
const GAP_MIN_PX = 96;
const GAP_MAX_PX = 220;
const VH_PER_CARD = 95;
const VH_TAIL = 55;
const Y_TRAVEL = 48;
const ROT_IN = -22;
const ROT_OUT = 22;
const ROT_EASE = "power1.inOut";
const ROT_SPAN_PCT = 200;
const ORBIT_CARD_PCT = 68;
const ORBIT_MIN_PX = 260;
const PERSP_CARD_PCT = 280;
const EXIT_PAD_PCT = 14;

function getCardWidth(vw, mobile) {
  if (mobile) return Math.min(vw * 0.88, 420);
  return Math.min(680, vw * 0.82);
}

export function useProjectWaveSlider(wrapRef, trackRef, cardsRef, itemCount = 0) {
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !itemCount) return;

    if (ScrollTrigger.config) {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    let timeline = null;
    let resizeDebounce = null;

    const destroy = () => {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      timeline = null;
    };

    const build = () => {
      destroy();

      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < MIN_W;
      const cardW = getCardWidth(vw, mobile);
      const yTravel = mobile ? Y_TRAVEL * 0.75 : Y_TRAVEL;
      const scrub = mobile ? SCRUB_MOBILE : SCRUB_DESKTOP;
      const gapPct = mobile ? GAP_PCT_MOBILE : GAP_PCT;

      track.style.perspectiveOrigin = "50% 50%";
      track.style.transformStyle = "preserve-3d";

      cards.forEach((card) => {
        card.style.position = "absolute";
        card.style.left = "50%";
        card.style.top = "50%";
        card.style.width = `${cardW}px`;
        card.style.visibility = "visible";
        card.style.transformStyle = "preserve-3d";
        card.style.backfaceVisibility = "hidden";
        card.style.willChange = "transform";
      });

      const gapPx = Math.min(
        GAP_MAX_PX,
        Math.max(GAP_MIN_PX, (cardW * gapPct) / 100),
      );

      const offsets = [0];
      for (let i = 1; i < cards.length; i++) {
        offsets[i] = offsets[i - 1] + cardW + gapPx;
      }

      const spanPx = offsets[offsets.length - 1];
      const travelHalf = (vw + cardW) / 2 + (cardW * EXIT_PAD_PCT) / 100;
      const orbitPx = Math.max(ORBIT_MIN_PX, (cardW * ORBIT_CARD_PCT) / 100);
      const perspPx = (cardW * PERSP_CARD_PCT) / 100;

      track.style.perspective = `${perspPx}px`;

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        scale: 1,
        transformOrigin: `50% 50% -${orbitPx}px`,
        force3D: true,
      });

      const rotEase = gsap.parseEase(ROT_EASE);
      const RAD = Math.PI / 180;
      const rotHalf = (cardW * ROT_SPAN_PCT) / 100;

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
        return (cardW * f + gapPx) / (cardW + gapPx);
      };

      const STEP = 4;
      const LIMIT = travelHalf * 1.25;

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

      const render = (head) => {
        for (let j = 0; j < cards.length; j++) {
          const u = head - offsets[j];
          const sx = screenAt(u);
          const rot = rotAt(sx);
          const f = shrinkAt(sx);
          const y = -(sx / travelHalf) * yTravel;

          cards[j].style.pointerEvents = Math.abs(sx) < cardW * 0.35 ? "auto" : "none";

          gsap.set(cards[j], {
            x: sx / f,
            y,
            rotateX: rot,
            rotateY: (sx / travelHalf) * -3,
            opacity: 1,
            scale: 1,
            zIndex: Math.round(1000 - Math.abs(sx)),
          });
        }
      };

      const headEnd = Math.max(1, spanPx);
      render(0);

      const cardSteps = Math.max(1, cards.length - 1);
      const travelPx = Math.round(cardSteps * (VH_PER_CARD / 100) * vh);
      const tailPx = Math.round((VH_TAIL / 100) * vh);
      const trackH = track.offsetHeight || Math.round(vh * 0.82);

      wrap.style.height = `${trackH + travelPx + tailPx}px`;

      const proxy = { head: 0 };
      const travelWeight = travelPx;
      const tailWeight = tailPx;

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(proxy, {
        head: headEnd,
        ease: "none",
        duration: travelWeight,
        onUpdate: () => render(proxy.head),
      });

      timeline.to(proxy, {
        head: headEnd,
        ease: "none",
        duration: tailWeight,
        onUpdate: () => render(proxy.head),
      });
    };

    const scheduleBuild = () => {
      requestAnimationFrame(() => {
        build();
        ScrollTrigger.refresh();
      });
    };

    scheduleBuild();

    const onResize = () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(scheduleBuild, 180);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("load", scheduleBuild);
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleBuild);
    }

    return () => {
      clearTimeout(resizeDebounce);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", scheduleBuild);
      destroy();
    };
  }, [wrapRef, trackRef, cardsRef, itemCount]);
}
