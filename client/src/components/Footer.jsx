import {
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-12">

        {/* Main Footer */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-16">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                <Sparkles size={18} />
              </div>

              <span className="text-[21px] font-extrabold tracking-[-0.04em] text-slate-950">
                Peerly
              </span>
            </a>

            <p className="mt-5 max-w-[350px] text-sm leading-6 text-slate-500">
              A student-to-student community where your skills can help
              someone today — and their skills can help you tomorrow.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500">
                <Code2 size={16} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Student-built community
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-slate-950">
              Product
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="#how-it-works"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                How it works
              </a>

              <a
                href="#explore"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                Explore skills
              </a>

              <a
                href="#peerpoints"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                PeerPoints
              </a>

              <a
                href="#rewards"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                Rewards
              </a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-bold text-slate-950">
              Community
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="#ai"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                Peerly AI
              </a>

              <a
                href="#"
                className="flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-950"
              >
                Leaderboard
                <ArrowUpRight size={13} />
              </a>

              <a
                href="#"
                className="flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-950"
              >
                Community guidelines
                <ArrowUpRight size={13} />
              </a>

              <a
                href="#"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                Trust & Safety
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-slate-950">
              Company
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="#"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                About Peerly
              </a>

              <a
                href="#"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                Contact
              </a>

              <a
                href="#"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                Privacy
              </a>

              <a
                href="#"
                className="block text-sm text-slate-500 transition hover:text-slate-950"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-100 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Peerly. Built for better student communities.
          </p>

          <p>
            Your skills. Their need. One community.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;