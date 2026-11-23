import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Ask",
    description:
      "Post what you need help with and tell your peers what you're looking for.",
  },
  {
    number: "02",
    icon: Search,
    title: "Match",
    description:
      "Peerly finds students whose skills and experience fit your request.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Connect",
    description:
      "Work together in a private space with chat, files and everything you need.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Earn",
    description:
      "Complete the task, get it confirmed and earn PeerPoints for your time.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute right-[-180px] top-20 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-12">

        {/* ================= HEADER ================= */}

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 rounded-full bg-violet-600" />

              <span className="text-sm font-medium text-slate-500">
                How Peerly works
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-[3rem] font-semibold leading-[1] tracking-[-0.04em] text-slate-950 sm:text-[3.7rem]">
              Ask.
              <br />
              Help.
              <br />
              <span className="text-violet-600">Grow together.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:max-w-xl lg:justify-self-end"
          >
            <p className="text-[17px] leading-8 text-slate-600">
              Peerly makes it simple to exchange skills and time with
              people around you. Need help? Ask. Know something useful?
              Share it.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-600">
              <span>One simple exchange</span>
              <ArrowRight size={16} />
              <span>Real value</span>
            </div>
          </motion.div>

        </div>


        {/* ================= STEPS ================= */}

        <div className="mt-16 grid gap-0 border-y border-slate-200 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`group relative px-6 py-8 sm:px-8 lg:min-h-[300px] ${
                  index !== 3
                    ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >

                {/* Number */}
                <div className="flex items-center justify-between">

                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-violet-500">
                    {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 transition-all duration-300 group-hover:bg-violet-100 group-hover:text-violet-600">
                    <Icon size={20} />
                  </div>

                </div>


                {/* Content */}
                <div className="mt-12">

                  <h3 className="font-serif text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-[250px] text-[15px] leading-7 text-slate-500">
                    {step.description}
                  </p>

                </div>


                {/* Bottom arrow */}
                <div className="absolute bottom-7 left-6 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:left-8">
                  <ArrowRight
                    size={18}
                    className="text-violet-600"
                  />
                </div>

              </motion.div>
            );
          })}

        </div>


        {/* ================= BOTTOM MESSAGE ================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
        >

          <div>
            <p className="font-serif text-2xl italic text-slate-500">
              Your time has value.
            </p>

            <p className="mt-1 text-sm text-slate-400">
              So does what you know.
            </p>
          </div>

          <button className="group flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
            See how PeerPoints work

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </motion.div>

      </div>
    </section>
  );
}

export default HowItWorks;