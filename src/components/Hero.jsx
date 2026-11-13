import { memo, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    name: "Handbag collection",
    headline: "70%",
    subheadline: "OFF",
    collection: "Handbag Collection",
    action: "ORDER NOW",
    href: "/shop?tag=women",
    panel: "bg-[#9c7050]",
    images: [
      {
        id: "red-handbag",
        src: "/images/photo-1584917865442-de89df76afd3.webp",
        alt: "Red handbag",
        wrapper: "absolute bottom-0 right-[2%] z-10 h-[88%] w-[50%] md:right-[25%] md:w-[34%]",
        image: "h-full w-full object-contain object-bottom drop-shadow-2xl"
      },
      {
        id: "fashion-handbag",
        src: "/images/photo-1590874103328-eac38a683ce7.webp",
        alt: "Fashion handbag",
        wrapper: "absolute bottom-0 right-[1%] hidden h-[82%] w-[23%] md:block",
        image: "h-full w-full object-contain object-bottom"
      }
    ]
  },
  {
    name: "Featured products",
    headline: "TOP",
    subheadline: "PICKS",
    collection: "Premium Products",
    action: "EXPLORE NOW",
    href: "/shop?tag=featured",
    panel: "bg-[#8c7358]",
    images: [
      {
        id: "studio-camera",
        src: "/images/photo-1516035069371-29a1b244cc32.webp",
        alt: "Studio DSLR Camera",
        wrapper: "absolute bottom-0 right-[2%] z-10 h-[88%] w-[50%] md:right-[25%] md:w-[34%]",
        image: "h-full w-full object-contain object-bottom drop-shadow-2xl"
      },
      {
        id: "smart-television",
        src: "/images/photo-1593359677879-a4bb92f829d1.webp",
        alt: "4K Smart Television",
        wrapper: "absolute bottom-0 right-[1%] hidden h-[82%] w-[23%] md:block",
        image: "h-full w-full object-contain object-bottom"
      }
    ]
  }
];

function Hero() {
  const heroRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(
    () => document.visibilityState === "visible"
  );
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const hero = heroRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });
    observer.observe(hero);

    const updateVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", updateVisibility);

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = (event) => {
      setPrefersReducedMotion(event.matches);
    };
    motionPreference.addEventListener("change", updateMotionPreference);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!isInView || !isTabVisible || isHovered || hasFocus || prefersReducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [hasFocus, isHovered, isInView, isTabVisible, prefersReducedMotion]);

  const markImageLoaded = (image) => {
    setLoadedImages((current) => ({ ...current, [image]: true }));
  };

  return (
    <section
      ref={heroRef}
      aria-label="Featured collections"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHasFocus(false);
        }
      }}
      className="container-wide relative my-4 min-h-62.5 overflow-hidden bg-[#b99b6c]"
    >

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,#fff_39%,#b99b6c_39%,#b99b6c_100%)]" />

      <div className="relative grid min-h-62.5 grid-cols-1 items-center md:min-h-72.5 md:grid-cols-[42%_58%]">

        <div className="z-10 px-7 py-8 text-center md:px-10 md:text-left">

          <p className="text-sm font-extrabold tracking-[.18em] text-slate-900">
            EXCLUSIVE
          </p>

          <h1 className="mt-1 text-[clamp(1.75rem,6vw,3.5rem)] font-black leading-[.98] text-[#b99b6c] md:text-5xl">
            COLLECTION
          </h1>

          <div className="mt-5 flex items-center justify-center gap-2 md:justify-start">
            <span className="h-1.5 w-8 bg-black" />
            <span className="h-1.5 w-3 bg-black" />
            <span className="h-1.5 w-3 bg-black" />
          </div>

        </div>

        <div className="relative min-h-55 overflow-hidden md:min-h-72.5">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;

            return (
              <div
                key={slide.name}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 overflow-hidden transition-[opacity,transform] duration-700 ease-in-out motion-reduce:transition-none ${
                  isActive
                    ? "z-10 translate-x-0 opacity-100"
                    : "pointer-events-none z-0 translate-x-4 opacity-0"
                }`}
              >
                {slide.images.map((image, imageIndex) => (
                  <div
                    key={image.id}
                    className={`${image.wrapper} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : imageIndex === 0
                          ? "translate-x-10 opacity-0"
                          : "-translate-x-10 opacity-0"
                    } ${imageIndex > 0 ? "delay-100" : ""}`}
                  >
                    {!loadedImages[image.id] && (
                      <div aria-hidden="true" className="absolute inset-3 animate-pulse rounded-3xl bg-white/20" />
                    )}
                    <img
                      src={image.src}
                      alt={image.alt}
                      width="700"
                      height="700"
                      loading={isActive ? "eager" : "lazy"}
                      fetchPriority={isActive ? "high" : "auto"}
                      decoding="async"
                      onLoad={() => markImageLoaded(image.id)}
                      className={`${image.image} transition-opacity duration-300 ${
                        loadedImages[image.id] ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                ))}

                <div className="relative z-20 flex h-full items-center px-5 py-5">
                  <div className={`w-[43%] p-3 md:ml-0 md:w-auto md:bg-transparent md:p-0 ${slide.panel}`}>
                    <p className="text-[clamp(1.75rem,5vw,3rem)] font-black leading-none text-white md:text-5xl">
                      {slide.headline}
                      <br />
                      {slide.subheadline}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-white/90">
                      {slide.collection}
                    </p>
                    <Link
                      to={slide.href}
                      tabIndex={isActive ? 0 : -1}
                      className="mt-3 inline-flex items-center gap-2 border-2 border-white bg-white px-3 py-2 text-xs font-bold text-[#674b2d] hover:bg-slate-100 md:px-4"
                    >
                      {slide.action}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.name}
                type="button"
                aria-label={`Show slide ${index + 1}: ${slide.name}`}
                aria-pressed={index === activeSlide}
                onClick={() => setActiveSlide(index)}
                className="grid h-7 w-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-transform duration-300 ${
                    index === activeSlide ? "scale-125 bg-white" : "bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}

export default memo(Hero);