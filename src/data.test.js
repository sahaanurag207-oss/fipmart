import assert from "node:assert/strict";
import test from "node:test";

import { matchesCategory, premiumProducts, womenProducts } from "./data.js";

test("matches category selections against catalog data", () => {
  const camera = premiumProducts.find((product) => product.id === 2);
  const television = premiumProducts.find((product) => product.id === 3);
  const discountedDress = womenProducts.find((product) => product.id === 6);

  assert.equal(matchesCategory(camera, "Cameras"), true);
  assert.equal(matchesCategory(television, "Cameras"), false);
  assert.equal(matchesCategory(discountedDress, "Best Deals"), true);
  assert.equal(matchesCategory(television, "Best Deals"), false);
});
