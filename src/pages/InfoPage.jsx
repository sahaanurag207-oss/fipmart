import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function InfoPage({
  title,
  description,
  items = []
}) {
  return (
    <main className="container-wide py-8">
      <section className="hover-surface rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-700">
          Flipmart
        </p>

        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none">
              <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Continue shopping
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/contact"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-800 hover:text-slate-900"
          >
            Contact support
          </Link>
        </div>
      </section>
    </main>
  );
}
