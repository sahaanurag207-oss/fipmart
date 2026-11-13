import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
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

          <div className="relative z-20 mr-auto w-[43%] bg-[#9c7050] p-3 md:mr-0 md:ml-0 md:w-auto md:bg-transparent md:p-0">

            <p className="text-4xl font-black leading-none text-white md:text-5xl">
              70%
              <br />
              OFF
            </p>

            <Link to="/shop" className="mt-4 inline-flex items-center gap-2 border-2 border-white bg-white px-3 py-2 text-xs font-bold text-[#674b2d] hover:bg-slate-100 md:px-4">
              ORDER NOW
              <ArrowRight size={14} />
            </Link>

          </div>

          <img
            src="/images/photo-1584917865442-de89df76afd3.webp"
            alt="Red handbag"
            width="700"
            height="700"
            fetchPriority="high"
            className="absolute bottom-0 right-[22%] h-[88%] w-[44%] object-contain object-bottom drop-shadow-2xl md:right-[23%] md:w-[36%]"
          />

          <img
            src="/images/photo-1590874103328-eac38a683ce7.webp"
            alt="Fashion handbag"
            width="500"
            height="600"
            fetchPriority="high"
            className="absolute bottom-0 right-[1%] hidden h-[82%] w-[24%] object-contain object-bottom md:block"
          />

        </div>

      </div>

    </section>
  );
}

export default memo(Hero);