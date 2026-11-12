import "dotenv/config";
import express from "express";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";

import { getStripeLineItems } from "./cart.js";

const app = express();
const port = Number(process.env.API_PORT || 4242);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripeReady = stripeSecretKey.startsWith("sk_test_");
const stripe = stripeReady ? new Stripe(stripeSecretKey) : null;
const allowedCountries = (process.env.STRIPE_ALLOWED_COUNTRIES || "US,CA,GB,IN,AU")
  .split(",")
  .map((country) => country.trim().toUpperCase())
  .filter(Boolean);

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const appDirectory = path.resolve(currentDirectory, "..");

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, stripeTestModeConfigured: stripeReady });
});

app.post("/api/checkout-sessions", async (request, response) => {
  let lineItems;
  try {
    lineItems = getStripeLineItems(request.body?.cart);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  if (!stripe) {
    return response.status(503).json({
      error: "Stripe test mode is not configured. Add your test secret key to the server environment.",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: allowedCountries },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Standard shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/cart?checkout=cancelled`,
    });

    return response.json({ url: session.url });
  } catch (error) {
    console.error("Could not create Stripe Checkout session.", error);
    return response.status(502).json({
      error: "Checkout could not be started. Please try again.",
    });
  }
});

app.get("/api/checkout-sessions/:sessionId", async (request, response) => {
  if (!/^cs_test_[A-Za-z0-9]+$/.test(request.params.sessionId)) {
    return response.status(400).json({ error: "Invalid checkout session." });
  }

  if (!stripe) {
    return response.status(503).json({
      error: "Stripe test mode is not configured. Add your test secret key to the server environment.",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(request.params.sessionId);
    return response.json({
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error("Could not retrieve Stripe Checkout session.", error);
    return response.status(502).json({
      error: "Payment status could not be verified. Please refresh to try again.",
    });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(appDirectory, "dist")));
  app.use((_request, response) => {
    response.sendFile(path.join(appDirectory, "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Flipmart API listening on http://localhost:${port}`);
  if (!stripeReady) {
    console.warn("Stripe test mode is not configured; checkout requests will be rejected.");
  }
});
