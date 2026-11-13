import { CreditCard, LockKeyhole } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function PaymentPage({ cart, subtotal }) {
  const { state } = useLocation();

  if (!state?.shippingDetails || cart.length === 0) {
    return <Navigate to={cart.length > 0 ? "/checkout" : "/cart"} replace />;
  }

  return (
    <main className="container-wide pb-24 pt-8 sm:pt-10">
      <div className="mb-6">
        <Link to="/checkout" className="text-sm font-semibold text-blue-700 hover:underline">
          Back to delivery details
        </Link>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
          Payment
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Review the available payment methods for your order.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="hover-surface rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-700">
              <CreditCard size={20} />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">Payment method</h2>
              <p className="text-sm text-slate-500">Choose how you would like to pay.</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-4 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-slate-500" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Credit or debit card</p>
                <p className="mt-1 text-sm text-slate-500">
                  Card payments are not available yet.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                Unavailable
              </span>
            </div>
          </div>

          <div role="status" className="mt-5 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-950">
            <LockKeyhole size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>
              Payment processing is not connected. No payment has been taken, and your order has not been placed.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/checkout"
              state={state}
              className="rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Edit delivery details
            </Link>
            <Link
              to="/cart"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500"
            >
              Return to cart
            </Link>
          </div>
        </section>

        <aside className="hover-surface rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                <span className="min-w-0 text-sm text-slate-700">
                  <span className="block truncate font-medium">{item.name}</span>
                  <span className="text-xs text-slate-500">Qty {item.quantity}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-slate-100 pt-4">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-slate-600">
              <span>Standard shipping</span>
              <span>Free</span>
            </div>
            <div className="mt-4 flex justify-between text-base font-bold text-slate-900">
              <span>Estimated total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Taxes are not included in this estimate.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
