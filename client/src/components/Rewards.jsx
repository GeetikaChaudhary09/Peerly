import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  Gift,
  Headphones,
  Sparkles,
} from "lucide-react";

const rewards = [
  {
    icon: Coffee,
    title: "Campus Perks",
    description: "Small treats and everyday perks for your helpful moments.",
    points: "50+ pts",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: BookOpen,
    title: "Learning Boosts",
    description: "Use your points toward learning resources and useful tools.",
    points: "100+ pts",
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Headphones,
    title: "Digital Goodies",
    description: "Unlock digital perks that make student life a little easier.",
    points: "150+ pts",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

function Rewards() {
  return (
    <section
      id="rewards"
      className="relative overflow-hidden bg-[#fcfbff] py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute left-[-160px] top-24 h-[380px] w-[380px] rounded-full bg-violet-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-0 h-[420px] w-[420px] rounded-full bg-amber-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-8 lg:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <Gift size={17} className="text-violet-600" />

            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-600">
              Rewards
            </span>
          </div>

          <h2 className="font-serif text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[3.7rem]">
            Good deeds deserve
            <br />
            <span className="text-violet-600">good perks.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
            Turn the PeerPoints you earn into things that make student life
            better — from everyday perks to learning experiences.
          </p>
        </motion.div>

        {/* Reward cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">

          {rewards.map((reward, index) => {
            const Icon = reward.icon;

            return (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className={`group relative overflow-hidden rounded-[28px] ${reward.bg} p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/5`}
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${reward.iconBg} ${reward.iconColor}`}
                  >
                    <Icon size={21} />
                  </div>

                  <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600">
                    {reward.points}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold tracking-[-0.02em] text-slate-950">
                    {reward.title}
                  </h3>

                  <p className="mt-3 max-w-[330px] text-sm leading-6 text-slate-600">
                    {reward.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  Explore rewards

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

                {/* Decorative circle */}
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full border-[18px] border-white/30" />
              </motion.div>
            );
          })}

        </div>

        {/* Bottom feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-between gap-6 rounded-[28px] border border-slate-200 bg-white px-7 py-7 shadow-sm sm:flex-row sm:px-9"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Sparkles size={19} />
            </div>

            <div>
              <p className="font-semibold text-slate-950">
                More rewards, as Peerly grows.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                The reward ecosystem will grow alongside the student
                community.
              </p>
            </div>
          </div>

          <button className="group flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800">
            View rewards
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

export default Rewards;