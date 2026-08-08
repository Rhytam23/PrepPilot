"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Award, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, RefreshCw, BookOpen, BrainCircuit } from "lucide-react"
import Link from "next/link"

import { candidates } from "@/data/candidates"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EvalLog = {
  topic: string
  question: string
  isFollowUp: boolean
  answer: string
  score: {
    depth: number
    clarity: number
    communication: number
  }
  guidance: string
}

type SessionPayload = {
  candidateId: string
  logs: EvalLog[]
  metrics: {
    depth: number
    clarity: number
    communication: number
  }
  finalScore: number
  timestamp: string
}

export default function FeedbackDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const candidateId = searchParams.get("candidate") || "CAND-001"

  const [session, setSession] = React.useState<SessionPayload | null>(null)
  const [expandedIdx, setExpandedIdx] = React.useState<Record<number, boolean>>({})

  // Find candidate details
  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0]

  // Retrieve session data
  React.useEffect(() => {
    try {
      const stored = sessionStorage.getItem("preppilot_session")
      if (stored) {
        const parsed = JSON.parse(stored) as SessionPayload
        if (parsed.candidateId === candidateId) {
          setSession(parsed)
          // Default expand the first item
          setExpandedIdx({ 0: true })
        }
      }
    } catch (e) {
      console.error("Failed to parse sessionStorage payload", e)
    }
  }, [candidateId])

  const toggleExpand = (idx: number) => {
    setExpandedIdx((prev: Record<number, boolean>) => ({ ...prev, [idx]: !prev[idx] }))
  }

  // Fallback if no session found
  if (!session) {
    return (
      <div className="dark min-h-svh bg-black text-white flex flex-col justify-between">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="border-white/10 bg-zinc-950/70 p-6 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="size-12 text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Active Session Found</h2>
            <p className="text-zinc-400 text-sm mb-6">
              We couldn't retrieve any recent interview performance data for {candidate.name}. Please complete an interview first.
            </p>
            <div className="flex flex-col gap-2">
              <Link href={`/interview?candidate=${candidate.id}`}>
                <Button className="w-full bg-white text-black hover:bg-zinc-200">
                  Start New Interview
                </Button>
              </Link>
              <Link href="/candidate">
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/10 text-white">
                  Back to Candidates
                </Button>
              </Link>
            </div>
          </Card>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Helper values for generating feedback content based on scores
  const getFeedbackDetails = () => {
    const depth = session.metrics.depth
    const clarity = session.metrics.clarity
    const communication = session.metrics.communication

    let strengths: string[] = []
    let gaps: string[] = []
    let nextSteps: string[] = []

    // Evaluate Strengths
    if (depth >= 75) {
      strengths.push("Deep technical execution: Demonstrated strong understanding of core architectural parameters and trade-offs.")
    } else {
      strengths.push("Conceptual familiarity: Able to outline the high-level purpose and basic behaviors of the required tools.")
    }

    if (clarity >= 75) {
      strengths.push("Structured logical flow: Explained complex software engineering topics in a clear, step-by-step layout.")
    } else {
      strengths.push("Receptive communication: Answers were focused on the prompt and directly targeted the core question.")
    }

    if (communication >= 75) {
      strengths.push("Production readiness: Supplemented answers with concrete real-world context, scenarios, or code metrics.")
    }

    // Evaluate Gaps & Next Steps based on Candidate specialization
    if (candidate.role === "Frontend Engineer") {
      if (depth < 75) {
        gaps.push("React State boundaries: Needs to elaborate further on controlled render loops and state synchronization side effects.")
        nextSteps.push("Deep-dive React documentation regarding reconciliation, key indexes, and state scheduling.")
      }
      gaps.push("Advanced Web Vitals: Missed specific details about browser paint rendering lifecycles (LCP/CLS optimizations).")
      nextSteps.push("Study Next.js custom performance metrics, font-optimization APIs, and structural CLS debugging in Chrome DevTools.")
    } else if (candidate.role === "Backend Engineer") {
      if (depth < 75) {
        gaps.push("Distributed locks: Did not mention Redis transaction parameters or Lua scripts for atomic rate limiting checks.")
        nextSteps.push("Experiment with write atomic primitives using Redis Lua scripting or Zookeeper lease locks.")
      }
      gaps.push("Cache stampede triggers: Lacks explicit solutions to protect backend databases when cache keys drop concurrently.")
      nextSteps.push("Review cache-aside synchronization algorithms, specifically mutex locks, and distributed trace observability.")
    } else if (candidate.role === "Full Stack Engineer") {
      gaps.push("JWT Cookie parameters: Needs stronger security constraints (HttpOnly, SameSite, Secure flags) to defend auth state.")
      nextSteps.push("Implement mock Auth middleware in Next.js using custom secure HTTP cookies and csrf validation.")
      nextSteps.push("Read up on scaling persistent WebSocket connection adapters over Redis PubSub backplanes.")
    } else {
      // Software Engineer Intern
      gaps.push("Call stack mechanics: Lacks full understanding of JS task scheduling queues (microtask loop priority).")
      nextSteps.push("Create visual tracing diagrams of promise execution hierarchies vs browser timeout triggers.")
      nextSteps.push("Study basic search algorithm pointer mutations (binary boundaries log-n limits).")
    }

    // Always provide general steps
    if (nextSteps.length === 0) {
      nextSteps.push("Review intermediate system design patterns related to replication, load-balancers, and connection state.")
    }
    if (gaps.length === 0) {
      gaps.push("Edge-case exception handling: Answers could describe how systems fail under network partitions or memory starvation.")
    }

    return { strengths, gaps, nextSteps }
  }

  const feedbackDetails = getFeedbackDetails()

  return (
    <div className="dark min-h-svh bg-black text-white flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1 px-4 md:px-6 max-w-6xl mx-auto w-full py-6 flex flex-col gap-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Link href="/candidate">
              <Button variant="ghost" size="xs" className="text-zinc-400 hover:text-white border border-white/10 h-8 px-3">
                <ArrowLeft className="size-4 mr-1.5" />
                Back to Candidates
              </Button>
            </Link>
            <span className="text-zinc-500 text-xs">/</span>
            <span className="text-zinc-300 text-xs font-medium">Evaluation Report</span>
          </div>

          <div className="text-xs text-zinc-500">
            Evaluated on {new Date(session.timestamp).toLocaleDateString()}
          </div>
        </div>

        {/* Dashboard Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Performance Evaluation Report</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Readiness profile for <span className="text-white font-medium">{candidate.name}</span> &bull; {candidate.role}
            </p>
          </div>
          <Link href={`/interview?candidate=${candidate.id}`}>
            <Button size="sm" className="bg-white text-black hover:bg-zinc-200 gap-1.5 h-9 font-semibold">
              <RefreshCw className="size-3.5" />
              Retake Interview
            </Button>
          </Link>
        </div>

        {/* Main Grid: Score Summary & Dimensions */}
        <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
          {/* Radial score Dial Card */}
          <Card className="border-white/10 bg-zinc-950/70 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-6">
              Readiness Signal
            </p>
            
            <div className="relative size-32 flex items-center justify-center">
              {/* Glowing background ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/5" />
              {/* Score circle */}
              <svg className="absolute inset-0 size-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-cyan-400/20"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - session.finalScore / 100)}`}
                  className="text-cyan-400 transition-all duration-1000"
                />
              </svg>
              {/* Inner score text */}
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">{session.finalScore}%</span>
                <span className="text-[10px] uppercase text-zinc-400 mt-0.5 tracking-wider">Score</span>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 w-full">
              <p className="text-xs text-zinc-400">
                {session.finalScore >= 80 
                  ? "Highly prepared. Shows strong depth and communication." 
                  : session.finalScore >= 60 
                    ? "Moderate readiness. Solid basics with minor focus areas." 
                    : "Needs preparation. Focus on recommended next steps."}
              </p>
            </div>
          </Card>

          {/* Metrics breakdown sliders */}
          <Card className="border-white/10 bg-zinc-950/70 p-6 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-6 flex items-center gap-1.5">
              <Award className="size-4 text-cyan-400" />
              Dimension Breakdown
            </h3>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">Technical Depth</span>
                  <span className="text-cyan-300 font-semibold">{session.metrics.depth}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-cyan-400 to-emerald-400" style={{ width: `${session.metrics.depth}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">
                  Evaluates use of technical keywords, terminology accuracy, and knowledge of tradeoffs.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">Logical Clarity</span>
                  <span className="text-cyan-300 font-semibold">{session.metrics.clarity}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-cyan-400 to-white" style={{ width: `${session.metrics.clarity}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">
                  Evaluates answer structure, step-by-step layout reasoning, and syntax transition words.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">Communication Quality</span>
                  <span className="text-cyan-300 font-semibold">{session.metrics.communication}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-cyan-400 to-violet-400" style={{ width: `${session.metrics.communication}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">
                  Evaluates thoroughness, tone professionalism, and presence of concrete production examples.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Strengths & Gaps Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Strengths Card */}
          <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Observed Strengths
            </h3>
            <ul className="space-y-3">
              {feedbackDetails.strengths.map((s, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-sm text-zinc-300">
                  <span className="text-emerald-400 mt-1">&bull;</span>
                  <p className="leading-6">{s}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Gaps & Focus Areas Card */}
          <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 mb-4 flex items-center gap-2">
              <BrainCircuit className="size-4" />
              Focus Areas & Gaps
            </h3>
            <ul className="space-y-3">
              {feedbackDetails.gaps.map((g, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-sm text-zinc-300">
                  <span className="text-cyan-300 mt-1">&bull;</span>
                  <p className="leading-6">{g}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Actionable Next Steps */}
        <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-4 flex items-center gap-2">
            <BookOpen className="size-4 text-cyan-400" />
            Recommended Next Steps
          </h3>
          <ul className="space-y-3">
            {feedbackDetails.nextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-sm text-zinc-300">
                <span className="size-5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-6">{step}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Detailed Transcript Review */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            Interactive Transcript Review
            <span className="text-xs font-normal text-zinc-500">
              ({session.logs.length} answers logged)
            </span>
          </h2>

          <div className="space-y-3">
            {session.logs.map((log: EvalLog, idx: number) => {
              const isExpanded = expandedIdx[idx] || false
              const avgScore = Math.round((log.score.depth + log.score.clarity + log.score.communication) / 3)

              return (
                <Card 
                  key={idx} 
                  className={cn(
                    "border-white/10 bg-zinc-950/40 overflow-hidden transition-all duration-300",
                    isExpanded && "border-cyan-300/25 bg-zinc-950/80 shadow-lg shadow-cyan-950/10"
                  )}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/2 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <span className="text-xs font-semibold border border-white/10 bg-white/3 text-zinc-400 px-2.5 py-0.5 rounded-full w-fit">
                        {log.topic} {log.isFollowUp && "(Follow-up)"}
                      </span>
                      <span className="text-sm font-semibold text-white truncate max-w-sm md:max-w-md">
                        {log.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-xs text-zinc-400 flex items-center gap-2">
                        Turn Score
                        <span className={cn(
                          "font-bold text-sm px-1.5 py-0.5 rounded",
                          avgScore >= 80 ? "text-emerald-300 bg-emerald-300/10" : avgScore >= 60 ? "text-cyan-300 bg-cyan-300/10" : "text-zinc-400 bg-white/5"
                        )}>
                          {avgScore}%
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="size-4 text-zinc-500" /> : <ChevronDown className="size-4 text-zinc-500" />}
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-4 space-y-4 bg-black/40">
                      {/* Interviewer Question */}
                      <div className="space-y-1">
                        <p className="text-xs uppercase font-semibold text-cyan-400 tracking-wider">Interviewer Prompt</p>
                        <p className="text-sm text-zinc-300 leading-6 bg-cyan-400/2 border border-cyan-400/5 p-3 rounded-lg">
                          {log.question}
                        </p>
                      </div>

                      {/* Candidate Answer */}
                      <div className="space-y-1">
                        <p className="text-xs uppercase font-semibold text-white tracking-wider">Your Response</p>
                        <p className="text-sm text-zinc-300 leading-6 bg-white/3 border border-white/5 p-3 rounded-lg whitespace-pre-wrap italic">
                          "{log.answer}"
                        </p>
                      </div>

                      {/* Specific Turn Scores */}
                      <div className="grid gap-3 grid-cols-3 bg-zinc-950 p-3 rounded-lg border border-white/5 text-center">
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase">Depth</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.depth}%</p>
                        </div>
                        <div className="border-x border-white/10">
                          <p className="text-[10px] text-zinc-500 uppercase">Clarity</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.clarity}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase">Communication</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.communication}%</p>
                        </div>
                      </div>

                      {/* How to Improve */}
                      <div className="space-y-1">
                        <p className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">Improvement Guidance</p>
                        <p className="text-sm text-zinc-300 leading-6 bg-emerald-400/2 border border-emerald-400/5 p-3 rounded-lg">
                          {log.guidance}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
