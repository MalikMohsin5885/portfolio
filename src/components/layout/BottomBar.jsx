import { useEffect, useState } from "react";
import NAV_ITEMS from "../../data/nav";

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const BottomBar = () => {
  const [heroLocked, setHeroLocked] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);

  useEffect(() => {
    const updatePastHero = () => {
      const home = document.getElementById("home");
      if (!home) return;
      const rect = home.getBoundingClientRect();
      setPastHero(rect.bottom <= window.innerHeight * 0.82);
    };

    const onHeroComplete = (event) => {
      setHeroLocked(!event.detail.complete);
      if (event.detail.complete) {
        requestAnimationFrame(updatePastHero);
      } else {
        setPastHero(false);
      }
    };

    window.addEventListener("hero-scroll-complete", onHeroComplete);
    window.addEventListener("scroll", updatePastHero, { passive: true });
    window.addEventListener("resize", updatePastHero);

    updatePastHero();

    return () => {
      window.removeEventListener("hero-scroll-complete", onHeroComplete);
      window.removeEventListener("scroll", updatePastHero);
      window.removeEventListener("resize", updatePastHero);
    };
  }, []);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideForFooter(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = !heroLocked && pastHero && !hideForFooter;

  return (
    <nav
      aria-label="Site sections"
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 pt-2 transition-all duration-500 md:px-6 md:pb-4 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-wide rounded-2xl border border-vast/10 bg-vast/95 px-3 py-2 text-lumen shadow-2xl backdrop-blur-md md:px-4 md:py-3">
        <ul className="flex items-center gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.id);
                }}
                className="inline-flex rounded-lg px-3 py-2 text-xs font-semibold text-lumen/75 no-underline transition-colors hover:bg-lumen/10 hover:text-lumen md:px-4 md:text-sm"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default BottomBar;
