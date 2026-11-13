import { memo } from "react";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { MAX_CART_QUANTITY } from "../data";

const ProductCard = memo(function ProductCard({ product, quantity, onAdd }) {
  const maxQuantityReached = quantity >= MAX_CART_QUANTITY;

  return (
    <article className="product-card group relative flex min-w-0 flex-col border border-slate-200 bg-white p-3">

      <button
        aria-label="Add to wishlist"
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow-sm hover:text-rose-500"
      >
        <Heart size={16} />
      </button>

      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">

        <img
          src={product.image}
          alt={product.name}
          width="400"
          height="300"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

      </div>

      <div className="mt-3 text-center">

        <p className="truncate text-xs font-medium text-slate-600">
          {product.name}
        </p>

        <div className="mt-1 flex items-center justify-center gap-2 text-sm font-bold text-slate-900">

          <span>
            ${product.price.toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="text-xs font-normal text-slate-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}

        </div>

      </div>

      <button
        type="button"
        disabled={maxQuantityReached}
        onClick={() => onAdd(product)}
        aria-label={`${maxQuantityReached ? "Maximum quantity reached for" : "Add"} ${product.name} to cart`}
        className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-900 py-2 text-xs font-semibold text-white opacity-100 transition-opacity hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <ShoppingCart size={14} />
        {maxQuantityReached ? "Maximum quantity reached" : quantity > 0 ? "Add another" : "Add to cart"}
      </button>

      {quantity > 0 && (
        <p
          role="status"
          className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-emerald-700"
        >
          <Check size={14} aria-hidden="true" />
          Added to cart · Qty {quantity}
        </p>
      )}

    </article>
  );
});

function ProductSection({
  title,
  products,
  cartQuantities = {},
  onAdd,
  columns = 5,
  deferred = false
}) {

  const gridColumns = {
    2: "lg:grid-cols-2",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6"
  }[columns] || "lg:grid-cols-5";

  return (
    <section className={`section-panel p-4 sm:p-5${deferred ? " deferred-content" : ""}`}>

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-base font-bold text-slate-800 sm:text-lg">
          {title}
        </h2>

        <Link to="/shop" className="text-xs font-semibold text-blue-700 hover:underline">
          View all
        </Link>

      </div>

      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${gridColumns}`}>

        {products.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-slate-500">
            No products match your search or category.
          </p>
        )}

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cartQuantities[product.id] || 0}
            onAdd={onAdd}
          />
        ))}

      </div>

    </section>
  );
}

export default memo(ProductSection);