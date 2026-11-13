import { useMemo, useState } from "react";
import ProductSection from "../components/ProductSection";

export default function ShopPage({
  products,
  cartQuantities,
  wishlistIds,
  onAdd,
  onToggleWishlist
}) {
  const [sortOrder, setSortOrder] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (priceRange === "under-50") return product.price < 50;
      if (priceRange === "50-100") return product.price >= 50 && product.price < 100;
      if (priceRange === "100-250") return product.price >= 100 && product.price < 250;
      if (priceRange === "250-plus") return product.price >= 250;
      return true;
    });

    if (sortOrder === "price-low") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "price-high") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    if (sortOrder === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [priceRange, products, sortOrder]);

  return (
    <main className="container-wide pb-24 pt-8 sm:pt-8">
      <div className="mb-6 rounded-2xl bg-linear-to-r from-blue-700 to-sky-600 px-6 py-8 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-100">
          Shop collection
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          Discover amazing deals
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-blue-50">
          Browse everyday essentials, premium electronics, and curated fashion for every moment.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600" aria-live="polite">
          Showing <span className="font-semibold text-slate-900">{visibleProducts.length}</span> products
        </p>
        <div className="flex flex-wrap gap-3">
          <label className="grid gap-1 text-xs font-semibold text-slate-600">
            Price
            <select
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}
              className="h-10 min-w-36 rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal text-slate-800"
            >
              <option value="all">All prices</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 - $99.99</option>
              <option value="100-250">$100 - $249.99</option>
              <option value="250-plus">$250 and up</option>
            </select>
          </label>
          <label className="grid gap-1 text-xs font-semibold text-slate-600">
            Sort by
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="h-10 min-w-40 rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal text-slate-800"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
      </div>

      <ProductSection
        title="All products"
        products={visibleProducts}
        cartQuantities={cartQuantities}
        wishlistIds={wishlistIds}
        onAdd={onAdd}
        onToggleWishlist={onToggleWishlist}
        columns={5}
      />
    </main>
  );
}
