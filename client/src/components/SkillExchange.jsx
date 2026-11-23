import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Database,
  Globe,
  Lightbulb,
  MessageSquareText,
  Palette,
  Presentation,
  Search,
  Wrench,
} from "lucide-react";

const skills = [
  {
    title: "Java & DSA",
    description: "Coding, debugging & problem solving",
    icon: Code2,
    className: "bg-violet-50",
    iconClass: "bg-violet-100 text-violet-600",
  },
  {
    title: "DBMS & SQL",
    description: "Queries, normalization & concepts",
    icon: Database,
    className: "bg-blue-50",
    iconClass: "bg-blue-100 text-blue-600",
  },
  {
    title: "Web Development",
    description: "Frontend, React & websites",
    icon: Globe,
    className: "bg-emerald-50",
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "UI & Design",
    description: "Presentations, Canva & UI ideas",
    icon: Palette,
    className: "bg-pink-50",
    iconClass: "bg-pink-100 text-pink-600",
  },
  {
    title: "Projects",
    description: "Build, debug & improve projects",
    icon: Wrench,
    className: "bg-amber-50",
    iconClass: "bg-amber-100 text-amber-600",
  },
  {
    title: "Study Help",
    description: "Notes, concepts & exam prep",
    icon: BookOpen,
    className: "bg-indigo-50",
    iconClass: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Interview Prep",
    description: "Practice questions & guidance",
    icon: MessageSquareText,
    className: "bg-rose-50",
    iconClass: "bg-rose-100 text-rose-600",
  },
  {
    title: "Presentations",
    description: "Slides, speaking & project demos",
    icon: Presentation,
    className: "bg-orange-50",
    iconClass: "bg-orange-100 text-orange-600",
  },
];

function SkillExchange() {
  return (
    <section
      id="explore"
      className="relative overflow-hidden bg-[#fcfbff] py-24 lg:py-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-48 top-20 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl" />

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
              <span className="h-[2px] w-10 rounded-full bg-violet-600" />

              <span className="text-sm font-medium text-slate-500">
                Explore the exchange
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-[3rem] font-semibold leading-[1] tracking-[-0.04em] text-slate-950 sm:text-[3.7rem]">
              Everyone knows
              <br />
              <span className="text-violet-600">something useful.</span>
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
              From debugging a Java program to designing a presentation,
              Peerly lets students exchange the skills they already have
              with the skills they need.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-600">
              <Lightbulb size={17} />
              <span>Your skill could be someone else's solution.</span>
            </div>
          </motion.div>

        </div>


        {/* ================= SKILL BOARD ================= */}

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                className={`group relative min-h-[205px] overflow-hidden rounded-[26px] border border-slate-200/70 ${skill.className} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5`}
              >

                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${skill.iconClass}`}
                >
                  <Icon size={21} />
                </div>

                {/* Arrow */}
                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-400 opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={17} />
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-[25px] font-semibold tracking-[-0.025em] text-slate-950">
                    {skill.title}
                  </h3>

                  <p className="mt-2 max-w-[230px] text-sm leading-6 text-slate-500">
                    {skill.description}
                  </p>
                </div>

              </motion.div>
            );
          })}

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col gap-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Search size={19} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                Can't find what you need?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Describe your problem and let Peerly help find the right skill.
              </p>
            </div>

          </div>

          <button className="group flex w-fit shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800">
            Find a peer

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

        </motion.div>

      </div>
    </section>
  );
}

export default SkillExchange;