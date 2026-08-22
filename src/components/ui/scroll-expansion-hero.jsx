import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { VerticalCutReveal } from "./vertical-cut-reveal";
import "./scroll-expansion-hero.css";

const MAX_PROGRESS = 1.55;
const SCROLL_SENSITIVITY = 0.0002;
const EXPAND_START = 0.05;
const EXPAND_END = 0.78;
const INTRO_FADE_END = 0.28;
const MORPH_END = 0.58;
const ABOUT_FADE_START = 0.42;
const HANDOFF_END = 0.3;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, t) => start + (end - start) * t;
const smoothstep = (t) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

const ScrollExpandMedia = ({
  profileSrc,
  personSrc,
  bgLayers = [],
  title = "",
  hook = "",
  children,
}) => {
  const [heroComplete, setHeroComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);

  const progressRef = useRef(0);
  const completeRef = useRef(false);
  const touchStartYRef = useRef(0);
  const rafRef = useRef(null);
  const pendingProgressRef = useRef(null);
  const layoutRef = useRef({ isMobile: false, viewportWidth: 1200 });

  const bgWrapRef = useRef(null);
  const standaloneRef = useRef(null);
  const introRef = useRef(null);
  const cardWrapRef = useRef(null);
  const personInCardRef = useRef(null);
  const profileInCardRef = useRef(null);
  const aboutPanelRef = useRef(null);
  const fadeBottomRef = useRef(null);

  useEffect(() => {
    completeRef.current = heroComplete;
  }, [heroComplete]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("hero-scroll-complete", { detail: { complete: heroComplete } }),
    );
  }, [heroComplete]);

  const getCardMetrics = () => {
    const { isMobile: mobile, viewportWidth: vw } = layoutRef.current;
    const cardMaxW = mobile ? Math.min(vw * 0.94, 520) : 1220;
    const cardMaxH = mobile ? 680 : 620;
    const cardMinScale = mobile ? 280 / cardMaxW : 300 / 1220;
    return { cardMaxW, cardMaxH, cardMinScale };
  };

  const paintProgress = (p) => {
    const expandT = clamp((p - EXPAND_START) / (EXPAND_END - EXPAND_START), 0, 1);
    const morphT = smoothstep(
      clamp((p - EXPAND_START) / (MORPH_END - EXPAND_START), 0, 1),
    );
    const handoffT = smoothstep(
      clamp((p - EXPAND_START) / (HANDOFF_END - EXPAND_START), 0, 1),
    );
    const introOpacity = 1 - smoothstep(clamp(p / INTRO_FADE_END, 0, 1));
    const aboutOpacity = smoothstep(clamp((p - ABOUT_FADE_START) / 0.38, 0, 1));
    const bgOpacity = 1 - p * 0.88;
    const { cardMinScale } = getCardMetrics();
    const cardScale = lerp(cardMinScale, 1, expandT);

    if (bgWrapRef.current) {
      bgWrapRef.current.style.opacity = String(bgOpacity);
    }

    if (standaloneRef.current) {
      const inHandoff = p >= EXPAND_START;
      const standaloneOpacity = inHandoff ? 1 - handoffT : 1;
      const standaloneScale = inHandoff ? lerp(1, cardMinScale * 1.05, handoffT) : 1;
      standaloneRef.current.style.opacity = String(standaloneOpacity);
      standaloneRef.current.style.transform = `translate3d(0, ${p * -4}%, 0) scale(${standaloneScale})`;
    }

    if (introRef.current) {
      introRef.current.style.opacity = String(introOpacity);
    }

    if (cardWrapRef.current) {
      const cardOpacity = p >= EXPAND_START ? handoffT : 0;
      cardWrapRef.current.style.opacity = String(cardOpacity);
      cardWrapRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${cardScale})`;
    }

    if (personInCardRef.current) {
      personInCardRef.current.style.opacity = String(1 - morphT);
    }

    if (profileInCardRef.current) {
      profileInCardRef.current.style.opacity = String(morphT);
    }

    if (aboutPanelRef.current) {
      aboutPanelRef.current.style.opacity = String(aboutOpacity);
    }

    if (fadeBottomRef.current) {
      fadeBottomRef.current.style.opacity = String(
        completeRef.current ? 0 : 1 - p * 0.5,
      );
    }
  };

  const syncCardSize = () => {
    if (!cardWrapRef.current) return;
    const { cardMaxW, cardMaxH } = getCardMetrics();
    cardWrapRef.current.style.width = `${cardMaxW}px`;
    cardWrapRef.current.style.height = `${cardMaxH}px`;
  };

  useLayoutEffect(() => {
    layoutRef.current = {
      isMobile: window.innerWidth < 768,
      viewportWidth: window.innerWidth,
    };
    syncCardSize();
    paintProgress(0);
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!heroComplete) {
      html.classList.add("hero-scroll--locked");
      body.classList.add("hero-scroll--locked");
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.overscrollBehavior = "none";
    } else {
      html.classList.remove("hero-scroll--locked");
      body.classList.remove("hero-scroll--locked");
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.overscrollBehavior = "";
    }

    return () => {
      html.classList.remove("hero-scroll--locked");
      body.classList.remove("hero-scroll--locked");
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.overscrollBehavior = "";
    };
  }, [heroComplete]);

  useEffect(() => {
    layoutRef.current = { isMobile, viewportWidth };
    syncCardSize();
    paintProgress(progressRef.current);
  }, [isMobile, viewportWidth, heroComplete]);

  useEffect(() => {
    const commitProgress = (clamped) => {
      progressRef.current = clamped;
      paintProgress(clamped);

      if (clamped >= MAX_PROGRESS && !completeRef.current) {
        completeRef.current = true;
        setHeroComplete(true);
      }
    };

    const flushProgress = () => {
      rafRef.current = null;
      if (pendingProgressRef.current === null) return;
      const clamped = pendingProgressRef.current;
      pendingProgressRef.current = null;
      commitProgress(clamped);
    };

    const applyProgress = (next) => {
      pendingProgressRef.current = clamp(next, 0, MAX_PROGRESS);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flushProgress);
      }
    };

    const pinScrollTop = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    const reenterHero = () => {
      if (!completeRef.current) return;

      const resumeAt = MAX_PROGRESS - 0.08;
      progressRef.current = resumeAt;
      paintProgress(resumeAt);

      completeRef.current = false;
      window.dispatchEvent(
        new CustomEvent("hero-scroll-complete", { detail: { complete: false } }),
      );
      setHeroComplete(false);

      requestAnimationFrame(pinScrollTop);
    };

    const handleWheel = (e) => {
      if (completeRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 8) {
          e.preventDefault();
          reenterHero();
        }
        return;
      }

      e.preventDefault();
      applyProgress(progressRef.current + e.deltaY * SCROLL_SENSITIVITY);
      pinScrollTop();
    };

    const handleTouchStart = (e) => {
      if (completeRef.current) return;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (completeRef.current) return;
      if (!touchStartYRef.current) return;

      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      e.preventDefault();
      const factor = deltaY < 0 ? 0.0045 : 0.003;
      applyProgress(progressRef.current + deltaY * factor);
      touchStartYRef.current = e.touches[0].clientY;
      pinScrollTop();
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
    };

    const handleScroll = () => {
      if (!completeRef.current) {
        pinScrollTop();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportWidth(window.innerWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { cardMaxW, cardMaxH, cardMinScale } = getCardMetrics();

  return (
    <div id="home" className="hero-scroll relative z-10 w-full bg-lumen">
      <div className="hero-scroll__stage sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
        <div className="relative h-full w-full">
          <div ref={bgWrapRef} className="absolute inset-0 overflow-hidden">
            {bgLayers.map((src, index) => (
              <img
                key={src}
                src={src}
                alt=""
                className="hero-scroll__layer-img"
                style={{ zIndex: index }}
              />
            ))}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <img
            ref={standaloneRef}
            src={personSrc}
            alt=""
            className="hero-scroll__layer-img hero-scroll__person-standalone"
          />

          <div
            ref={introRef}
            className="hero-scroll__intro pointer-events-none absolute inset-0 flex flex-col items-center"
          >
            <h1 className="hero-scroll__intro-title px-6">
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.04}
                staggerFrom="center"
                transition={{ damping: 20, stiffness: 300, type: "spring" }}
                containerClassName="inline-block"
              >
                {title}
              </VerticalCutReveal>
            </h1>
            {hook ? (
              <p className="hero-scroll__intro-hook px-6">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.07}
                  staggerFrom="first"
                  transition={{ damping: 22, stiffness: 200, type: "spring", delay: 0.35 }}
                  containerClassName="inline-block"
                >
                  {hook}
                </VerticalCutReveal>
              </p>
            ) : null}
          </div>

          <div
            ref={cardWrapRef}
            className="hero-scroll__card-wrap pointer-events-none absolute left-1/2 top-1/2"
            style={{
              width: `${cardMaxW}px`,
              height: `${cardMaxH}px`,
              maxWidth: "94vw",
              maxHeight: isMobile ? "88vh" : "78vh",
              opacity: 0,
              transform: `translate3d(-50%, -50%, 0) scale(${cardMinScale})`,
            }}
          >
            <div className="hero-scroll__card flex h-full w-full flex-col overflow-hidden rounded-2xl md:flex-row md:rounded-[1.75rem]">
              <div
                className={`hero-scroll__card-media relative shrink-0 overflow-hidden ${
                  isMobile ? "h-[34%] max-h-[11rem] w-full" : "h-full w-[38%]"
                }`}
              >
                <img
                  ref={personInCardRef}
                  src={personSrc}
                  alt=""
                  className="hero-scroll__card-photo absolute inset-0 h-full w-full object-cover object-[center_20%]"
                />
                <img
                  ref={profileInCardRef}
                  src={profileSrc}
                  alt={title}
                  className="hero-scroll__card-photo hero-scroll__card-photo--profile absolute inset-0 h-full w-full object-cover object-[center_20%]"
                />
              </div>

              <div
                ref={aboutPanelRef}
                className={`hero-scroll__card-text-panel relative flex min-h-0 flex-1 flex-col overflow-hidden ${
                  isMobile ? "w-full" : "justify-center"
                }`}
              >
                <div className="pointer-events-auto relative z-10 flex h-full min-h-0 flex-col overflow-hidden px-4 py-4 md:justify-center md:px-8 md:py-8 lg:px-10">
                  {children}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={fadeBottomRef}
            className="hero-scroll__fade-bottom pointer-events-none absolute bottom-0 left-0 h-[18%] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
