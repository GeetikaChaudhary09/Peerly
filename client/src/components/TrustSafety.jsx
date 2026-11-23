import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Lock,
  MessageSquare,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Verified student profiles",
    description:
      "Build trust with profiles that show skills, activity and completed exchanges.",
  },
  {
    icon: MessageSquare,
    title: "Safer peer communication",
    description:
      "Keep conversations and task details inside the Peerly workspace.",
  },
  {
    icon: Lock,
    title: "Protected exchanges",
    description:
      "PeerPoints stay connected to the task until the exchange is completed.",
  },
  {
    icon: AlertTriangle,
    title: "Report & dispute support",
    description:
      "Problems can be reported with conversation history and task evidence.",
  },
];

function TrustSafety() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-28">
      <div className="pointer-events-none absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-0 h-[420px] w-[420px] rounded-full bg-indigo-700/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-8 lg:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[760px]"
        >
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck size={18} className="text-violet-300" />

            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-300">
              Trust & Safety
            </span>
          </div>

          <h2 className="font-serif text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[3.7rem]">
            A community built on
            <br />
            <span className="text-violet-300">trust, not guesswork.</span>
          </h2>

          <p className="mt-6 max-w-[650px] text-[16px] leading-7 text-slate-300 sm:text-[17px] sm:leading-8">
            Peerly is designed to make student-to-student exchanges feel
            transparent, accountable and comfortable from the first message
            to the final PeerPoints transfer.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* Safety visual */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[30px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl sm:p-8"
          >
            {/* Profile */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-200 text-sm font-bold text-violet-700">
                  A
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">
                      Peerly Member
                    </p>

                    <CheckCircle2
                      size={15}
                      className="text-emerald-400"
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Java & DSA · 24 completed exchanges
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-1.5 sm:flex">
                <Star
                  size={15}
                  className="fill-amber-400 text-amber-400"
                />
                <span className="text-sm font-semibold text-white">
                  4.9
                </span>
              </div>
            </div>

            {/* Task status */}
            <div className="mt-6 rounded-2xl bg-white/[0.06] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                    Active exchange
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    Java OOP Viva Prep
                  </p>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                  In progress
                </span>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-violet-400" />
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-500">
                <span>Task accepted</span>
                <span>72% complete</span>
              </div>
            </div>

            {/* Protection */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-emerald-400/10 p-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Lock size={16} />
                  <span className="text-xs font-semibold">
                    Points protected
                  </span>
                </div>

                <p className="mt-3 text-xl font-bold text-white">
                  30 pts
                </p>
              </div>

              <div className="rounded-2xl bg-violet-400/10 p-4">
                <div className="flex items-center gap-2 text-violet-300">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-semibold">
                    Exchange tracked
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  Chat + files + status
                </p>
              </div>
            </div>

            {/* Evidence */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <MessageSquare size={16} className="text-slate-300" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Everything stays connected to the task
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Helpful context is available if something goes wrong.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-7">
              {safetyFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-violet-300">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-2 max-w-[500px] text-sm leading-6 text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom note */}
            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="font-serif text-[19px] italic leading-7 text-slate-400">
                The goal isn't just to connect students.
                <br />
                <span className="font-semibold text-white">
                  It's to make those connections worth trusting.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TrustSafety;