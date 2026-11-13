import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function CheckoutField({
  label,
  name,
  type = "text",
  autoComplete,
  value = "",
  required = true
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={value}
        required={required}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

export default function CheckoutPage({ cart, subtotal, profile = {} }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const details = state?.shippingDetails ?? profile;

  if (cart.length === 0) {
    return (
      <main className="container-wide pb-24 pt-10 sm:pt-14">
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    navigate("/checkout/payment", {
      state: { shippingDetails: Object.fromEntries(formData.entries()) }
    });
  };

  return (
    <main className="container-wide pb-24 pt-8 sm:pt-10">
      <div className="mb-6">
        <Link to="/cart" className="text-sm font-semibold text-blue-700 hover:underline">
          Back to cart
        </Link>
        <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your contact and delivery details to continue.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="text-lg font-bold text-slate-900">
              Contact information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CheckoutField label="Email address" name="email" type="email" autoComplete="email" value={details.email || ""} />
              <CheckoutField label="Phone number (optional)" name="phone" type="tel" autoComplete="tel" value={details.phone || ""} required={false} />
            </div>
          </section>

          <section aria-labelledby="delivery-heading" className="mt-8 border-t border-slate-100 pt-6">
            <h2 id="delivery-heading" className="text-lg font-bold text-slate-900">
              Delivery address
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CheckoutField label="Full name" name="fullName" autoComplete="name" value={details.fullName || ""} />
              <CheckoutField label="Country or region" name="country" autoComplete="country-name" value={details.country || ""} />
              <div className="sm:col-span-2">
                <CheckoutField label="Street address" name="address" autoComplete="street-address" value={details.address || ""} />
              </div>
              <CheckoutField label="City" name="city" autoComplete="address-level2" value={details.city || ""} />
              <CheckoutField label="State or province" name="region" autoComplete="address-level1" value={details.region || ""} />
              <CheckoutField label="Postal code" name="postalCode" autoComplete="postal-code" value={details.postalCode || ""} />
            </div>
          </section>

          <section aria-labelledby="shipping-method-heading" className="mt-8 border-t border-slate-100 pt-6">
            <h2 id="shipping-method-heading" className="text-lg font-bold text-slate-900">
              Delivery method
            </h2>
            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
              <input
                type="radio"
                name="shippingMethod"
                value="standard"
                defaultChecked
                required
                className="mt-1 accent-blue-700"
              />
              <span className="flex-1">
                <span className="block font-semibold text-slate-900">Standard delivery</span>
              </span>
              <span className="text-sm font-bold text-slate-900">Free</span>
            </label>
          </section>

          <button
            type="submit"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
          >
            Continue to payment
            <ArrowRight size={16} />
          </button>
        </form>

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
