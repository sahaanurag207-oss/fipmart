import {
  MAX_CART_QUANTITY,
  menProducts,
  premiumProducts,
  womenProducts,
} from "../src/data.js";

const products = new Map(
  [...premiumProducts, ...womenProducts, ...menProducts].map((product) => [
    product.id,
    product,
  ]),
);

export function getStripeLineItems(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new TypeError("Your cart is empty.");
  }

  if (cart.length > products.size) {
    throw new TypeError("Your cart contains too many different products.");
  }

  return cart.map((item) => {
    if (
      !item ||
      !Number.isSafeInteger(item.id) ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > MAX_CART_QUANTITY
    ) {
      throw new TypeError("Your cart contains an invalid product or quantity.");
    }

    const product = products.get(item.id);
    if (!product) {
      throw new TypeError("Your cart contains a product that is no longer available.");
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    };
  });
}
