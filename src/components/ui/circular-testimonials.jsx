import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import "./circular-testimonials.css";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth);
}

export function CircularTestimonials({
  testimonials,
  staticContent = null,
  autoplay = true,
  colors = {},
  fontSizes = {},
  initialIndex = 0,
  onActiveIndexChange,
  renderExtras,
  className = "",
  prevLabel = "Previous",
  nextLabel = "Next",
  arrowsUnderMedia = false,
}) {
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  );

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  useEffect(() => {
    if (!autoplay || testimonialsLength <= 1) return undefined;

    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  const getImageStyle = (index) => {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  };

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const contentSource = staticContent ?? activeTestimonial;
  const contentKey = staticContent ? "static-content" : (activeTestimonial?.id ?? activeIndex);
  const imageAlt = staticContent?.name ?? activeTestimonial?.name ?? "Gallery image";

  if (!activeTestimonial || !contentSource) return null;

  const showArrows = testimonialsLength > 1;
  const placeArrowsUnderMedia = arrowsUnderMedia || Boolean(staticContent);

  const arrowButtons = showArrows ? (
    <div
      className={`circular-testimonials__arrows${
        placeArrowsUnderMedia ? " circular-testimonials__arrows--under-media" : ""
      }`}
    >
      <button
        type="button"
        className="circular-testimonials__arrow"
        onClick={handlePrev}
        style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
        onMouseEnter={() => setHoverPrev(true)}
        onMouseLeave={() => setHoverPrev(false)}
        aria-label={prevLabel}
      >
        <FaArrowLeft size={28} color={colorArrowFg} />
      </button>
      <button
        type="button"
        className="circular-testimonials__arrow"
        onClick={handleNext}
        style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
        onMouseEnter={() => setHoverNext(true)}
        onMouseLeave={() => setHoverNext(false)}
        aria-label={nextLabel}
      >
        <FaArrowRight size={28} color={colorArrowFg} />
      </button>
    </div>
  ) : null;

  return (
    <div className={`circular-testimonials ${className}`.trim()}>
      <div className="circular-testimonials__grid">
        <div className="circular-testimonials__media-col">
          <div className="circular-testimonials__images" ref={imageContainerRef}>
            {testimonials.map((testimonial, index) => (
              <img
                key={testimonial.id ?? `${testimonial.src}-${index}`}
                src={testimonial.src}
                alt={testimonial.alt ?? imageAlt}
                className="circular-testimonials__image"
                data-index={index}
                style={getImageStyle(index)}
              />
            ))}
          </div>
          {placeArrowsUnderMedia ? arrowButtons : null}
        </div>

        <div className="circular-testimonials__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={contentKey}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="circular-testimonials__name"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {contentSource.name}
              </h3>
              <p
                className="circular-testimonials__designation"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {contentSource.designation}
              </p>
              <motion.p
                className="circular-testimonials__quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {contentSource.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${contentKey}-${i}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
              {renderExtras ? (
                <div className="circular-testimonials__extras">
                  {renderExtras(contentSource, activeIndex)}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {!placeArrowsUnderMedia ? arrowButtons : null}
        </div>
      </div>
    </div>
  );
}

export default CircularTestimonials;
