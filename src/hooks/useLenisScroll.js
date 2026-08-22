import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

/** Single Lenis instance synced with GSAP ScrollTrigger (all pinned sections). */
export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onHeroScroll = (event) => {
      if (window.location.pathname !== "/") return;

      if (event.detail?.complete) {
        lenis.start();
      } else {
        lenis.stop();
        lenis.scrollTo(0, { immediate: true });
      }
    };

    lenis.stop();

    const syncLenisForRoute = () => {
      if (window.location.pathname !== "/") {
        lenis.start();
      }
    };

    syncLenisForRoute();

    const onRouteChange = (event) => {
      if (event.detail?.pathname !== "/") {
        lenis.start();
        return;
      }
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
    };

    window.addEventListener("hero-scroll-complete", onHeroScroll);
    window.addEventListener("app-route-change", onRouteChange);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("hero-scroll-complete", onHeroScroll);
      window.removeEventListener("app-route-change", onRouteChange);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);
}
