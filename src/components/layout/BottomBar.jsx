import { useEffect, useState } from "react";

const BottomBar = () => {
  const [visible, setVisible] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [hideForFooter, setHideForFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > lastY && y > 60);
      setLastY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideForFooter(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-4 pb-4 transition-all duration-500 lg:hidden ${
        visible && !hideForFooter
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl border border-vast/10 bg-vast px-4 py-3 text-lumen shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-glow font-serif text-lg font-medium text-vast">
            MR
          </div>
          <div>
            <p className="text-sm font-semibold">Mohsin Rasheed</p>
            <p className="text-xs text-lumen/70">Open to work</p>
          </div>
        </div>
        <a
          href="#contact"
          className="rounded-lg bg-glow px-4 py-2 text-sm font-bold text-vast no-underline"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default BottomBar;
