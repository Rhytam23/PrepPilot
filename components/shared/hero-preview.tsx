 "use client"

import { Bot, Mic2, Sparkles, UserRound } from "lucide-react"
import { motion } from "framer-motion"

const messages = [
  {
    speaker: "AI Interviewer",
    label: "Question",
    text: "Explain how you would design a distributed rate limiter.",
    icon: Bot,
    tone: "cyan",
  },
  {
    speaker: "Candidate",
    label: "Candidate Answer",
    text: "I would use Redis with a token bucket algorithm...",
    icon: UserRound,
    tone: "white",
  },
  {
    speaker: "AI Interviewer",
    label: "AI Follow-up",
    text: "How would your design handle multi-region deployments?",
    icon: Sparkles,
    tone: "emerald",
  },
]

export function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.32, ease: "easeOut" }}
      className="relative mx-auto mt-16 w-full max-w-5xl rounded-lg border border-white/10 bg-zinc-950/85 p-3 shadow-2xl shadow-cyan-950/30"
    >
      <div className="absolute -inset-px -z-10 rounded-lg bg-gradient-to-r from-cyan-400/20 via-white/10 to-emerald-300/20 blur-xl" />
      <div className="rounded-md border border-white/10 bg-black/95">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-yellow-300" />
            <span className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Live AI Interview
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-4 border-white/10 p-4 sm:p-6 lg:border-r">
            {messages.map((message, index) => {
              const Icon = message.icon
              const isCandidate = message.speaker === "Candidate"

              return (
                <motion.article
                  key={message.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.48 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className={`rounded-lg border p-4 shadow-2xl shadow-black/20 ${
                    isCandidate
                      ? "ml-auto border-white/10 bg-white/[0.06]"
                      : message.tone === "emerald"
                        ? "border-emerald-300/20 bg-emerald-300/[0.07]"
                        : "border-cyan-300/20 bg-cyan-300/[0.07]"
                  } max-w-[42rem]`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-9 items-center justify-center rounded-lg border ${
                        isCandidate
                          ? "border-white/10 bg-white/10 text-white"
                          : message.tone === "emerald"
                            ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
                            : "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {message.speaker}
                      </p>
                      <p className="text-xs text-zinc-500">{message.label}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-7 text-zinc-100">
                    {message.text}
                  </p>
                </motion.article>
              )
            })}
          </div>

          <div className="p-4 sm:p-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Mic2 className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Session Signal
                  </p>
                  <p className="text-xs text-zinc-500">Systems design round</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Depth</span>
                    <span className="text-cyan-200">Strong</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Clarity</span>
                    <span className="text-cyan-200">Improving</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-300 to-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Next Focus
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Explain consistency, latency, and failover tradeoffs across
                regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
