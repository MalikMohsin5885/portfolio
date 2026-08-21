import { useEffect, useState } from "react";
import NAV_ITEMS from "../../data/nav";
import Button from "../ui/Button";

const NavBar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (window.innerWidth < 992) {
        setHidden(y > lastY && y > 60);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 padding-global transition-transform duration-500 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto mt-4 flex max-w-nav items-center justify-between rounded-full border border-vast/10 bg-lumen/80 px-4 py-2 backdrop-blur-md md:px-6">
        <a href="#home" className="font-serif text-xl text-vast no-underline">
          MR
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.slice(0, -1).map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm font-semibold text-vast/80 no-underline transition-colors hover:text-vast"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href="#contact" className="!px-5 !py-3 text-sm">
          Contact
        </Button>
      </nav>
    </header>
  );
};

export default NavBar;
