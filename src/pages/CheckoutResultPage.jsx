import { CircleAlert } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function CheckoutResultPage() {
  const { state } = useLocation();

  if (!state?.shippingDetails) {
    return <Navigate to="/checkout" replace />;
  }

  return (
    <main className="container-wide pb-24 pt-10 sm:pt-14">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-50 text-amber-700">
          <CircleAlert size={28} />
        </span>
        <h1 className="mt-5 text-3xl font-black text-slate-900">Payment unavailable</h1>
        <p role="status" className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
          Your delivery details are ready, but payment methods are not available yet. Your order has not been placed.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/checkout" className="rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
            Edit delivery details
          </Link>
          <Link to="/cart" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500">
            Return to cart
          </Link>
        </div>
      </section>
    </main>
  );
}
