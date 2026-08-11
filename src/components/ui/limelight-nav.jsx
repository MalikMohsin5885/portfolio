import React, { useState, useRef, useLayoutEffect, cloneElement } from "react";

/**
 * Adaptive-width nav with a limelight highlight under the active item.
 * Personalized for this portfolio (JSX + Tailwind, no shadcn tokens).
 */
export const LimelightNav = ({
  items = [],
  defaultActiveIndex = 0,
  activeIndex: controlledIndex,
  onTabChange,
  className = "",
  limelightClassName = "",
  iconContainerClassName = "",
  iconClassName = "",
}) => {
  const isControlled = controlledIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = isControlled ? controlledIndex : internalIndex;
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef([]);
  const limelightRef = useRef(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        const timer = setTimeout(() => setIsReady(true), 50);
        return () => clearTimeout(timer);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index, itemOnClick) => {
    if (!isControlled) setInternalIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      className={`relative inline-flex items-center h-14 rounded-xl border px-1.5 ${className}`}
      aria-label="Primary"
    >
      {items.map(({ id, icon, label, onClick, href }, index) => (
        <a
          key={id}
          href={href || "#"}
          ref={(el) => {
            navItemRefs.current[index] = el;
          }}
          className={`relative z-20 group flex h-full cursor-pointer flex-col items-center justify-center gap-0.5 px-4 sm:px-3 ${iconContainerClassName}`}
          onClick={(e) => {
            if (onClick || href?.startsWith("#")) {
              e.preventDefault();
            }
            handleItemClick(index, onClick);
          }}
          aria-label={label}
          aria-current={activeIndex === index ? "page" : undefined}
        >
          {cloneElement(icon, {
            className: `w-5 h-5 transition-opacity duration-150 ease-in-out ${
              activeIndex === index ? "opacity-100" : "opacity-45"
            } ${icon.props.className || ""} ${iconClassName || ""}`,
          })}
          {label ? (
            <span
              className={`text-[10px] font-semibold uppercase tracking-wide transition-opacity duration-150 ${
                activeIndex === index ? "opacity-100" : "opacity-45"
              }`}
            >
              {label}
            </span>
          ) : null}
        </a>
      ))}

      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[4px] rounded-full bg-customyellow shadow-[0_40px_18px_rgba(242,215,98,0.45)] ${
          isReady ? "transition-[left] duration-300 ease-in-out" : ""
        } ${limelightClassName}`}
        style={{ left: "-999px" }}
      >
        <div className="absolute left-[-30%] top-[4px] w-[160%] h-12 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-customyellow/35 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};

export default LimelightNav;
