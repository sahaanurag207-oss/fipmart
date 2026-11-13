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
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import WishlistPage from "./pages/WishlistPage";
import FloatingCart from "./components/FloatingCart";
import { getCartSummary, normalizeCart } from "./cart";

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

function loadWishlist() {
  try {
    const savedWishlist = localStorage.getItem("flipmart-wishlist");
    if (!savedWishlist) return [];

    const parsedWishlist = JSON.parse(savedWishlist);
    if (!Array.isArray(parsedWishlist)) {
      throw new TypeError("Saved wishlist data must be an array.");
    }

    return [...new Set(parsedWishlist.filter(Number.isSafeInteger))];
  } catch (error) {
    console.error("Could not restore the saved wishlist.", error);
    return [];
  }
}

function emptyProfile() {
  return {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    country: ""
  };
}

function loadProfile() {
  try {
    const savedProfile = localStorage.getItem("flipmart-profile");
    if (!savedProfile) return emptyProfile();

    const parsedProfile = JSON.parse(savedProfile);
    if (!parsedProfile || typeof parsedProfile !== "object" || Array.isArray(parsedProfile)) {
      throw new TypeError("Saved profile data must be an object.");
    }

    return Object.fromEntries(
      Object.keys(emptyProfile()).map((key) => [
        key,
        typeof parsedProfile[key] === "string" ? parsedProfile[key] : ""
      ])
    );
  } catch (error) {
    console.error("Could not restore the saved profile.", error);
    return emptyProfile();
  }
}

