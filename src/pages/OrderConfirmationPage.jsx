import { CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function formatDeliveryDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

function formatAddress(details) {
  const cityLine = [details.city, details.region, details.postalCode]
    .filter(Boolean)
    .join(", ");

  return [details.address, cityLine, details.country]
    .filter(Boolean)
    .join(", ");
}

export default function OrderConfirmationPage({ order }) {
  const deliveryWindow = `${formatDeliveryDate(order.estimatedDeliveryStart)} - ${formatDeliveryDate(order.estimatedDeliveryEnd)}`;
  const deliveryAddress = formatAddress(order.shippingDetails);

  return (
    <main className="container-wide pb-24 pt-8 sm:pt-10">
      <section className="hover-surface mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="text-center">
          <CheckCircle2 size={54} className="mx-auto text-emerald-600" aria-hidden="true" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
            Order confirmed
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Thank you{order.shippingDetails.fullName ? `, ${order.shippingDetails.fullName}` : ""}!
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Order <span className="font-semibold text-slate-900">{order.id}</span> is confirmed.
          </p>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 sm:p-5">
          <div className="flex items-start gap-3">
            <Truck size={20} className="mt-0.5 shrink-0 text-blue-700" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-slate-900">Estimated delivery</p>
              <p className="mt-1 text-sm text-slate-700">{deliveryWindow}</p>
              <p className="mt-1 text-xs text-slate-500">Estimated in 3-5 business days; delivery dates may vary.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <PackageCheck size={20} className="mt-0.5 shrink-0 text-blue-700" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-slate-900">Cash on delivery</p>
              <p className="mt-1 text-sm text-slate-700">
                Pay {formatPrice(order.subtotal)} in cash when your order arrives.
              </p>
            </div>
          </div>

          {deliveryAddress && (
            <div className="sm:col-span-2">
              <p className="text-sm font-bold text-slate-900">Delivering to</p>
              <p className="mt-1 text-sm text-slate-700">{deliveryAddress}</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
          <ul className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
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
          <div className="mt-4 flex justify-between text-base font-bold text-slate-900">
            <span>Estimated amount due</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Taxes, if applicable, are not included in this estimate.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Your order details are saved in this browser.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-800 active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none motion-reduce:transform-none"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
