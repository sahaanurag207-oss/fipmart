import { getCartSummary } from "./cart.js";

export function addBusinessDays(startDate, businessDays) {
  if (!(startDate instanceof Date) || Number.isNaN(startDate.getTime())) {
    throw new TypeError("A valid start date is required.");
  }
  if (!Number.isSafeInteger(businessDays) || businessDays < 0) {
    throw new RangeError("Business days must be a non-negative integer.");
  }

  const result = new Date(startDate);
  let remainingDays = businessDays;

  while (remainingDays > 0) {
    result.setDate(result.getDate() + 1);
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      remainingDays -= 1;
    }
  }

  return result;
}

export function createOrder(cart, shippingDetails, now = new Date()) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new TypeError("At least one cart item is required to place an order.");
  }
  if (!shippingDetails || typeof shippingDetails !== "object") {
    throw new TypeError("Shipping details are required to place an order.");
  }

  return {
    id: `FM-${now.getTime().toString(36).toUpperCase()}`,
    placedAt: now.toISOString(),
    estimatedDeliveryStart: addBusinessDays(now, 3).toISOString(),
    estimatedDeliveryEnd: addBusinessDays(now, 5).toISOString(),
    paymentMethod: "Cash on delivery",
    shippingDetails: { ...shippingDetails },
    items: cart.map((item) => ({ ...item })),
    subtotal: getCartSummary(cart).subtotal
  };
}
