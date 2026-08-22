import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FolderKanban,
  GitBranch,
  HelpCircle,
  Home as HomeIcon,
  Layers,
  Mail,
  Sparkles,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "../ui/dock";
import NAV_ITEMS from "../../data/nav";

const NAV_ICONS = {
  home: HomeIcon,
  projects: FolderKanban,
  skills: Sparkles,
  process: GitBranch,
  features: Layers,
  faq: HelpCircle,
  contact: Mail,
};

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const DockNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [heroLocked, setHeroLocked] = useState(isHome);
  const [pastHero, setPastHero] = useState(!isHome);
  const [hideForFooter, setHideForFooter] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setHeroLocked(false);
      setPastHero(true);
      return undefined;
    }

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
  }, [isHome]);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHideForFooter(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [location.pathname]);

  const visible = isHome
    ? !heroLocked && pastHero && !hideForFooter
    : !hideForFooter;

  const handleNavClick = (id) => {
    if (id === "projects" && location.pathname.startsWith("/projects/")) {
      navigate("/", { state: { scrollTo: "projects" } });
      return;
    }

    if (!isHome) {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    scrollToSection(id);
  };

  return (
    <nav
      aria-label="Site sections"
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="pointer-events-auto absolute bottom-2 left-1/2 max-w-[calc(100%-1rem)] -translate-x-1/2">
        <Dock className="items-end border border-vast/10 bg-vast/95 pb-3 shadow-2xl backdrop-blur-md dark:bg-vast/95">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.id] || HomeIcon;
            return (
              <DockItem
                key={item.id}
                className="aspect-square rounded-full bg-lumen/15"
                onClick={() => handleNavClick(item.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleNavClick(item.id);
                  }
                }}
                aria-label={item.label}
              >
                <DockLabel className="border-vast/10 bg-lumen text-vast dark:border-vast/20 dark:bg-lumen dark:text-vast">
                  {item.label}
                </DockLabel>
                <DockIcon>
                  <Icon className="h-full w-full text-lumen/85" />
                </DockIcon>
              </DockItem>
            );
          })}
        </Dock>
      </div>
    </nav>
  );
};

export default DockNav;
