import { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";

function Header({
  cartCount,
  wishlistCount,
  search,
  setSearch,
  products
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 200);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const suggestions = useMemo(() => {
    if (!debouncedSearch) return [];
    const query = debouncedSearch.toLowerCase();
    return products
      .filter((product) => product.name.toLowerCase().includes(query))
      .slice(0, 5);
  }, [debouncedSearch, products]);

  const showSuggestions =
    suggestionsOpen &&
    Boolean(search.trim()) &&
    debouncedSearch === search.trim();

  const searchSuggestions = showSuggestions && (
    <div
      role="region"
      aria-label="Product search suggestions"
      className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
    >
      {suggestions.length > 0 ? suggestions.map((product) => (
        <button
          key={product.id}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setSearch(product.name);
            setSuggestionsOpen(false);
          }}
          className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        >
          {product.name}
        </button>
      )) : (
        <p role="status" className="px-4 py-3 text-sm text-slate-500">
          No products found. Try another search.
        </p>
      )}
    </div>
  );

  return (
    <header className="border-b border-slate-100 bg-white">

      <div className="container-wide flex h-19 items-center gap-2 max-[360px]:gap-1 min-[400px]:gap-4 md:gap-5">

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 max-[280px]:h-6 max-[280px]:w-6 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-[25px] font-black tracking-tight text-blue-700 max-[360px]:gap-1 max-[360px]:text-base"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-300 text-xl">
            🛍️
          </span>

          Flipmart
        </Link>

        <form
          className="relative ml-4 hidden flex-1 items-center rounded-md bg-slate-100 px-4 md:flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search size={19} className="text-slate-500" />

          <input
            type="search"
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSuggestionsOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setSuggestionsOpen(false);
              }
            }}
            placeholder="Search for Products, Brand and More"
            className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
          />
          {searchSuggestions}
        </form>

        <Link
          to="/vendor"
          className="hidden shrink-0 rounded-full bg-blue-700 px-6 py-3 text-xs font-semibold text-white transition hover:bg-blue-800 sm:block"
        >
          Become a Vendor
        </Link>

        <div className="ml-auto flex items-center gap-2 text-slate-600 max-[360px]:gap-1 min-[400px]:gap-4">

          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} saved items`}
            className="hidden sm:block hover:text-blue-700"
          >
            <Heart size={22} />
          </Link>

          <Link to="/account" aria-label="Account" className="hidden sm:block hover:text-blue-700">
            <UserRound size={22} />
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-slate-100 hover:text-blue-700 max-[280px]:h-5.5 max-[280px]:w-5.5"
          >
            <ShoppingBag size={22} />

            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[10px] text-white">
              {cartCount}
            </span>
          </Link>

        </div>
      </div>

      <form
        className="container-wide relative mb-3 flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-2.5 md:hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search size={18} className="shrink-0 text-slate-500" />
        <input
          type="search"
          aria-label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSuggestionsOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setSuggestionsOpen(false);
            }
          }}
          placeholder="Search products..."
          className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        {searchSuggestions}
      </form>

      {mobileOpen && (
        <nav className="container-wide flex flex-wrap gap-5 border-t border-slate-100 py-4 text-sm font-semibold text-slate-600 md:hidden">
          <Link to="/shop" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Shop</Link>
          <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Wishlist</Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Cart</Link>
          <Link to="/account" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Account</Link>
        </nav>
      )}

    </header>
  );
}

export default memo(Header);