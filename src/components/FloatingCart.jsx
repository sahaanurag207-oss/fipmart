import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function FloatingCart({ count, subtotal }) {
  if (count === 0) return null;

  return (
    <Link
      to="/cart"
      aria-label={`View cart, ${count} items, $${subtotal.toFixed(2)}`}
      className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full bg-blue-700 px-4 py-3 text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:bottom-6 sm:right-6 sm:px-5"
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15">
        <ShoppingBag size={18} />
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber-300 px-1 text-[10px] font-bold text-slate-950">
          {count}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium text-blue-100">
          {count} item{count === 1 ? "" : "s"} in cart
        </span>
        <span className="block text-sm font-bold">${subtotal.toFixed(2)}</span>
      </span>
    </Link>
  );
}
