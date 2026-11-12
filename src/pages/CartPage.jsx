import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function CartPage({
  cart,
  subtotal,
  onChangeQuantity,
  onRemove,
  onClear
}) {
  const [searchParams] = useSearchParams();
  const checkoutCancelled = searchParams.get("checkout") === "cancelled";

  if (cart.length === 0) {
    return (
      <main className="container-wide py-10 sm:py-14">
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-700">
            <ShoppingBag size={28} />
          </span>
          <h1 className="mt-5 text-3xl font-black text-slate-900">Your cart is empty</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
            Find something you love and it will be waiting here when you are ready.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Explore products
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container-wide pb-24 pt-8 sm:py-10">
      {checkoutCancelled && (
        <p role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Checkout was cancelled. Your items are still in your cart.
        </p>
      )}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
            Your selection
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Shopping cart</h1>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-rose-600 hover:underline"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_100px] gap-4 border-b border-slate-100 px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500 sm:grid">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
          </div>

          <ul className="divide-y divide-slate-100">
            {cart.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[76px_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[88px_minmax(0,1fr)_120px_100px] sm:items-center sm:gap-5 sm:px-6"
              >
                <div className="grid h-[76px] w-[76px] place-items-center rounded-xl bg-slate-50 p-2 sm:h-[88px] sm:w-[88px]">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate font-bold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{formatPrice(item.price)} each</p>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 sm:hidden"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>

                <div className="col-start-2 flex items-center justify-between sm:col-start-auto sm:justify-center">
                  <span className="text-xs font-semibold uppercase text-slate-500 sm:hidden">Qty</span>
                  <div className="inline-flex items-center rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="grid h-11 w-11 place-items-center text-slate-600 hover:text-blue-700 sm:h-9 sm:w-9"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="grid h-11 w-11 place-items-center text-slate-600 hover:text-blue-700 sm:h-9 sm:w-9"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="col-start-2 flex items-center justify-between sm:col-start-auto sm:justify-end">
                  <span className="text-xs font-semibold uppercase text-slate-500 sm:hidden">Total</span>
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="hidden rounded-md p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 sm:inline-flex"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-100 px-4 py-4 sm:px-6">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800">
              <ArrowRight size={15} className="rotate-180" />
              Continue shopping
            </Link>
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
          <div className="mt-5 flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Standard shipping is free. Applicable taxes are not configured in this test checkout.
          </p>
          <div className="my-5 border-t border-slate-100" />
          <div className="flex justify-between text-base font-bold text-slate-900">
            <span>Estimated total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Proceed to checkout
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-center text-xs text-slate-500">Cart changes are saved on this device.</p>
        </aside>
      </div>
    </main>
  );
}
