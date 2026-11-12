import { useEffect, useState } from "react";
import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function CheckoutResultPage({ onPaymentVerified }) {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [result, setResult] = useState({ status: "loading", message: "" });

  useEffect(() => {
    let active = true;

    async function verifyPayment() {
      if (!sessionId) {
        setResult({ status: "error", message: "The checkout session ID is missing." });
        return;
      }

      try {
        const response = await fetch(
          `/api/checkout-sessions/${encodeURIComponent(sessionId)}`,
        );
        const session = await response.json();
        if (!response.ok) {
          throw new Error(session.error || "Payment status could not be verified.");
        }

        if (!active) return;

        if (session.paymentStatus === "paid") {
          try {
            if (localStorage.getItem("flipmart-last-paid-session") !== sessionId) {
              onPaymentVerified();
              localStorage.setItem("flipmart-last-paid-session", sessionId);
            }
          } catch (error) {
            console.error("Could not save the verified checkout status.", error);
            onPaymentVerified();
          }
          setResult({ status: "paid", message: "Your test payment was successful." });
        } else if (session.status === "complete") {
          setResult({ status: "pending", message: "Your payment is processing. Your cart has not been cleared." });
        } else {
          setResult({ status: "pending", message: "This checkout session is not marked as paid. Your cart is still available." });
        }
      } catch (error) {
        if (active) {
          setResult({
            status: "error",
            message: error instanceof Error ? error.message : "Payment status could not be verified.",
          });
        }
      }
    }

    verifyPayment();
    return () => {
      active = false;
    };
  }, [onPaymentVerified, sessionId]);

  const isPaid = result.status === "paid";
  const isLoading = result.status === "loading";

  return (
    <main className="container-wide pb-24 pt-10 sm:py-14">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${isPaid ? "bg-emerald-50 text-emerald-700" : result.status === "error" ? "bg-rose-50 text-rose-700" : "bg-blue-50 text-blue-700"}`}>
          {isLoading ? <LoaderCircle className="animate-spin" size={28} /> : isPaid ? <CheckCircle2 size={28} /> : <CircleAlert size={28} />}
        </span>
        <h1 className="mt-5 text-3xl font-black text-slate-900">
          {isLoading ? "Verifying payment" : isPaid ? "Thank you for your order" : "Payment status"}
        </h1>
        <p role={result.status === "error" ? "alert" : "status"} className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
          {isLoading ? "Checking the payment directly with Stripe..." : result.message}
        </p>
        {isPaid && (
          <p className="mt-3 text-xs text-slate-500">
            This was a test-mode payment. No real charge was made.
          </p>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
            Continue shopping
          </Link>
          {!isPaid && (
            <Link to="/cart" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500">
              Return to cart
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
