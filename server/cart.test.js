import assert from "node:assert/strict";
import test from "node:test";

import { getStripeLineItems } from "./cart.js";
import { MAX_CART_QUANTITY, matchesCategory, premiumProducts } from "../src/data.js";

test("uses trusted catalog prices for Stripe line items", () => {
  const [lineItem] = getStripeLineItems([{ id: 1, quantity: 2, price: 0.01 }]);

  assert.equal(lineItem.price_data.product_data.name, "Inkjet Photo Printer");
  assert.equal(lineItem.price_data.unit_amount, 8900);
  assert.equal(lineItem.quantity, 2);
  assert.equal(lineItem.price_data.currency, "usd");
});

test("rejects an empty cart", () => {
  assert.throws(() => getStripeLineItems([]), /cart is empty/i);
});

test("rejects unknown products", () => {
  assert.throws(
    () => getStripeLineItems([{ id: 999, quantity: 1 }]),
    /no longer available/i,
  );
});

test("rejects invalid quantities", () => {
  for (const quantity of [0, -1, 1.5, MAX_CART_QUANTITY + 1, "2"]) {
    assert.throws(
      () => getStripeLineItems([{ id: 1, quantity }]),
      /invalid product or quantity/i,
    );
  }
});

test("accepts the maximum cart quantity", () => {
  const [lineItem] = getStripeLineItems([
    { id: 1, quantity: MAX_CART_QUANTITY },
  ]);

  assert.equal(lineItem.quantity, MAX_CART_QUANTITY);
});

test("matches category selections against catalog data", () => {
  const camera = premiumProducts.find((product) => product.id === 2);
  const television = premiumProducts.find((product) => product.id === 3);

  assert.equal(matchesCategory(camera, "Cameras"), true);
  assert.equal(matchesCategory(television, "Cameras"), false);
  assert.equal(matchesCategory(camera, "Best Deals"), true);
  assert.equal(matchesCategory(television, "Best Deals"), false);
});

test("rejects malformed carts", () => {
  for (const cart of [null, {}, "cart"]) {
    assert.throws(() => getStripeLineItems(cart), /cart is empty/i);
  }
});
