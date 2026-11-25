import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Clock3,
  Sparkles,
  Users,
} from "lucide-react";

function AIAssistant() {
  return (
    <section id="ai" className="relative overflow-hidden bg-[#fcfbff] py-24 lg:py-28">
      {/* Background accents */}
      <div className="pointer-events-none absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-violet-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-180px] bottom-10 h-[420px] w-[420px] rounded-full bg-indigo-100/30 blur-3xl" />

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
            <Sparkles size={17} className="text-violet-600" />
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-600">
              Meet Peerly AI
            </span>
          </div>

          <h2 className="font-serif text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[3.5rem]">
            Not sure what you need?
            <br />
            <span className="text-violet-600">Just tell Peerly.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
            Peerly AI understands your request, figures out what kind of
            help you need, and helps you find the right peer faster.
          </p>
        </motion.div>

        {/* Main AI experience */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-20">

          {/* Conversation */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-7">

              {/* AI header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Bot size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      Peerly AI
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Your campus help assistant
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ready
                </div>
              </div>

              {/* User message */}
              <div className="mt-7 flex justify-end">
                <div className="max-w-[430px] rounded-2xl rounded-br-md bg-slate-950 px-5 py-4 text-[14px] leading-6 text-white">
                  I have my Java viva tomorrow and I'm struggling with
                  OOP concepts. Can someone explain them to me?
                </div>
              </div>

              {/* AI response */}
              <div className="mt-5 flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Sparkles size={16} />
                </div>

                <div className="max-w-[500px]">
                  <p className="text-[14px] leading-6 text-slate-600">
                    Got it! You need help with{" "}
                    <span className="font-semibold text-slate-900">
                      Java OOP
                    </span>{" "}
                    for an upcoming viva. I found the best way to frame this
                    request:
                  </p>

                  {/* AI analysis */}
                  <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                        Java & DSA
                      </span>

                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                        OOP
                      </span>

                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                        Viva Prep
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">

                      <div className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-3">
                        <Clock3 size={17} className="text-violet-600" />

                        <div>
                          <p className="text-[11px] font-medium text-slate-400">
                            Suggested time
                          </p>
                          <p className="text-sm font-bold text-slate-900">
                            30 minutes
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-3">
                        <Users size={17} className="text-violet-600" />

                        <div>
                          <p className="text-[11px] font-medium text-slate-400">
                            Best match
                          </p>
                          <p className="text-sm font-bold text-slate-900">
                            OOP Mentor
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Check size={14} className="text-emerald-500" />
                    Request ready to post
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="mt-7 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <div className="flex-1 px-3 text-sm text-slate-400">
                  Tell Peerly what you need help with...
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800">
                  <ArrowRight size={17} />
                </button>
              </div>

            </div>
          </motion.div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-600">
              From confusion to connection
            </p>

            <h3 className="mt-4 max-w-[520px] font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-950">
              You don't need to know exactly what to ask.
            </h3>

            <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-slate-600">
              Explain your problem naturally. Peerly AI turns your words into
              a clear request and helps connect you with someone who can
              actually help.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Sparkles size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Understands your request
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Extracts the skill, topic and type of help you actually
                    need.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Suggests a fair duration
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Estimates the time needed so PeerPoints stay transparent
                    and fair.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-500">
                  <Users size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Finds the right peer
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Matches your request with students whose skills fit the
                    task.
                  </p>
                </div>
              </div>

            </div>

            <button className="group mt-9 flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-violet-600">
              Discover how Peerly AI works
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default AIAssistant;