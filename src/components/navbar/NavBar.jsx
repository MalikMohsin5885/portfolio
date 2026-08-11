import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import {
  Home,
  Code2,
  Briefcase,
  FileText,
  Mail,
} from "lucide-react";
import { LimelightNav } from "../ui/limelight-nav";

const SECTION_IDS = ["home", "skills", "works", "resume", "contact"];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const limelightItems = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        href: "#home",
        icon: <Home />,
        onClick: () => scrollToSection("home"),
      },
      {
        id: "skills",
        label: "Skills",
        href: "#skills",
        icon: <Code2 />,
        onClick: () => scrollToSection("skills"),
      },
      {
        id: "works",
        label: "Works",
        href: "#works",
        icon: <Briefcase />,
        onClick: () => scrollToSection("works"),
      },
      {
        id: "resume",
        label: "Resume",
        href: "#resume",
        icon: <FileText />,
        onClick: () => scrollToSection("resume"),
      },
      {
        id: "contact",
        label: "Contact",
        href: "#contact",
        icon: <Mail />,
        onClick: () => scrollToSection("contact"),
      },
    ],
    [scrollToSection]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      const offset = window.innerHeight * 0.35;
      let current = 0;

      SECTION_IDS.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = index;
        }
      });

      setActiveIndex(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overHero = scrollPosition < 720;

  const limelightClass = overHero
    ? "bg-black/45 border-white/20 text-white backdrop-blur-md"
    : "bg-white/90 border-gray-200 text-mine-shaft backdrop-blur-md shadow-sm";

  const toggleMobile = () => setIsOpen((open) => !open);

  const handleTabChange = (index) => {
    setActiveIndex(index);
    setIsOpen(false);
  };

  return (
    <div
      className={`w-full mx-auto fixed top-0 py-4 sm:py-3 z-50 ${
        scrollPosition > 40 ? "backdrop-blur-xl bg-black/15" : "bg-transparent"
      }`}
    >
      <div className="container m-auto flex items-center justify-between gap-4">
        <div data-aos="fade-down" className="logo shrink-0">
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveIndex(0);
            }}
            to="/"
            className={`text-2xl font-bold sm:text-xl ${
              overHero ? "text-white" : "text-mine-shaft"
            }`}
          >
            Mohsin<span className="text-customyellow">.</span>
          </Link>
        </div>

        {/* Desktop limelight */}
        <div data-aos="fade-down" className="md:hidden">
          <LimelightNav
            items={limelightItems}
            activeIndex={activeIndex}
            onTabChange={handleTabChange}
            className={limelightClass}
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
              setActiveIndex(SECTION_IDS.indexOf("contact"));
            }}
            className={`inline-flex text-[0.9rem] px-5 py-2 rounded-lg font-bold border transition-colors md:hidden ${
              overHero
                ? "bg-black/50 text-white border-white/25 hover:text-customyellow"
                : "bg-mine-shaft text-white border-mine-shaft hover:text-customyellow"
            }`}
          >
            Hire Me
          </a>

          <button
            type="button"
            onClick={toggleMobile}
            aria-label="Open menu"
            className={`cursor-pointer text-2xl hidden md:block ${
              overHero ? "text-white" : "text-black"
            }`}
          >
            <HiMenu size={25} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`hidden md:flex fixed inset-0 z-50 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-[#f7fafc] shadow-xl flex flex-col gap-8 px-6 pt-6 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-mine-shaft">
              Mohsin<span className="text-customyellow">.</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="text-mine-shaft"
            >
              <RxCross2 size={24} />
            </button>
          </div>

          <LimelightNav
            items={limelightItems}
            activeIndex={activeIndex}
            onTabChange={handleTabChange}
            className="bg-white border-gray-200 text-mine-shaft self-center"
          />

          <div className="flex flex-col gap-3">
            {limelightItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(index);
                  item.onClick?.();
                }}
                className={`uppercase font-bold tracking-wide py-2 border-b border-gray-200 ${
                  activeIndex === index ? "text-customyellow" : "text-mine-shaft"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleTabChange(SECTION_IDS.indexOf("contact"));
              scrollToSection("contact");
            }}
            className="bg-mine-shaft text-white text-center px-6 py-3 rounded-lg font-bold hover:text-customyellow"
          >
            Hire Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
