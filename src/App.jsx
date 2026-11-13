import { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import SideAd from "./components/SideAd";
import TopSelling from "./components/TopSelling";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";
import InfoPage from "./pages/InfoPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutResultPage from "./pages/CheckoutResultPage";
import FloatingCart from "./components/FloatingCart";

import {
  MAX_CART_QUANTITY,
  matchesCategory,
  premiumProducts,
  womenProducts,
  menProducts
} from "./data";

function loadCart() {
  try {
    const savedCart = localStorage.getItem("flipmart-cart");
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) {
      throw new TypeError("Saved cart data must be an array.");
    }

    return normalizeCart(parsedCart
      .filter((item) =>
        item &&
        Number.isSafeInteger(item.id) &&
        typeof item.name === "string" &&
        typeof item.image === "string" &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0
      ));
  } catch (error) {
    console.error("Could not restore the saved cart.", error);
    return [];
  }
}

function normalizeCart(cart) {
  return cart.map((item) => ({
    ...item,
    quantity: Math.min(item.quantity, MAX_CART_QUANTITY),
  }));
}

function HomePage({
  premium,
  women,
  men,
  cartQuantities,
  activeCategory,
  setActiveCategory,
  addToCart
}) {
  return (
    <>
      <Hero />

      {activeCategory && (
        <div className="container-wide mb-3 flex items-center justify-between rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-800">

          <span>
            Selected category: <b>{activeCategory}</b>
          </span>

          <button
            onClick={() => setActiveCategory("")}
            className="font-semibold underline"
          >
            Clear
          </button>

        </div>
      )}

      <main className="container-wide space-y-4 pb-24 sm:pb-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_190px]">
          <ProductSection
            title="Premium Products"
            products={premium}
            cartQuantities={cartQuantities}
            onAdd={addToCart}
            columns={5}
          />

          <div className="hidden lg:block">
            <SideAd />
          </div>
        </div>

        <ProductSection
          title="Clothing and Girls Collections"
          products={women}
          cartQuantities={cartQuantities}
          onAdd={addToCart}
          columns={6}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(300px,.8fr)_1.5fr]">
          <ProductSection
            title="Men's Fashion"
            products={men}
            cartQuantities={cartQuantities}
            onAdd={addToCart}
            columns={2}
          />

          <TopSelling />
        </div>
      </main>
    </>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(loadCart);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("flipmart-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save the cart on this device.", error);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= MAX_CART_QUANTITY) return current;
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const changeCartQuantity = (productId, quantity) => {
    if (!Number.isSafeInteger(quantity) || quantity > MAX_CART_QUANTITY) return;
    setCart((current) =>
      current
        .map((item) => item.id === productId ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const filterProducts = useCallback((products) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      matchesCategory(product, activeCategory)
    );
  }, [activeCategory, search]);

  const premium = useMemo(
    () => filterProducts(premiumProducts),
    [filterProducts]
  );

  const women = useMemo(
    () => filterProducts(womenProducts),
    [filterProducts]
  );

  const men = useMemo(
    () => filterProducts(menProducts),
    [filterProducts]
  );

  const allProducts = useMemo(
    () => [...premiumProducts, ...womenProducts, ...menProducts],
    []
  );

  const shopProducts = useMemo(
    () => filterProducts(allProducts),
    [allProducts, filterProducts]
  );

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartQuantities = useMemo(
    () => Object.fromEntries(cart.map((item) => [item.id, item.quantity])),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const clearCartAfterPayment = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f3f5]">
      <Header
        cartCount={cartCount}
        search={search}
        setSearch={setSearch}
      />

      <CategoryNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              premium={premium}
              women={women}
              men={men}
              cartQuantities={cartQuantities}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <ShopPage
              products={shopProducts}
              cartQuantities={cartQuantities}
              onAdd={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              subtotal={cartSubtotal}
              onChangeQuantity={changeCartQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} subtotal={cartSubtotal} />}
        />

        <Route
          path="/checkout/success"
          element={<CheckoutResultPage onPaymentVerified={clearCartAfterPayment} />}
        />

        <Route
          path="/about"
          element={
            <InfoPage
              title="About us"
              description="Flipmart brings modern convenience, trusted quality, and a beautifully curated shopping experience to customers who want the best of fashion, home, and technology in one place."
              items={[
                {
                  title: "Our story",
                  text: "We started with a simple idea: make online shopping thoughtful, accessible, and enjoyable for every customer."
                },
                {
                  title: "Why customers choose us",
                  text: "From premium essentials to trending fashion, we focus on products that feel useful, stylish, and worth the buy."
                },
                {
                  title: "Built for Everyday Life",
                  text: "Whether you are refreshing your wardrobe, upgrading your workspace, or gifting someone special, Flipmart helps you discover the right fit."
                },
                {
                  title: "Service first",
                  text: "We back every purchase with clear support, speedy fulfillment, and assistance whenever you need it."
                }
              ]}
            />
          }
        />

        <Route
          path="/offers"
          element={
            <InfoPage
              title="Special offers"
              description="Take advantage of seasonal promotions, limited-time bundles, and hand-picked discounts across electronics, wardrobe upgrades, and home essentials."
              items={[
                {
                  title: "Flash deals",
                  text: "New markdowns appear each week on popular categories and trending products."
                },
                {
                  title: "Bundle savings",
                  text: "Pair related items together and save more on essentials for work, travel, or daily life."
                },
                {
                  title: "Member rewards",
                  text: "Exclusive pricing and early access for repeat shoppers and loyal customers."
                },
                {
                  title: "Seasonal picks",
                  text: "Get curated collections for gifting, travel, home refreshes, and end-of-season upgrades."
                }
              ]}
            />
          }
        />

        <Route
          path="/contact"
          element={
            <InfoPage
              title="Contact us"
              description="Need help choosing a product, tracking an order, or speaking with a support specialist? Our team is here to help with fast, friendly service."
              items={[
                {
                  title: "Email support",
                  text: "hello@flipmart.example — response within one business day."
                },
                {
                  title: "Call us",
                  text: "+1 (800) 555-0135 — weekdays from 9 AM to 6 PM."
                },
                {
                  title: "Store hours",
                  text: "Virtual assistance is available Monday through Saturday."
                },
                {
                  title: "Location",
                  text: "Online retail support for shoppers across the country and beyond."
                }
              ]}
            />
          }
        />

        <Route
          path="/account"
          element={
            <InfoPage
              title="My account"
              description="Manage saved carts, track your orders, update account details, and keep your shopping preferences ready for your next favorite find."
              items={[
                {
                  title: "Order history",
                  text: "Review previous purchases, delivery details, and returns in one place."
                },
                {
                  title: "Saved items",
                  text: "Bookmark products you want to revisit before your next order."
                },
                {
                  title: "Preferences",
                  text: "Sync your favorite brands, categories, and notification settings."
                },
                {
                  title: "Fast checkout",
                  text: "Keep billing and shipping information ready for simpler future orders."
                }
              ]}
            />
          }
        />

        <Route
          path="/track-order"
          element={
            <InfoPage
              title="Track order"
              description="Follow your order from packing to doorstep with quick updates on shipment progress, estimated delivery, and status changes."
              items={[
                {
                  title: "Shipment updates",
                  text: "Receive live progress notifications as your order moves through fulfillment."
                },
                {
                  title: "Estimated delivery",
                  text: "See the expected arrival window for each package before it ships."
                },
                {
                  title: "Support if needed",
                  text: "If delivery is delayed, our team can help review the status and next steps."
                },
                {
                  title: "Secure delivery",
                  text: "Check your package updates anytime from your account dashboard."
                }
              ]}
            />
          }
        />

        <Route
          path="/returns"
          element={
            <InfoPage
              title="Returns & refunds"
              description="We want every purchase to feel right. If something is not the perfect fit, we make returns and refunds simple and transparent."
              items={[
                {
                  title: "Easy returns",
                  text: "Start a return online, print a label, and send it back with minimal hassle."
                },
                {
                  title: "Refund timing",
                  text: "Refunds are issued promptly once the return is approved and processed."
                },
                {
                  title: "Damaged items",
                  text: "Report damaged or incorrect items quickly so we can replace or refund them."
                },
                {
                  title: "Helpful support",
                  text: "Our team is available to answer questions about return eligibility and next steps."
                }
              ]}
            />
          }
        />

        <Route
          path="/faqs"
          element={
            <InfoPage
              title="FAQs"
              description="Find quick answers about shipping, returns, product care, and order support so your shopping experience stays smooth and stress-free."
              items={[
                {
                  title: "How long does shipping take?",
                  text: "Most orders ship within 1–3 business days, with delivery times varying by location and item type."
                },
                {
                  title: "Can I change my order?",
                  text: "If the order has not yet shipped, we may be able to help update or cancel it."
                },
                {
                  title: "Do you offer exchanges?",
                  text: "Yes, exchanges can be arranged for eligible items if the size, style, or replacement is available."
                },
                {
                  title: "Why was my item unavailable?",
                  text: "Some products are limited or seasonal. The item may restock, or a similar option may be recommended."
                }
              ]}
            />
          }
        />
      </Routes>

      <Footer />

      <FloatingCart count={cartCount} subtotal={cartSubtotal} />
    </div>
  );
}