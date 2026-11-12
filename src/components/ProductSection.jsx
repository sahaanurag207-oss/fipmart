import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card group relative flex min-w-0 flex-col border border-slate-200 bg-white p-3">

      <button
        aria-label="Add to wishlist"
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow-sm hover:text-rose-500"
      >
        <Heart size={16} />
      </button>

      <div className="flex h-36.25 items-center justify-center overflow-hidden bg-white sm:h-41.25">

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
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
        onClick={() => onAdd(product)}
        className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-900 py-2 text-xs font-semibold text-white opacity-100 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <ShoppingCart size={14} />
        Add to cart
      </button>

    </article>
  );
}

export default function ProductSection({
  title,
  products,
  onAdd,
  columns = 5
}) {

  const gridColumns = {
    2: "lg:grid-cols-2",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6"
  }[columns] || "lg:grid-cols-5";

  return (
    <section className="section-panel p-4 sm:p-5">

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
            No products match your search.
          </p>
        )}

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}

      </div>

    </section>
  );
}