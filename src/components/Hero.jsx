import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="container-wide relative my-4 min-h-62.5 overflow-hidden bg-[#b99b6c] md:min-h-72.5">

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,#fff_39%,#b99b6c_39%,#b99b6c_100%)]" />

      <div className="relative grid min-h-62.5 grid-cols-1 items-center md:min-h-72.5 md:grid-cols-[42%_58%]">

        <div className="z-10 px-7 py-8 text-center md:px-10 md:text-left">

          <p className="text-sm font-extrabold tracking-[.18em] text-slate-900">
            EXCLUSIVE
          </p>

          <h1 className="mt-1 text-4xl font-black leading-[.98] text-[#b99b6c] md:text-5xl">
            COLLECTION
          </h1>

          <div className="mt-5 flex items-center justify-center gap-2 md:justify-start">
            <span className="h-1.5 w-8 bg-black" />
            <span className="h-1.5 w-3 bg-black" />
            <span className="h-1.5 w-3 bg-black" />
          </div>

        </div>

        <div className="relative flex min-h-55 items-center justify-center overflow-hidden px-5 py-5 md:min-h-72.5">

          <div className="absolute left-5 top-8 text-5xl font-black text-white/70">
            70%
          </div>

          <div className="z-10 mr-auto md:mr-0 md:ml-0">

            <p className="text-4xl font-black leading-none text-white md:text-5xl">
              70%
              <br />
              OFF
            </p>

            <Link to="/shop" className="mt-4 flex items-center gap-2 border-2 border-white px-4 py-2 text-xs font-bold text-white hover:bg-white hover:text-[#94774b]">
              ORDER NOW
              <ArrowRight size={14} />
            </Link>

          </div>

          <img
            src="/images/photo-1584917865442-de89df76afd3.webp"
            alt="Black handbag"
            className="absolute bottom-0 right-[3%] h-[88%] w-[52%] object-contain object-bottom drop-shadow-2xl md:right-[7%] md:w-[48%]"
          />

          <img
            src="/images/photo-1590874103328-eac38a683ce7.webp"
            alt="Fashion handbag"
            className="absolute bottom-0 right-0 hidden h-[82%] w-[26%] object-contain object-bottom md:block"
          />

        </div>

      </div>

    </section>
  );
}