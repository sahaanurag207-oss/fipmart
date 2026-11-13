import { useEffect, useRef } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import { MAX_CART_QUANTITY } from "../data";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function ProductQuickView({
  product,
  quantity,
  wishlisted,
  onAdd,
  onToggleWishlist,
  onClose
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const handleAdd = () => {
    if (quantity >= MAX_CART_QUANTITY) return;
    onAdd(product);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quick-view-title"
      aria-describedby="quick-view-details"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60"
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-700 shadow hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        <div className="grid min-h-64 place-items-center bg-slate-50 p-6 sm:min-h-80">
          <img
            src={product.image}
            alt={product.name}
            width="600"
            height="450"
            className="max-h-80 w-full object-contain"
          />
        </div>

        <div className="p-6 sm:p-8">
          {product.tag && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              {product.tag}
            </p>
          )}
          <h2 id="quick-view-title" className="mt-2 pr-8 text-2xl font-black text-slate-900">
            {product.name}
          </h2>
          <p id="quick-view-details" className="mt-2 text-sm text-slate-600">
            Product details and pricing
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="text-sm font-semibold text-emerald-700">
                  Save {formatPrice(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <dl className="mt-6 space-y-3 border-y border-slate-100 py-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Category</dt>
              <dd className="text-right font-medium text-slate-800">
                {product.categories?.join(", ") || "General"}
              </dd>
            </div>
            {product.tag && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Collection</dt>
                <dd className="text-right font-medium text-slate-800">{product.tag}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={quantity >= MAX_CART_QUANTITY}
              onClick={handleAdd}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={17} />
              {quantity >= MAX_CART_QUANTITY
                ? "Maximum quantity reached"
                : quantity > 0 ? "Add another" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={`${wishlisted ? "Remove" : "Add"} ${product.name} ${wishlisted ? "from" : "to"} wishlist`}
              aria-pressed={wishlisted}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${
                wishlisted
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
