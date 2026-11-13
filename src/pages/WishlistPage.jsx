import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductSection from "../components/ProductSection";

export default function WishlistPage({
  products,
  cartQuantities,
  wishlistIds,
  onAdd,
  onChangeQuantity,
  onToggleWishlist
}) {
  const savedProducts = products.filter((product) =>
    wishlistIds.includes(product.id)
  );

  return (
    <main className="container-wide pb-24 pt-8 sm:pt-10">
      <div className="mb-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-rose-600">
          <Heart size={16} fill="currentColor" />
          Your saved items
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
          Wishlist
        </h1>
      </div>

      {savedProducts.length > 0 ? (
        <ProductSection
          title={`${savedProducts.length} saved item${savedProducts.length === 1 ? "" : "s"}`}
          products={savedProducts}
          cartQuantities={cartQuantities}
          wishlistIds={wishlistIds}
          onAdd={onAdd}
          onChangeQuantity={onChangeQuantity}
          onToggleWishlist={onToggleWishlist}
          columns={5}
        />
      ) : (
        <section className="hover-surface rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-lg font-bold text-slate-900">Your wishlist is empty</p>
          <p className="mt-2 text-sm text-slate-600">
            Save products with the heart button and they’ll be ready when you are.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Browse products
          </Link>
        </section>
      )}
    </main>
  );
}
