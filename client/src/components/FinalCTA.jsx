import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#fcfbff] px-8 py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/50 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[36px] bg-slate-950 px-7 py-16 text-center shadow-[0_30px_90px_rgba(15,23,42,0.16)] sm:px-12 lg:px-20 lg:py-20"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-violet-300">
            <Sparkles size={21} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-violet-300">
            Your campus. Your community.
          </p>

          <h2 className="mx-auto mt-5 max-w-[760px] font-serif text-[2.8rem] font-semibold leading-[1.03] tracking-[-0.04em] text-white sm:text-[3.8rem]">
            Someone on your campus
            <br />
            can help.
          </h2>

          <p className="mx-auto mt-6 max-w-[600px] text-[16px] leading-7 text-slate-400 sm:text-[17px] sm:leading-8">
            And there is probably something you know that someone else needs.
            Start your first exchange with Peerly.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100">
              Get started with Peerly

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:text-white">
              Explore how it works
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Built for students, by students.
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default FinalCTA;