import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  MessageCircle,
  Search,
  Sparkles,
  Wallet,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Post a request",
    description:
      "Tell Peerly what you need help with, how much time it may take, and add any useful files.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Find your match",
    description:
      "Peerly understands your request and surfaces students with relevant skills and experience.",
    icon: Search,
  },
  {
    number: "03",
    title: "Work together",
    description:
      "Once accepted, a private workspace opens where both students can communicate and share files.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Complete & earn",
    description:
      "When the task is confirmed, PeerPoints are released to the student who helped.",
    icon: Wallet,
  },
];

function PeerlyExchange() {
  return (
    <section
      id="exchange"
      className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12">

        {/* ================= HEADER ================= */}

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 rounded-full bg-violet-400" />

              <span className="text-sm font-medium text-slate-400">
                The Peerly Exchange
              </span>
            </div>

            <h2 className="max-w-2xl font-serif text-[3rem] font-semibold leading-[1] tracking-[-0.04em] sm:text-[3.8rem]">
              Your time becomes
              <br />
              <span className="text-violet-400">something valuable.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-[17px] leading-8 text-slate-400 lg:justify-self-end"
          >
            Peerly turns everyday student-to-student help into a simple
            exchange. Ask when you need it, help when you can, and get
            something meaningful back for your time.
          </motion.p>

        </div>


        {/* ================= EXCHANGE VISUAL ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">

            {/* top labels */}
            <div className="mb-10 flex items-center justify-between">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                How one exchange works
              </p>

              <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Simple. Secure. Peer-powered.
              </div>

            </div>


            {/* Flow */}
            <div className="grid gap-4 lg:grid-cols-5 lg:items-center">

              {/* Request card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-mono font-semibold tracking-wider text-violet-400">
                    YOU NEED
                  </span>

                  <MessageCircle
                    size={18}
                    className="text-slate-500"
                  />

                </div>

                <h3 className="mt-6 font-serif text-2xl">
                  Help with Java OOP
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Need help understanding inheritance and interfaces.
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-400">
                    30 minutes
                  </span>

                  <span className="font-semibold text-violet-400">
                    30 pts
                  </span>

                </div>

              </div>


              {/* Arrow */}
              <div className="hidden justify-center lg:flex">
                <ArrowRight
                  size={24}
                  className="text-violet-400"
                />
              </div>


              {/* Match */}
              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-mono font-semibold tracking-wider text-violet-300">
                    PEERLY AI
                  </span>

                  <Sparkles
                    size={18}
                    className="text-violet-400"
                  />

                </div>

                <h3 className="mt-6 font-serif text-2xl">
                  Smart Match
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Finds peers based on skills, ratings and task fit.
                </p>

                <div className="mt-5 flex items-center gap-2">

                  <div className="flex -space-x-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-violet-200 text-xs font-semibold text-violet-700">
                      A
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-100 text-xs font-semibold text-blue-700">
                      R
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-100 text-xs font-semibold text-emerald-700">
                      S
                    </div>

                  </div>

                  <span className="text-xs text-slate-500">
                    Suitable peers found
                  </span>

                </div>

              </div>


              {/* Arrow */}
              <div className="hidden justify-center lg:flex">
                <ArrowRight
                  size={24}
                  className="text-violet-400"
                />
              </div>


              {/* Completion */}
              <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400">
                    COMPLETED
                  </span>

                  <CheckCircle2
                    size={18}
                    className="text-emerald-400"
                  />

                </div>

                <h3 className="mt-6 font-serif text-2xl">
                  +30 PeerPoints
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  The task is confirmed and the points are released.
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs text-emerald-400">

                  <Check size={14} />

                  Exchange complete

                </div>

              </div>

            </div>


            {/* Bottom statement */}
            <div className="mt-8 border-t border-white/10 pt-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <p className="max-w-xl font-serif text-xl italic text-slate-400">
                  Help someone today. Someone might help you tomorrow.
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                  Powered by your campus community
                </div>

              </div>

            </div>

          </div>

        </motion.div>


        {/* ================= FOUR STEPS ================= */}

        <div className="mt-16 grid gap-0 border-y border-white/10 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className={`px-5 py-8 sm:px-7 ${
                  index !== 3
                    ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-violet-400">
                    {step.number}
                  </span>

                  <Icon
                    size={19}
                    className="text-slate-600"
                  />

                </div>

                <h3 className="mt-8 font-serif text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default PeerlyExchange;