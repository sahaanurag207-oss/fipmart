import { memo } from "react";
import { Plane } from "lucide-react";

function SideAd() {
  return (
    <aside className="relative flex min-h-75 flex-col items-center justify-center overflow-hidden bg-blue-800 px-4 py-7 text-center text-white">

      <Plane
        className="absolute right-2 top-3 rotate-[-18deg] text-white/80"
        size={54}
      />

      <p className="text-xs font-bold tracking-[.25em] text-amber-300">
        TRAVEL MORE
      </p>

      <p className="mt-5 text-4xl font-black uppercase leading-[.95] tracking-tight">
        Flight
        <br />
        Ticket
      </p>

      <span className="mt-5 bg-amber-400 px-4 py-2 text-lg font-black text-blue-950">
        40% OFF
      </span>

      <button className="mt-6 border border-white px-4 py-2 text-[10px] font-bold tracking-wider hover:bg-white hover:text-blue-900">
        BOOK NOW
      </button>

      <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full border-18 border-white/10" />

    </aside>
  );
}

export default memo(SideAd);