function HomePage({
  premium,
  women,
  men,
  cartQuantities,
  wishlistIds,
  activeCategory,
  setActiveCategory,
  addToCart,
  onChangeQuantity,
  onToggleWishlist
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

      <main className="container-wide space-y-4 pb-32">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_190px]">
          <ProductSection
            title="Premium Products"
            products={premium}
            cartQuantities={cartQuantities}
            wishlistIds={wishlistIds}
            onAdd={addToCart}
            onChangeQuantity={onChangeQuantity}
            onToggleWishlist={onToggleWishlist}
            columns={5}
            shopTag="featured"
          />

          <div className="hidden lg:block">
            <SideAd />
          </div>
        </div>

        <ProductSection
          title="Clothing and Girls Collections"
          products={women}
          cartQuantities={cartQuantities}
          wishlistIds={wishlistIds}
          onAdd={addToCart}
          onChangeQuantity={onChangeQuantity}
          onToggleWishlist={onToggleWishlist}
          columns={6}
          deferred
          shopTag="women"
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(300px,.8fr)_1.5fr]">
          <ProductSection
            title="Men's Fashion"
            products={men}
            cartQuantities={cartQuantities}
            wishlistIds={wishlistIds}
            onAdd={addToCart}
            onChangeQuantity={onChangeQuantity}
            onToggleWishlist={onToggleWishlist}
            columns={2}
            deferred
            shopTag="men"
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
  const [wishlistIds, setWishlistIds] = useState(loadWishlist);
  const [profile, setProfile] = useState(loadProfile);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("flipmart-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save the cart on this device.", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("flipmart-wishlist", JSON.stringify(wishlistIds));
    } catch (error) {
      console.error("Could not save the wishlist on this device.", error);
    }
  }, [wishlistIds]);

  const addToCart = useCallback((product) => {
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
  }, []);

  const changeCartQuantity = useCallback((productId, quantity) => {
    if (!Number.isSafeInteger(quantity) || quantity > MAX_CART_QUANTITY) return;
    setCart((current) =>
      current
        .map((item) => item.id === productId ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId) => {
    setWishlistIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }, []);

  const saveForLater = useCallback((productId) => {
    setWishlistIds((current) =>
      current.includes(productId) ? current : [...current, productId]
    );
    setCart((current) => current.filter((item) => item.id !== productId));
  }, []);

  const saveProfile = useCallback((nextProfile) => {
    try {
      localStorage.setItem("flipmart-profile", JSON.stringify(nextProfile));
      setProfile(nextProfile);
      return true;
    } catch (error) {
      console.error("Could not save the buyer profile on this device.", error);
      return false;
    }
  }, []);

  const clearProfile = useCallback(() => {
    try {
      localStorage.removeItem("flipmart-profile");
      setProfile(emptyProfile());
      return true;
    } catch (error) {
      console.error("Could not clear the buyer profile on this device.", error);
      return false;
    }
  }, []);

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

  const { itemCount: cartCount, subtotal: cartSubtotal } = useMemo(
    () => getCartSummary(cart),
    [cart]
  );

  const cartQuantities = useMemo(
    () => Object.fromEntries(cart.map((item) => [item.id, item.quantity])),
    [cart]
  );

  return (
    <div className="min-h-screen bg-[#f2f3f5]">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        search={search}
        setSearch={setSearch}
        products={allProducts}
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
              wishlistIds={wishlistIds}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              addToCart={addToCart}
              onChangeQuantity={changeCartQuantity}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <ShopPage
              products={shopProducts}
              cartQuantities={cartQuantities}
              wishlistIds={wishlistIds}
              onAdd={addToCart}
              onChangeQuantity={changeCartQuantity}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <WishlistPage
              products={allProducts}
              cartQuantities={cartQuantities}
              wishlistIds={wishlistIds}
              onAdd={addToCart}
              onChangeQuantity={changeCartQuantity}
              onToggleWishlist={toggleWishlist}
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
              onSaveForLater={saveForLater}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              subtotal={cartSubtotal}
              profile={profile}
            />
          }
        />

        <Route
          path="/checkout/payment"
          element={<PaymentPage cart={cart} subtotal={cartSubtotal} />}
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
          path="/vendor"
          element={
            <InfoPage
              title="Become a Flipmart vendor"
              description="Bring your products to a growing community of shoppers. Share a few details about your business and our partner team will help you get started."
              items={[
                {
                  title: "Tell us about your store",
                  text: "Introduce your business, product range, and the customers you serve."
                },
                {
                  title: "Prepare your catalog",
                  text: "Organize clear product photos, descriptions, pricing, and inventory details."
                },
                {
                  title: "Set up fulfillment",
                  text: "Choose how you will package, ship, and support orders placed through Flipmart."
                },
                {
                  title: "Talk to our team",
                  text: "Contact hello@flipmart.example to discuss onboarding and next steps."
                }
              ]}
            />
          }
        />

        <Route
          path="/account"
          element={
            <AccountPage
              profile={profile}
              cartCount={cartCount}
              wishlistCount={wishlistIds.length}
              onSaveProfile={saveProfile}
              onClearProfile={clearProfile}
            />
          }
        />

        <Route
          path="/track-order"
          element={
            <InfoPage
              title="Track order"
              description="Order tracking will be available when order processing is connected. You can still review your saved cart and checkout details."
              items={[
                {
                  title: "No active orders",
                  text: "There are no submitted orders to track right now."
                },
                {
                  title: "Saved cart",
                  text: "Your cart stays saved on this device while you continue shopping."
                },
                {
                  title: "Need help?",
                  text: "Contact support if you have a question about a checkout or delivery."
                },
                {
                  title: "Tracking updates",
                  text: "Shipment status and delivery estimates will appear here when order tracking is available."
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
              description="Returns and refunds will be available when order and payment processing are connected. Contact support with questions about the catalog."
              items={[
                {
                  title: "Easy returns",
                  text: "Return requests cannot be started until orders can be processed."
                },
                {
                  title: "Refund timing",
                  text: "Refund timing depends on a connected payment and order system."
                },
                {
                  title: "Damaged items",
                  text: "Contact support with product questions or concerns."
                },
                {
                  title: "Helpful support",
                  text: "Our support team can answer questions about the current shopping experience."
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
                  text: "Delivery estimates are not available yet. Standard shipping is currently listed as free at checkout."
                },
                {
                  title: "Can I change my order?",
                  text: "Orders cannot be changed or cancelled because order submission is not connected. You can update your cart before checkout."
                },
                {
                  title: "Do you offer exchanges?",
                  text: "Exchanges will be available when order processing is connected."
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