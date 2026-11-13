import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const SCROLL_THRESHOLD = 400;

function scrollToTop() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  window.scrollTo({ top: 0, behavior });
}

export default function ScrollToTop() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(
    () => window.scrollY > SCROLL_THRESHOLD
  );

  useEffect(() => {
    const updateVisibility = () => {
      const shouldShow = window.scrollY > SCROLL_THRESHOLD;
      setIsVisible((current) => current === shouldShow ? current : shouldShow);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname, location.search]);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
      className={`fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-white shadow-lg transition-[opacity,transform,visibility] duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:bottom-28 sm:right-6 ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={19} aria-hidden="true" />
    </button>
  );
}
