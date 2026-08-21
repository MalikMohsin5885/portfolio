import { useEffect, useRef, useState } from "react";
import "./scroll-expansion-hero.css";

const MAX_PROGRESS = 1.55;
const SCROLL_SENSITIVITY = 0.0002;
const EXPAND_START = 0.05;
const EXPAND_END = 0.78;
const INTRO_FADE_END = 0.28;
const MORPH_END = 0.58;
const ABOUT_FADE_START = 0.42;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const easeOutCubic = (t) => 1 - (1 - t) ** 3;

const ScrollExpandMedia = ({
  profileSrc,
  personSrc,
  bgLayers = [],
  title = "",
  children,
}) => {
  const [progress, setProgress] = useState(0);
  const [heroComplete, setHeroComplete] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);

  const progressRef = useRef(0);
  const completeRef = useRef(false);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    completeRef.current = heroComplete;
  }, [heroComplete]);

  /* Lock page scroll while hero animation is active */
  useEffect(() => {
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
    const applyProgress = (next) => {
      const clamped = clamp(next, 0, MAX_PROGRESS);
      progressRef.current = clamped;
      setProgress(clamped);

      if (clamped >= MAX_PROGRESS && !completeRef.current) {
        completeRef.current = true;
        setHeroComplete(true);
      } else if (clamped < MAX_PROGRESS - 0.02 && completeRef.current) {
        completeRef.current = false;
        setHeroComplete(false);
      }
    };

    const handleWheel = (e) => {
      if (completeRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 8) {
          e.preventDefault();
          e.stopPropagation();
          completeRef.current = false;
          setHeroComplete(false);
          applyProgress(MAX_PROGRESS - 0.08);
          window.scrollTo(0, 0);
        }
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      window.scrollTo(0, 0);
      applyProgress(progressRef.current + e.deltaY * SCROLL_SENSITIVITY);
    };

    const handleTouchStart = (e) => {
      if (completeRef.current) return;
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (completeRef.current) return;
      if (!touchStartY) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo(0, 0);
      const factor = deltaY < 0 ? 0.0045 : 0.003;
      applyProgress(progressRef.current + deltaY * factor);
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!completeRef.current && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartY]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportWidth(window.innerWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const expandT = easeOutCubic(
    clamp((progress - EXPAND_START) / (EXPAND_END - EXPAND_START), 0, 1),
  );
  const morphT = easeOutCubic(
    clamp((progress - EXPAND_START) / (MORPH_END - EXPAND_START), 0, 1),
  );
  const introOpacity = 1 - clamp(progress / INTRO_FADE_END, 0, 1);
  const aboutOpacity = clamp((progress - ABOUT_FADE_START) / 0.38, 0, 1);
  const bgOpacity = 1 - progress * 0.88;
  const standalonePersonOpacity =
    progress < EXPAND_START
      ? 1
      : clamp(1 - (progress - EXPAND_START) / 0.22, 0, 1);

  const cardWidth = isMobile
    ? 280 + expandT * (Math.min(viewportWidth * 0.94, 520) - 280)
    : 300 + expandT * 920;
  const cardHeight = isMobile
    ? 380 + expandT * 220
    : 420 + expandT * 200;

  const cardOpacity = clamp((progress - EXPAND_START * 0.4) / 0.18, 0, 1);
  const showCard = progress > EXPAND_START * 0.35;

  const shellClass = heroComplete
    ? "hero-scroll relative z-10 w-full bg-lumen"
    : "hero-scroll fixed inset-0 z-50 w-full overflow-hidden bg-black";

  return (
    <>
      {!heroComplete && <div className="h-[100dvh] w-full shrink-0" aria-hidden="true" />}

      <div id="home" className={shellClass}>
        <div className="relative min-h-[100dvh] w-full">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: bgOpacity }}
          >
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
            src={personSrc}
            alt=""
            className="hero-scroll__layer-img hero-scroll__person-standalone"
            style={{
              opacity: standalonePersonOpacity,
              transform: `translateY(${progress * -4}%)`,
            }}
          />

          {/* Intro — name only, top center */}
          <div
            className="hero-scroll__intro pointer-events-none absolute inset-0 flex"
            style={{ opacity: introOpacity }}
          >
            <h1 className="hero-scroll__intro-title px-6">{title}</h1>
          </div>

          {showCard && (
            <div
              className="hero-scroll__card-wrap pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                maxWidth: "94vw",
                maxHeight: isMobile ? "88vh" : "78vh",
                opacity: cardOpacity,
              }}
            >
              <div className="hero-scroll__card flex h-full w-full flex-col overflow-hidden rounded-2xl md:flex-row md:rounded-[1.75rem]">
                <div
                  className={`hero-scroll__card-media relative shrink-0 overflow-hidden ${
                    isMobile ? "h-[42%] w-full" : "h-full w-[38%]"
                  }`}
                >
                  <img
                    src={personSrc}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-bottom"
                    style={{ opacity: 1 - morphT }}
                  />
                  <img
                    src={profileSrc}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    style={{ opacity: morphT }}
                  />
                </div>

                <div
                  className={`hero-scroll__card-text-panel relative flex flex-1 flex-col justify-center overflow-hidden ${
                    isMobile ? "min-h-0 w-full flex-1" : ""
                  }`}
                  style={{ opacity: aboutOpacity }}
                >
                  <div className="pointer-events-auto relative z-10 flex h-full flex-col justify-center overflow-y-auto px-5 py-6 md:px-8 md:py-8 lg:px-10">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="hero-scroll__fade-bottom pointer-events-none absolute bottom-0 left-0 h-[18%] w-full"
            style={{ opacity: heroComplete ? 0 : 1 - progress * 0.5 }}
          />
        </div>
      </div>
    </>
  );
};

export default ScrollExpandMedia;
