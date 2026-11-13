import { CreditCard, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function PaymentPage({ cart, subtotal, onPlaceOrder }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderError, setOrderError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (!state?.shippingDetails || cart.length === 0) {
    return <Navigate to={cart.length > 0 ? "/checkout" : "/cart"} replace />;
  }

  const handlePlaceOrder = () => {
    setOrderError("");
    setIsPlacingOrder(true);

    try {
      onPlaceOrder(state.shippingDetails);
      navigate("/order-confirmation", { replace: true });
    } catch (error) {
      console.error("Could not save the cash-on-delivery order.", error);
      setOrderError("Your order could not be saved. Check this browser's storage and try again.");
      setIsPlacingOrder(false);
    }
  };

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

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none">
            <input
              type="radio"
              name="paymentMethod"
              value="cash-on-delivery"
              defaultChecked
              className="mt-1 accent-blue-700"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Cash on delivery</p>
              <p className="mt-1 text-sm text-slate-600">
                Pay in cash when your order is delivered.
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
              Available
            </span>
          </label>

          <div aria-disabled="true" className="mt-3 rounded-xl border border-slate-200 p-4 opacity-60">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-slate-500" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Credit or debit card</p>
                <p className="mt-1 text-sm text-slate-500">Unavailable</p>
              </div>
            </div>
          </div>

          <div role="status" className="mt-5 flex gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-950">
            <LockKeyhole size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>There is no upfront payment. Have the order total ready when your delivery arrives.</p>
          </div>

          {orderError && (
            <p role="alert" className="mt-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-800">
              {orderError}
            </p>
          )}

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 active:scale-[.99] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none motion-reduce:transform-none"
          >
            {isPlacingOrder ? "Confirming order..." : "Confirm cash on delivery order"}
          </button>

          <div className="mt-5 flex flex-wrap gap-3">
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
