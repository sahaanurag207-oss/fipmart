import assert from "node:assert/strict";
import test from "node:test";

import { addBusinessDays, createOrder } from "./order.js";

test("delivery estimates skip weekends", () => {
  const placedAt = new Date(2026, 10, 13, 12);

  assert.equal(addBusinessDays(placedAt, 3).getDate(), 18);
  assert.equal(addBusinessDays(placedAt, 5).getDate(), 20);
});

test("cash-on-delivery order snapshots cart totals and delivery dates", () => {
  const order = createOrder(
    [{ id: 1, name: "Printer", price: 89, quantity: 2 }],
    { fullName: "Buyer", address: "12 Main St" },
    new Date(2026, 10, 13, 12)
  );

  assert.equal(order.paymentMethod, "Cash on delivery");
  assert.equal(order.subtotal, 178);
  assert.equal(order.items[0].quantity, 2);
  assert.equal(new Date(order.estimatedDeliveryStart).getDate(), 18);
  assert.equal(new Date(order.estimatedDeliveryEnd).getDate(), 20);
});
