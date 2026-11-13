import { lazy, memo, Suspense, useCallback, useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { MAX_CART_QUANTITY } from "../data";

const ProductQuickView = lazy(() => import("./ProductQuickView"));

const ProductCard = memo(function ProductCard({
  product,
  quantity,
  wishlisted,
  onAdd,
  onChangeQuantity,
  onToggleWishlist
}) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const maxQuantityReached = quantity >= MAX_CART_QUANTITY;
  const closeQuickView = useCallback(() => setQuickViewOpen(false), []);

  return (
    <article className="product-card group relative flex min-w-0 flex-col border border-slate-200 bg-white p-3">

      <button
        type="button"
        aria-label={`${wishlisted ? "Remove" : "Add"} ${product.name} ${wishlisted ? "from" : "to"} wishlist`}
        aria-pressed={wishlisted}
        onClick={() => onToggleWishlist(product.id)}
        className={`absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm hover:text-rose-500 ${
          wishlisted ? "text-rose-500" : "text-slate-500"
        }`}
      >
        <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
      </button>

      <button
        type="button"
        onClick={() => setQuickViewOpen(true)}
        aria-label={`Quick view ${product.name}`}
        className="block w-full cursor-pointer rounded text-center text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
          {!imageLoaded && (
            <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-slate-200" />
          )}
          <img
            src={product.image}
            alt=""
            width="400"
            height="300"
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-[transform,opacity] duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="mt-3">
          <p className="truncate text-xs font-medium text-slate-600">
            {product.name}
          </p>
          <div className="mt-1 flex items-center justify-center gap-2 text-sm font-bold text-slate-900">
            <span>${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xs font-normal text-slate-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </button>

      {quantity > 0 ? (
        <div className="mt-3 flex min-h-11 items-center justify-center gap-3 rounded-md border border-slate-200">
          <button
            type="button"
            onClick={() => onChangeQuantity(product.id, quantity - 1)}
            aria-label={`Decrease ${product.name} quantity`}
            className="grid h-11 w-11 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <Minus size={15} />
          </button>
          <span aria-live="polite" className="min-w-6 text-center text-sm font-semibold text-slate-800">
            {quantity}
          </span>
          <button
            type="button"
            disabled={maxQuantityReached}
            onClick={() => onChangeQuantity(product.id, quantity + 1)}
            aria-label={`Increase ${product.name} quantity`}
            className="grid h-11 w-11 place-items-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <Plus size={15} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to cart`}
          className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-900 py-2 text-xs font-semibold text-white opacity-100 transition-opacity hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
        >
          <ShoppingCart size={14} />
          Add to cart
        </button>
      )}

      {quickViewOpen && (
        <Suspense fallback={null}>
          <ProductQuickView
            product={product}
            quantity={quantity}
            wishlisted={wishlisted}
            onAdd={onAdd}
            onToggleWishlist={onToggleWishlist}
            onClose={closeQuickView}
          />
        </Suspense>
      )}

    </article>
  );
});

function ProductSection({
  title,
  products,
  cartQuantities = {},
  wishlistIds = [],
  onAdd,
  onChangeQuantity,
  onToggleWishlist,
  columns = 5,
  deferred = false,
  shopCategory,
  shopTag
}) {

  const shopUrl = shopCategory
    ? `/shop?category=${encodeURIComponent(shopCategory)}`
    : shopTag
      ? `/shop?tag=${encodeURIComponent(shopTag)}`
      : "/shop";

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

        <Link to={shopUrl} className="text-xs font-semibold text-blue-700 hover:underline">
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
            wishlisted={wishlistIds.includes(product.id)}
            onAdd={onAdd}
            onChangeQuantity={onChangeQuantity}
            onToggleWishlist={onToggleWishlist}
          />
        ))}

      </div>

    </section>
  );
}

export default memo(ProductSection);