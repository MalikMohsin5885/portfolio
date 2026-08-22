import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";

function getStaggerDelay(index, total, staggerFrom, staggerDuration) {
  if (total <= 1) return 0;
  if (staggerFrom === "first") return index * staggerDuration;
  if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
  if (staggerFrom === "center") {
    const center = (total - 1) / 2;
    return Math.abs(index - center) * staggerDuration;
  }
  if (staggerFrom === "random") {
    return Math.random() * (total - 1) * staggerDuration;
  }
  if (typeof staggerFrom === "number") {
    return Math.abs(index - staggerFrom) * staggerDuration;
  }
  return index * staggerDuration;
}

function splitText(text, splitBy) {
  if (splitBy === "lines") {
    return text.split("\n").map((line) => [line.split(/(\s+)/).filter(Boolean)]);
  }

  if (splitBy === "words") {
    return [text.split(/(\s+)/).filter(Boolean)];
  }

  if (splitBy === "characters") {
    return text.split("\n").map((line) => {
      const words = line.split(/(\s+)/).filter(Boolean);
      return words.map((word) => (/\s+/.test(word) ? [word] : word.split("")));
    });
  }

  if (typeof splitBy === "string") {
    return [text.split(splitBy)];
  }

  return [text.split(/(\s+)/).filter(Boolean)];
}

function flattenElements(parsed, splitBy) {
  if (splitBy === "characters") {
    return parsed.flatMap((line) =>
      line.flatMap((word) => word.map((piece) => ({ piece, isSpace: /\s+/.test(piece) }))),
    );
  }

  return parsed.flatMap((line) =>
    line.map((piece) => ({ piece, isSpace: /\s+/.test(piece) })),
  );
}

export const VerticalCutReveal = forwardRef(function VerticalCutReveal(
  {
    children,
    splitBy = "words",
    reverse = false,
    staggerDuration = 0.2,
    staggerFrom = "first",
    transition = { type: "spring", damping: 30, stiffness: 300 },
    autoStart = true,
    containerClassName = "",
    wordLevelClassName = "",
    elementLevelClassName = "",
    onStart,
    onComplete,
  },
  ref,
) {
  const [started, setStarted] = useState(false);
  const text = String(children ?? "");

  const parsed = useMemo(() => splitText(text, splitBy), [text, splitBy]);
  const flatElements = useMemo(
    () => flattenElements(parsed, splitBy).filter(({ piece }) => piece.length > 0),
    [parsed, splitBy],
  );

  useImperativeHandle(ref, () => ({
    startAnimation: () => setStarted(true),
    reset: () => setStarted(false),
  }));

  useEffect(() => {
    if (autoStart) {
      setStarted(true);
    }
  }, [autoStart]);

  useEffect(() => {
    if (started) onStart?.();
  }, [started, onStart]);

  const hiddenY = reverse ? "-110%" : "110%";

  if (splitBy === "characters") {
    return (
      <span className={containerClassName} aria-label={text}>
        {parsed.map((line, lineIndex) => (
          <span
            key={`line-${lineIndex}`}
            className={`block ${wordLevelClassName}`}
            aria-hidden="true"
          >
            {line.map((word, wordIndex) => (
              <span
                key={`word-${lineIndex}-${wordIndex}`}
                className={`inline-block whitespace-pre ${wordLevelClassName}`}
              >
                {word.map((char, charIndex) => {
                  const globalIndex = parsed
                    .slice(0, lineIndex)
                    .reduce((acc, l) => acc + l.reduce((a, w) => a + w.length, 0), 0)
                    + line.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0)
                    + charIndex;

                  const delay = getStaggerDelay(
                    globalIndex,
                    flatElements.length,
                    staggerFrom,
                    staggerDuration,
                  );

                  return (
                    <span
                      key={`char-${lineIndex}-${wordIndex}-${charIndex}`}
                      className={`inline-block overflow-hidden align-bottom ${elementLevelClassName}`}
                    >
                      <motion.span
                        className="inline-block"
                        initial={{ y: hiddenY }}
                        animate={started ? { y: "0%" } : { y: hiddenY }}
                        transition={{ ...transition, delay }}
                        onAnimationComplete={() => {
                          if (globalIndex === flatElements.length - 1) {
                            onComplete?.();
                          }
                        }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={containerClassName} aria-label={text}>
      {parsed.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className={`block ${wordLevelClassName}`} aria-hidden="true">
          {line.map((piece, pieceIndex) => {
            const globalIndex =
              parsed.slice(0, lineIndex).reduce((acc, l) => acc + l.length, 0) + pieceIndex;
            const delay = getStaggerDelay(
              globalIndex,
              flatElements.length,
              staggerFrom,
              staggerDuration,
            );

            return (
              <span
                key={`piece-${lineIndex}-${pieceIndex}`}
                className={`inline-block overflow-hidden align-bottom ${elementLevelClassName}`}
              >
                <motion.span
                  className="inline-block whitespace-pre"
                  initial={{ y: hiddenY }}
                  animate={started ? { y: "0%" } : { y: hiddenY }}
                  transition={{ ...transition, delay }}
                  onAnimationComplete={() => {
                    if (globalIndex === flatElements.length - 1) {
                      onComplete?.();
                    }
                  }}
                >
                  {piece}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
});

export default VerticalCutReveal;
