import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function TopSelling() {
  return (
    <section className="group relative flex min-h-67.5 items-center overflow-hidden bg-[#e9e2d4]">

      <img
        src="/images/photo-1515886657613-9f3515b0c78f.webp"
        alt="Fashion collection"
        width="900"
        height="600"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/75 to-transparent" />

      <div className="relative max-w-lg px-7 py-10 sm:px-12">

        <p className="text-xs font-bold uppercase tracking-[.25em] text-amber-800">
          Curated for you
        </p>

        <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
          Top Selling Products
        </h2>

        <p className="mt-3 max-w-sm text-sm text-slate-700">
          Trending now: must-have styles for every occasion.
        </p>

        <Link to="/shop?tag=featured" className="mt-6 inline-flex items-center gap-2 bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-blue-700">
          EXPLORE COLLECTION
          <ArrowRight size={15} />
        </Link>

      </div>

    </section>
  );
}

export default memo(TopSelling);