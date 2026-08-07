"use client"

import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  MessageSquareMore,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FeatureCard } from "@/components/shared/feature-card"
import { HeroPreview } from "@/components/shared/hero-preview"
import { StepCard } from "@/components/shared/step-card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Personalized Interviews",
    description:
      "Practice sessions align with the candidate profile, target role, and technical focus areas.",
    icon: BrainCircuit,
  },
  {
    title: "Adaptive Follow-up Questions",
    description:
      "Interviews evolve naturally with deeper prompts based on each response.",
    icon: MessageSquareMore,
  },
  {
    title: "AI Feedback",
    description:
      "Receive concise feedback that highlights strengths, gaps, and next steps.",
    icon: Sparkles,
  },
  {
    title: "Performance Analytics",
    description:
      "Track interview readiness across communication, problem solving, and execution.",
    icon: BarChart3,
  },
]

const steps = [
  {
    title: "Select Candidate",
    description:
      "Choose the candidate profile and interview track for the session.",
  },
  {
    title: "Start Interview",
    description:
      "Begin a focused technical interview with structured AI guidance.",
  },
  {
    title: "Answer Questions",
    description:
      "Work through realistic prompts while the session adapts to your answers.",
  },
  {
    title: "Receive AI Feedback",
    description:
      "Review a clear summary of performance signals and improvement areas.",
  },
]

export default function HomePage() {
  return (
    <div className="dark min-h-svh bg-black text-white">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pb-28 sm:pt-28">
          <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_56%)]" />
          <div className="animate-glow-drift absolute left-1/2 top-16 -z-10 h-48 w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/20 via-white/10 to-emerald-300/20 blur-3xl" />
          <div className="mx-auto max-w-5xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mx-auto mb-7 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200 shadow-lg shadow-cyan-950/20"
            >
              PrepPilot
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
              className="mx-auto max-w-4xl text-balance text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              Ace Your Next Technical Interview with AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
              className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-400 sm:text-lg"
            >
              PrepPilot helps candidates practice realistic technical
              interviews, sharpen answers, and turn feedback into measurable
              progress.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/candidate"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full border border-white/10 bg-white px-5 text-black shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-cyan-500/20 sm:w-auto"
                )}
              >
                Start Interview
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#how-it-works"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 w-full border-white/15 bg-white/[0.03] px-5 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
                )}
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          <HeroPreview />
        </section>

        <section id="features" className="border-t border-white/10 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-300">Features</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Built for focused interview preparation
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-400">
                A clean practice loop for technical candidates who want sharper
                answers and better interview signal.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-white/10 bg-zinc-950 px-6 py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-300">How It Works</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                From setup to feedback in four steps
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <StepCard
                  key={step.title}
                  index={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
