import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";

export default function Header({
  cartCount,
  search,
  setSearch
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchInput = useRef(null);

  useEffect(() => {
    if (mobileSearchOpen) mobileSearchInput.current?.focus();
  }, [mobileSearchOpen]);

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
          className="ml-4 hidden flex-1 items-center rounded-md bg-slate-100 px-4 md:flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search size={19} className="text-slate-500" />

          <input
            type="search"
            aria-label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for Products, Brand and More"
            className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
          />
        </form>

        <Link
          to="/shop"
          className="hidden shrink-0 rounded-full bg-blue-700 px-6 py-3 text-xs font-semibold text-white transition hover:bg-blue-800 sm:block"
        >
          Become a Vendor
        </Link>

        <div className="ml-auto flex items-center gap-2 text-slate-600 max-[360px]:gap-1 min-[400px]:gap-4">

          <button
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg hover:bg-slate-100 max-[280px]:h-5.5 max-[280px]:w-5.5 md:hidden"
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search"
            onClick={() => setMobileSearchOpen((open) => !open)}
          >
            {mobileSearchOpen ? <X size={21} /> : <Search size={21} />}
          </button>

          <Link to="/offers" aria-label="Wishlist" className="hidden sm:block hover:text-blue-700">
            <Heart size={22} />
          </Link>

          <Link to="/account" aria-label="Account" className="hidden sm:block hover:text-blue-700">
            <UserRound size={22} />
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-slate-100 hover:text-blue-700 max-[280px]:h-[22px] max-[280px]:w-[22px]"
          >
            <ShoppingBag size={22} />

            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-blue-700 px-1 text-[10px] text-white">
              {cartCount}
            </span>
          </Link>

        </div>
      </div>

      <div
        id="mobile-search"
        aria-hidden={!mobileSearchOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          mobileSearchOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <form
            className="container-wide flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-2.5"
            onSubmit={(e) => e.preventDefault()}
          >
            <Search size={18} className="shrink-0 text-slate-500" />
            <input
              ref={mobileSearchInput}
              type="search"
              aria-label="Search products"
              tabIndex={mobileSearchOpen ? 0 : -1}
              disabled={!mobileSearchOpen}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </form>
        </div>
      </div>

      {mobileOpen && (
        <nav className="container-wide flex gap-5 border-t border-slate-100 py-4 text-sm font-semibold text-slate-600 md:hidden">
          <Link to="/shop" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Shop</Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Cart</Link>
          <Link to="/account" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Account</Link>
        </nav>
      )}

    </header>
  );
}