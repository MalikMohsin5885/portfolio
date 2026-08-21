import { useEffect } from "react";
import gsap from "gsap";

const SMOOTH = 0.16;
const MOBILE_BP = 991;
const DEFAULT_MAX = 80;
const DEFAULT_MOBILE = 40;

function maxRadius(el, desktopMax) {
  if (window.innerWidth > MOBILE_BP) return desktopMax;
  const mobile = el?.dataset?.cornersMobile;
  if (mobile?.endsWith("rem")) {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return Math.min(desktopMax, parseFloat(mobile) * root);
  }
  return Math.min(desktopMax, DEFAULT_MOBILE);
}

/**
 * Wispr-style scroll-scrubbed corner radius — top/bottom corners grow as the
 * section enters and exits the viewport.
 */
export function useScrollCorners(ref, maxPx = DEFAULT_MAX) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const state = { t: -1, b: -1 };

    const frame = (dt) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width && !rect.height) return;

      const vh = window.innerHeight;
      const max = maxRadius(el, maxPx);
      const targetTop = Math.max(0, Math.min(max, rect.top));
      const targetBottom = Math.max(0, Math.min(max, vh - rect.bottom));
      const k = 1 - Math.pow(1 - SMOOTH, dt);

      if (state.t < 0) {
        state.t = targetTop;
        state.b = targetBottom;
      } else {
        state.t += (targetTop - state.t) * k;
        state.b += (targetBottom - state.b) * k;
        if (Math.abs(targetTop - state.t) < 0.1) state.t = targetTop;
        if (Math.abs(targetBottom - state.b) < 0.1) state.b = targetBottom;
      }

      const top = `${Math.round(state.t)}px`;
      const bottom = `${Math.round(state.b)}px`;
      el.style.borderTopLeftRadius = top;
      el.style.borderTopRightRadius = top;
      el.style.borderBottomLeftRadius = bottom;
      el.style.borderBottomRightRadius = bottom;
    };

    const onResize = () => {
      state.t = -1;
      state.b = -1;
    };

    gsap.ticker.add(frame);
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [ref, maxPx]);
}
