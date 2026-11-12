import { useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function CheckoutPage({ cart, subtotal }) {
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startCheckout = async () => {
    setIsStarting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Checkout could not be started.");
      }

      if (typeof result.url !== "string" || !result.url.startsWith("https://checkout.stripe.com/")) {
        throw new Error("The payment provider returned an invalid checkout link.");
      }

      window.location.assign(result.url);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Checkout could not be started.");
      setIsStarting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="container-wide pb-24 pt-10 sm:py-14">
        <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">Nothing to check out yet</h1>
          <p className="mt-3 text-sm text-slate-600">Add a product to your cart before continuing.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
            Browse products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container-wide pb-24 pt-8 sm:py-10">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Secure checkout</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Review your order</h1>
        <p className="mt-2 text-sm text-slate-600">Your payment and address details are entered securely on Stripe.</p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">Payment details stay private</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Flipmart never sees or stores your card number. Stripe securely collects payment and delivery details.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            Test mode is enabled. No real payment will be taken. Use Stripe&apos;s test card
            {" "}<span className="font-mono font-semibold">4242 4242 4242 4242</span>, any future expiry date, and any CVC.
          </div>

          <button
            type="button"
            disabled={isStarting}
            onClick={startCheckout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            <LockKeyhole size={16} />
            {isStarting ? "Connecting to Stripe..." : "Continue to secure payment"}
            {!isStarting && <ArrowRight size={16} />}
          </button>

          {errorMessage && (
            <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {errorMessage}
            </p>
          )}
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
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
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Test checkout uses USD pricing. Applicable taxes are not configured for this demo.
            </p>
          </div>
          <Link to="/cart" className="mt-5 inline-block text-sm font-semibold text-blue-700 hover:underline">
            Back to cart
          </Link>
        </aside>
      </div>
    </main>
  );
}
