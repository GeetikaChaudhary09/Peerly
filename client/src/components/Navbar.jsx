import { ArrowRight, Sparkles } from "lucide-react";

function Navbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <nav className="mx-auto flex h-[86px] w-full max-w-[1440px] items-center justify-between px-8 lg:px-12">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md">
            <Sparkles size={18} />
          </div>

          <span className="text-[21px] font-extrabold tracking-[-0.04em] text-slate-950">
            Peerly
          </span>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#how-it-works"
            className="text-[15px] font-medium text-slate-600 transition hover:text-slate-950"
          >
            How it works
          </a>

          <a
            href="#explore"
            className="text-[15px] font-medium text-slate-600 transition hover:text-slate-950"
          >
            Explore
          </a>

          <a
            href="#rewards"
            className="text-[15px] font-medium text-slate-600 transition hover:text-slate-950"
          >
            Rewards
          </a>

          <a
            href="#ai"
            className="text-[15px] font-medium text-slate-600 transition hover:text-slate-950"
          >
            AI Assistant
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="hidden px-3 py-2 text-[15px] font-semibold text-slate-700 transition hover:text-slate-950 sm:block">
            Log in
          </button>

          <button className="group flex items-center gap-3 rounded-xl bg-slate-950 px-5 py-3 text-[14px] font-semibold text-white shadow-lg shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800">
            Get started

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;