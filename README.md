# Flipmart

Flipmart is a React/Vite storefront with a persistent shopping cart and Stripe-hosted test checkout.

## Run locally

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Copy `.env.example` to `.env` and set `STRIPE_SECRET_KEY` to a **test-mode** secret key from your Stripe dashboard. Keep this key server-side; never add it to a `VITE_*` variable or commit it.

   ```powershell
   Copy-Item .env.example .env
   ```

3. Start the frontend and checkout API:

   ```powershell
   npm run dev
   ```

   Open `http://localhost:5173`. The API listens on port `4242` and Vite proxies `/api` requests to it. `API_PORT`, `FRONTEND_URL`, and `STRIPE_ALLOWED_COUNTRIES` can be adjusted in `.env`.

4. On Stripe Checkout, use the Stripe test card `4242 4242 4242 4242`, any future expiry date, and any CVC. This integration rejects live secret keys and does not take real payments.

The checkout session is built from server-side catalog prices, not prices sent by the browser. Stripe-hosted Checkout collects billing and delivery addresses. Standard shipping is free; tax calculation, order storage, fulfillment, and production webhooks are not configured.

## Validation

```powershell
npm test
npm run lint
npm run build
```
