import assert from "node:assert/strict";
import test from "node:test";

import {
  matchesCategory,
  premiumProducts,
  womenProducts
} from "./data.js";
import { getCartSummary, normalizeCart } from "./cart.js";

test("matches category selections against catalog data", () => {
  const camera = premiumProducts.find((product) => product.id === 2);
  const television = premiumProducts.find((product) => product.id === 3);
  const discountedDress = womenProducts.find((product) => product.id === 6);

  assert.equal(matchesCategory(camera, "Cameras"), true);
  assert.equal(matchesCategory(television, "Cameras"), false);
  assert.equal(matchesCategory(discountedDress, "Best Deals"), true);
  assert.equal(matchesCategory(television, "Best Deals"), false);
});

test("television pricing stays above smaller electronics accessories", () => {
  const television = premiumProducts.find((product) => product.id === 3);
  const printer = premiumProducts.find((product) => product.id === 1);
  const controller = premiumProducts.find((product) => product.id === 5);

  assert.ok(television.price > printer.price);
  assert.ok(television.price > controller.price);
});

test("cart summary uses current catalog prices for persisted items", () => {
  const cart = normalizeCart([
    { id: 1, name: "Inkjet Photo Printer", price: 89, quantity: 2 },
    { id: 2, name: "Studio DSLR Camera", price: 127, quantity: 1 },
    { id: 3, name: "4K Smart Television", price: 79, quantity: 1 },
    { id: 11, name: "Mustard Casual Set", price: 122, quantity: 1 },
    { id: 12, name: "Classic White T-shirt", price: 35, quantity: 1 }
  ]);

  assert.deepEqual(getCartSummary(cart), { itemCount: 6, subtotal: 961 });
});
