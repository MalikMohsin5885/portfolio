import { useEffect, useRef } from "react";

const CurvedMarquee = ({
  text,
  pathId,
  curvePath,
  viewBox = "0 0 1048 594",
  fontSize = 14,
  fill = "#1A1A1A",
  opacity = 1,
  duration = 40,
  className = "",
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let offset = 0;
    let raf;
    const speed = 100 / duration;

    const animate = () => {
      offset = (offset + speed * 0.016) % 100;
      el.setAttribute("startOffset", `${offset}%`);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <svg
      className={`w-full h-auto ${className}`}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <path id={pathId} d={curvePath} />
      </defs>
      <text fill={fill} opacity={opacity} fontSize={fontSize} fontWeight={500}>
        <textPath ref={textRef} href={`#${pathId}`} startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default CurvedMarquee;
