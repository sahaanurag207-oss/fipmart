import {
  MAX_CART_QUANTITY,
  menProducts,
  premiumProducts,
  womenProducts
} from "./data.js";

const catalogById = new Map(
  [...premiumProducts, ...womenProducts, ...menProducts].map((product) => [
    product.id,
    product
  ])
);

export function normalizeCart(cart) {
  return cart.map((item) => ({
    ...item,
    ...catalogById.get(item.id),
    quantity: Math.min(item.quantity, MAX_CART_QUANTITY)
  }));
}

export function getCartSummary(cart) {
  return cart.reduce(
    (summary, item) => ({
      itemCount: summary.itemCount + item.quantity,
      subtotal: summary.subtotal + item.price * item.quantity
    }),
    { itemCount: 0, subtotal: 0 }
  );
}
