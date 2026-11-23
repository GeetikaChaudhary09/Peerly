import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Heart,
  Users,
  Zap,
} from "lucide-react";

import campusImage from "../assets/peerly-campus.png";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fcfbff] pt-[86px]">

      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[220px] h-[420px] w-[420px] rounded-full bg-violet-100/40 blur-3xl" />

      <div className="pointer-events-none absolute right-[-180px] top-[120px] h-[450px] w-[450px] rounded-full bg-indigo-100/30 blur-3xl" />

      {/* ================= HERO CONTENT ================= */}

      <div className="relative mx-auto max-w-[1440px] px-8 lg:px-12">

        <div className="grid min-h-[650px] items-center lg:grid-cols-[0.88fr_1.12fr]">

          {/* ================= LEFT ================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 py-14 lg:pr-6"
          >

            {/* Small tagline */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-[2px] w-10 rounded-full bg-violet-600" />

              <span className="text-[15px] font-medium text-slate-500">
                Same campus. New possibilities.
              </span>
            </div>

            {/* Main heading */}
            <h1 className="max-w-[610px] font-serif text-[3.5rem] font-semibold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-[4rem] lg:text-[4.35rem]">

              Students helping
              <br />

              students build
              <br />

              <span className="relative inline-block text-violet-600">

                brighter

                {/* underline */}
                <svg
                  className="absolute -bottom-2 left-0 h-4 w-full"
                  viewBox="0 0 250 18"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 10C65 17 145 3 247 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>

              </span>{" "}

              tomorrows.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[590px] text-[16px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
              Ask for help. Share what you know. Earn PeerPoints.
              Because every student has something to teach and
              something to learn.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex items-center gap-3">

              <button className="group flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800">

                Find Help

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

              <button className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">

                Start Helping

              </button>

            </div>

            {/* Impact quote */}
            <div className="mt-8 flex items-start gap-3">

              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                className="mt-1 shrink-0 text-violet-600"
              >
                <path
                  d="M35 4C25 8 15 16 12 28M12 28L8 20M12 28L21 26"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="font-serif text-[18px] italic leading-6 text-slate-500">
                Small help.
                <br />

                <span className="font-semibold text-violet-600">
                  Big campus impact.
                </span>
              </div>

            </div>

            {/* Avatar / community line */}
            <div className="mt-7 flex items-center gap-4">

              <div className="flex -space-x-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-violet-200 text-xs font-semibold text-violet-700">
                  A
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-semibold text-blue-700">
                  R
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-xs font-semibold text-amber-700">
                  S
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-xs font-semibold text-emerald-700">
                  K
                </div>

              </div>

              <div className="h-8 w-px bg-slate-200" />

              <p className="text-sm leading-5 text-slate-500">
                A kinder, smarter
                <br />
                campus starts with you.
              </p>

            </div>

          </motion.div>


          {/* ================= RIGHT IMAGE ================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex h-full items-center justify-end"
          >

            <div className="relative w-full max-w-[800px] translate-x-3">

              <img
                src={campusImage}
                alt="Students collaborating together on campus"
                className="block w-full rounded-[38px] object-cover"
              />

            </div>

          </motion.div>

        </div>
      </div>


      {/* ================= FEATURE BAR ================= */}

      <div className="relative border-t border-slate-200 bg-white">

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Learn Together */}
          <div className="flex items-center gap-4 border-b border-slate-100 px-8 py-6 sm:border-r lg:border-b-0">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Users size={21} />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-slate-900">
                Learn Together
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Real students. Real support.
              </p>
            </div>

          </div>


          {/* Earn PeerPoints */}
          <div className="flex items-center gap-4 border-b border-slate-100 px-8 py-6 lg:border-b-0 lg:border-r">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Zap size={21} />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-slate-900">
                Earn PeerPoints
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Turn your skills into rewards.
              </p>
            </div>

          </div>


          {/* Network */}
          <div className="flex items-center gap-4 border-b border-slate-100 px-8 py-6 sm:border-r lg:border-b-0">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
              <Heart size={21} />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-slate-900">
                Build Your Network
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Meaningful peer connections.
              </p>
            </div>

          </div>


          {/* Grow */}
          <div className="flex items-center gap-4 px-8 py-6">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <GraduationCap size={21} />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-slate-900">
                Grow Beyond Grades
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Skills for life, not just exams.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;