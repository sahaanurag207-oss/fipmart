import { memo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "../data";

function CategoryNav({
  activeCategory,
  setActiveCategory
}) {
  const categorySlider = useRef(null);

  const scrollCategories = (direction) => {
    categorySlider.current?.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  return (
    <nav className="container-wide my-3 bg-white px-4 py-4 shadow-sm">

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollCategories(-1)}
          aria-label="Scroll categories left"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 2xl:hidden"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={categorySlider}
          className="hide-scrollbar flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth 2xl:justify-between"
        >
          {categories.map((category) => (

            <button
              key={category.name}
              onClick={() =>
                setActiveCategory(
                  activeCategory === category.name
                    ? ""
                    : category.name
                )
              }
              className={`group flex w-[110px] shrink-0 snap-start flex-col items-center gap-2 rounded-lg px-1 py-1 text-center text-[11px] font-semibold transition-colors ${
                activeCategory === category.name
                  ? "text-blue-700"
                  : "text-slate-600 hover:text-blue-700"
              }`}
            >

              <span
                className={`h-15.5 w-15.5 overflow-hidden rounded-xl bg-slate-100 ring-2 ring-transparent group-hover:ring-blue-200 ${
                  activeCategory === category.name
                    ? "ring-blue-600"
                    : ""
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  width="96"
                  height="96"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="max-w-[96px] leading-tight whitespace-normal">
                {category.name}
              </span>

            </button>

          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollCategories(1)}
          aria-label="Scroll categories right"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 2xl:hidden"
        >
          <ChevronRight size={18} />
        </button>
      </div>

    </nav>
  );
}

export default memo(CategoryNav);