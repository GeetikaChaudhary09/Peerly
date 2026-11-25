import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Gift,
  Sparkles,
  Wallet,
} from "lucide-react";

function PeerPoints() {
  return (
    <section
      id="peerpoints"
      className="relative overflow-hidden bg-white py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute right-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-violet-100/40 blur-3xl" />
      <div className="pointer-events-none absolute left-[-180px] bottom-10 h-[360px] w-[360px] rounded-full bg-emerald-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-8 lg:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[720px]"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10 rounded-full bg-violet-600" />
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-600">
              PeerPoints
            </span>
          </div>

          <h2 className="font-serif text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[3.7rem]">
            Your time has value.
            <br />
            <span className="text-violet-600">We put a point on it.</span>
          </h2>

          <p className="mt-6 max-w-[650px] text-[16px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
            PeerPoints make every exchange simple and fair. Help someone,
            earn points, and use those points whenever you need help yourself.
          </p>
        </motion.div>

        {/* Main visual */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* Left - point conversion */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-[30px] bg-slate-950 p-7 text-white shadow-[0_25px_70px_rgba(15,23,42,0.14)] sm:p-9">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Wallet size={21} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Your Peerly Wallet
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Earn by helping. Spend by learning.
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Available PeerPoints
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="font-serif text-6xl leading-none">
                    180
                  </span>
                  <span className="mb-1 text-sm text-slate-400">
                    points
                  </span>
                </div>
              </div>

              <div className="mt-9 space-y-3">

                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-violet-300" />
                    <span className="text-sm text-slate-300">
                      10 minutes
                    </span>
                  </div>

                  <span className="font-semibold text-white">
                    +10 pts
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-violet-300" />
                    <span className="text-sm text-slate-300">
                      30 minutes
                    </span>
                  </div>

                  <span className="font-semibold text-white">
                    +30 pts
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-violet-300" />
                    <span className="text-sm text-slate-300">
                      1 hour
                    </span>
                  </div>

                  <span className="font-semibold text-white">
                    +60 pts
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right - explanation */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-8">

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <Clock3 size={21} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Your time becomes points
                  </h3>

                  <p className="mt-2 max-w-[500px] text-sm leading-6 text-slate-500">
                    Every completed task rewards you based on the estimated
                    time. No complicated pricing and no awkward negotiations.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <Wallet size={21} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Spend them when you need help
                  </h3>

                  <p className="mt-2 max-w-[500px] text-sm leading-6 text-slate-500">
                    Need help with an assignment, project or presentation?
                    Use your PeerPoints to request help from another student.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <Gift size={21} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Save them for rewards
                  </h3>

                  <p className="mt-2 max-w-[500px] text-sm leading-6 text-slate-500">
                    Your points can also unlock rewards, perks and partner
                    offers as the Peerly ecosystem grows.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom quote */}
            <div className="mt-10 flex items-start gap-3 border-t border-slate-100 pt-7">
              <Sparkles size={18} className="mt-1 shrink-0 text-violet-600" />

              <p className="font-serif text-[19px] italic leading-7 text-slate-500">
                Help shouldn't feel like a favour.
                <br />
                <span className="font-semibold text-slate-900">
                  It should create value for both of you.
                </span>
              </p>
            </div>

          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 flex justify-center"
        >
          <button className="group flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800">
            See how PeerPoints work
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

export default PeerPoints;