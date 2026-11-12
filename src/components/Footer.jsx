import { Link } from "react-router-dom";

import {
  Globe,
  Camera,
  Send
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 bg-slate-950 pb-20 text-slate-300 sm:pb-0">

      <div className="container-wide grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">

        <div>

          <p className="text-2xl font-black text-white">
            Flipmart<span className="text-amber-400">.</span>
          </p>

          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
            A little something for every part of your life.
            Shop fashion, electronics and everyday essentials.
          </p>

          <div className="mt-4 flex gap-3">
            <Globe size={18} />
            <Camera size={18} />
            <Send size={18} />
          </div>

        </div>

        <div>
          <h3 className="font-bold text-white">
            Quick links
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-white">About us</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/offers" className="hover:text-white">Offers</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">
            Customer service
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link to="/account" className="hover:text-white">My account</Link></li>
            <li><Link to="/track-order" className="hover:text-white">Track order</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns & refunds</Link></li>
            <li><Link to="/faqs" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">
            Stay in the loop
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            Get updates on new arrivals and special offers.
          </p>

          <form
            className="mt-3 flex"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-white px-3 py-3 text-sm text-slate-900 outline-none"
            />

            <button className="bg-blue-700 px-4 text-sm font-semibold text-white">
              Join
            </button>
          </form>

        </div>

      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Flipmart. All rights reserved.
      </div>

    </footer>
  );
}