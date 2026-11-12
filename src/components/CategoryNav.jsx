import { categories } from "../data";

export default function CategoryNav({
  activeCategory,
  setActiveCategory
}) {
  return (
    <nav className="container-wide my-3 bg-white px-4 py-4 shadow-sm">

      <div className="hide-scrollbar flex gap-5 overflow-x-auto md:justify-between">

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
            className={`group flex w-[110px] shrink-0 flex-col items-center gap-2 rounded-lg px-1 py-1 text-center text-[11px] font-semibold transition ${
              activeCategory === category.name
                ? "text-blue-700"
                : "text-slate-600 hover:text-blue-700"
            }`}
          >

            <span
              className={`h-15.5 w-15.5 overflow-hidden rounded-xl bg-slate-100 ring-2 ring-transparent transition group-hover:ring-blue-200 ${
                activeCategory === category.name
                  ? "ring-blue-600"
                  : ""
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </span>

            <span className="max-w-[96px] leading-tight whitespace-normal">
              {category.name}
            </span>

          </button>

        ))}

      </div>

    </nav>
  );
}