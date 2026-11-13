import ProductSection from "../components/ProductSection";

export default function ShopPage({ products, cartQuantities, onAdd }) {
  return (
    <main className="container-wide pb-24 pt-8 sm:py-8">
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

      <ProductSection
        title="All products"
        products={products}
        cartQuantities={cartQuantities}
        onAdd={onAdd}
        columns={5}
      />
    </main>
  );
}
