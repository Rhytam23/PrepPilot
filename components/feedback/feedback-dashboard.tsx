"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Award, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, RefreshCw, BookOpen, BrainCircuit, ShieldAlert, Cpu, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"

import { candidates } from "@/data/candidates"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { EvalLog, SessionPayload } from "@/types/candidate"

export default function FeedbackDashboard() {
  const searchParams = useSearchParams()
  const candidateId = searchParams.get("candidate") || "CAND-001"

  // Load initial session state safely from sessionStorage on mount (React 19 compliant)
  const [session, setSession] = React.useState<SessionPayload | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const stored = sessionStorage.getItem("preppilot_session")
      if (stored) {
        const parsed = JSON.parse(stored) as SessionPayload
        if (parsed.candidateId === candidateId) {
          return parsed
        }
      }
    } catch (e) {
      console.error("Failed to parse sessionStorage payload", e)
    }
    return null
  })

  // Load historical progression sessions from localStorage (React 19 compliant)
  const [history, setHistory] = React.useState<SessionPayload[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const historyJson = localStorage.getItem("preppilot_history")
      if (historyJson) {
        const parsed = JSON.parse(historyJson) as SessionPayload[]
        return parsed.filter(h => h.candidateId === candidateId)
      }
    } catch (e) {
      console.error("Failed to load history:", e)
    }
    return []
  })

  const [expandedIdx, setExpandedIdx] = React.useState<Record<number, boolean>>({ 0: true })

  // Find candidate details
  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0]

  // Track candidateId parameter changes in render phase (React 19 compliant)
  const [prevCandidateId, setPrevCandidateId] = React.useState(candidateId)
  if (candidateId !== prevCandidateId) {
    setPrevCandidateId(candidateId)
    
    // Sync session state
    let newSession: SessionPayload | null = null
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("preppilot_session")
        if (stored) {
          const parsed = JSON.parse(stored) as SessionPayload
          if (parsed.candidateId === candidateId) {
            newSession = parsed
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
    setSession(newSession)
    
    // Sync history state
    let newHistory: SessionPayload[] = []
    if (typeof window !== "undefined") {
      try {
        const historyJson = localStorage.getItem("preppilot_history")
        if (historyJson) {
          const parsed = JSON.parse(historyJson) as SessionPayload[]
          newHistory = parsed.filter(h => h.candidateId === candidateId)
        }
      } catch (e) {
        console.error(e)
      }
    }
    setHistory(newHistory)
    
    setExpandedIdx({ 0: true })
  }

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
              We couldn&apos;t retrieve any recent interview performance data for {candidate.name}. Please complete an interview first.
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
    const reasoning = session.metrics.reasoning

    const strengths: string[] = []
    const gaps: string[] = []
    const nextSteps: string[] = []

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
    
    if (reasoning >= 75) {
      strengths.push("Strong Analytical Reasoning: Solved architectural trade-offs systematically and explained why competing options were ruled out.")
    }

    // Evaluate Gaps & Next Steps based on Candidate specialization
    if (candidate.role === "Frontend Engineer" || session.role.toLowerCase().includes("frontend")) {
      if (depth < 75) {
        gaps.push("React State boundaries: Needs to elaborate further on controlled render loops and state synchronization side effects.")
        nextSteps.push("Deep-dive React documentation regarding reconciliation, key indexes, and state scheduling.")
      }
      gaps.push("Advanced Web Vitals: Missed specific details about browser paint rendering lifecycles (LCP/CLS optimizations).")
      nextSteps.push("Study Next.js custom performance metrics, font-optimization APIs, and structural CLS debugging in Chrome DevTools.")
    } else if (candidate.role === "Backend Engineer" || session.role.toLowerCase().includes("backend")) {
      if (depth < 75) {
        gaps.push("Distributed locks: Did not mention Redis transaction parameters or Lua scripts for atomic rate limiting checks.")
        nextSteps.push("Experiment with write atomic primitives using Redis Lua scripting or Zookeeper lease locks.")
      }
      gaps.push("Cache stampede triggers: Lacks explicit solutions to protect backend databases when cache keys drop concurrently.")
      nextSteps.push("Review cache-aside synchronization algorithms, specifically mutex locks, and distributed trace observability.")
    } else if (candidate.role === "Full Stack Engineer" || session.role.toLowerCase().includes("full stack")) {
      gaps.push("JWT Cookie parameters: Needs stronger security constraints (HttpOnly, SameSite, Secure flags) to defend auth state.")
      nextSteps.push("Implement mock Auth middleware in Next.js using custom secure HTTP cookies and csrf validation.")
      nextSteps.push("Read up on scaling persistent WebSocket connection adapters over Redis PubSub backplanes.")
    } else {
      // General Software Engineer
      if (depth < 70) {
        gaps.push("Call stack mechanics: Lacks full understanding of JS task scheduling queues (microtask loop priority).")
        nextSteps.push("Create visual tracing diagrams of promise execution hierarchies vs browser timeout triggers.")
      }
      gaps.push("Edge-case exceptions: Fails to explain failover behaviors or state corruption handling under scale partitions.")
      nextSteps.push("Study basic search algorithm pointer mutations (binary boundaries log-n limits) and transactional state.")
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

  // Calculate DNA Profile (Strongest, Developing, Weakest)
  const dnaStrongest = session.dnaProfile?.strongest || "Depth"
  const dnaDeveloping = session.dnaProfile?.developing || "Reasoning"
  const dnaWeakest = session.dnaProfile?.weakest || "Consistency"

  // Count detected contradictions
  const contradictionsCount = session.logs.filter(log => log.score.consistency < 50).length

  // Build progression comparison list
  const getProgressionScores = () => {
    if (history.length > 1) {
      return history.map((h, i) => ({
        index: i + 1,
        score: h.finalScore,
        mode: h.mode,
        date: new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      }))
    }
    // Baseline diagnostic mockup if history is empty
    return [
      { index: 1, score: 62, mode: "technical", date: "Baseline Diagnostic" },
      { index: 2, score: session.finalScore, mode: session.mode, date: "Latest Session" }
    ]
  }
  const progression = getProgressionScores()

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
              Readiness profile for <span className="text-white font-medium">{candidate.name}</span> &bull; {session.role} ({session.mode.toUpperCase()} mode)
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
              <p className="text-xs text-zinc-400 leading-relaxed">
                {session.finalScore >= 80 
                  ? "Highly prepared. Pushes boundaries of system scale and maintains logic consistency." 
                  : session.finalScore >= 60 
                    ? "Moderate readiness. Solid basics with minor focus limits or terminology gaps." 
                    : "Needs preparation. Focus on textbook optimization gaps and practice retry steps."}
              </p>
            </div>
          </Card>

          {/* Metrics breakdown sliders (7 Dimensions) */}
          <Card className="border-white/10 bg-zinc-950/70 p-6 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-5 flex items-center gap-1.5">
              <Award className="size-4 text-cyan-400" />
              Engineering Dimension Breakdown
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { name: "Technical Depth", val: session.metrics.depth, desc: "Trade-offs and architectural boundaries knowledge" },
                { name: "Technical Accuracy", val: session.metrics.accuracy, desc: "Correct syntax usage and concept definitions" },
                { name: "Logical Clarity", val: session.metrics.clarity, desc: "Step-by-step reasoning structure and layout clarity" },
                { name: "Communication", val: session.metrics.communication, desc: "Vocabulary professionalism and production examples" },
                { name: "Analytical Reasoning", val: session.metrics.reasoning, desc: "Data structures logic and debugging capabilities" },
                { name: "Decision Consistency", val: session.metrics.consistency, desc: "Reconciliation of previous tech stack selections" },
                { name: "Architectural Adaptability", val: session.metrics.adaptability, desc: "Refactoring flexibility under scale transformations" }
              ].map(m => (
                <div key={m.name} className="flex flex-col">
                  <div className="flex items-center justify-between text-xs font-medium mb-1">
                    <span className="text-zinc-300">{m.name}</span>
                    <span className="text-cyan-300">{m.val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-linear-to-r from-cyan-400 to-emerald-400" style={{ width: `${m.val}%` }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-normal">{m.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Authenticity Verification Box */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 mb-4 flex items-center gap-2">
              <ShieldAlert className="size-4 text-cyan-300" />
              Understanding Verification Summary
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="rounded border border-white/5 bg-white/3 p-2">
                <p className="text-[9px] text-zinc-500 uppercase">Verifications</p>
                <p className="text-sm font-bold text-white mt-1">
                  {session.logs.filter(l => l.probeState === "CONFIRMED" || l.probeState === "DEEP_PROBE").length} Checked
                </p>
              </div>
              <div className="rounded border border-white/5 bg-white/3 p-2">
                <p className="text-[9px] text-zinc-500 uppercase">Confidence</p>
                <p className={cn("text-sm font-bold mt-1", 
                  session.understandingConfidence === "HIGH" ? "text-emerald-400" :
                  session.understandingConfidence === "MODERATE" ? "text-cyan-400" : "text-yellow-400"
                )}>
                  {session.understandingConfidence}
                </p>
              </div>
              <div className="rounded border border-white/5 bg-white/3 p-2">
                <p className="text-[9px] text-zinc-500 uppercase">Assistance Risk</p>
                <p className={cn("text-sm font-bold mt-1", 
                  session.riskSignal === "LOW" ? "text-emerald-400" :
                  session.riskSignal === "MODERATE" ? "text-yellow-400" : "text-red-400"
                )}>
                  {session.riskSignal}
                </p>
              </div>
            </div>
            <div className="rounded border border-cyan-500/25 bg-cyan-500/5 p-3.5 text-xs text-zinc-300 leading-relaxed space-y-2">
              <p>
                * **Confidence Rating:** Indicates the consistency and specific depth verified when the system launched challenges or counterfactual questions.
              </p>
              <p>
                * **Contradiction Signal:** Checked {contradictionsCount} contradictions in design patterns. The interviewer evaluated your ability to defend stack choices.
              </p>
            </div>
          </Card>

          {/* DNA Profile Box */}
          <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-4 flex items-center gap-2">
                <Cpu className="size-4 text-cyan-400" />
                Session Interview DNA
              </h3>
              <p className="text-xs text-zinc-400 mb-4 leading-normal">
                Based on your behavior patterns, scaling responses, and adaptability under pressure.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                  <span className="text-zinc-500 font-medium flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-400" /> Strongest Attribute:
                  </span>
                  <span className="font-bold text-white">{dnaStrongest}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs">
                  <span className="text-zinc-500 font-medium flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-cyan-400" /> Developing Attribute:
                  </span>
                  <span className="font-bold text-white">{dnaDeveloping}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-red-400" /> Weakest Attribute:
                  </span>
                  <span className="font-bold text-white">{dnaWeakest}</span>
                </div>
              </div>
            </div>
            
            <div className="rounded border border-white/5 bg-white/3 p-2.5 text-[10px] text-zinc-500 leading-normal mt-4">
              Tip: In your next session, prioritize explaining **{dnaWeakest}** parameters. For example, explain structural tradeoffs earlier in your replies.
            </div>
          </Card>
        </div>

        {/* Topic Mastery Map */}
        <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-4 flex items-center gap-2">
            <BarChart3 className="size-4 text-cyan-400" />
            Topic Mastery Map
          </h3>
          <div className="space-y-4">
            {session.masteryMap && Object.keys(session.masteryMap).length > 0 ? (
              Object.keys(session.masteryMap).map(topic => {
                const score = session.masteryMap![topic]
                return (
                  <div key={topic} className="flex flex-col sm:grid sm:grid-cols-[180px_1fr_45px] items-center gap-3">
                    <span className="text-xs text-zinc-300 font-medium w-full sm:text-left">{topic}</span>
                    <div className="h-2 rounded-full bg-white/5 w-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${score}%` }} />
                    </div>
                    <span className="text-xs font-bold text-cyan-200 text-right w-full sm:w-auto">{score}%</span>
                  </div>
                )
              })
            ) : (
              <p className="text-xs text-zinc-500 text-center py-2">Mastery data will populate as logs are evaluated.</p>
            )}
          </div>
        </Card>

        {/* Historical Progression Map */}
        <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-cyan-400" />
            Interview Progress Tracker
          </h3>
          <div className="flex gap-4 items-end justify-between border-b border-white/10 pb-6 pt-4 min-h-[140px] px-4 overflow-x-auto">
            {progression.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 max-w-[100px]">
                <span className="text-[10px] text-zinc-500">{p.date}</span>
                <div 
                  className="w-8 bg-linear-to-t from-cyan-900 to-cyan-400 rounded-t-md transition-all duration-700 flex items-center justify-center text-[10px] text-black font-extrabold shadow-md"
                  style={{ height: `${p.score * 1.2}px` }}
                >
                  {p.score}%
                </div>
                <span className="text-xs text-white font-semibold">Run #{p.index}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 mt-3 text-center leading-normal">
            Chart plots candidate score changes chronologically over multiple interview sessions.
          </p>
        </Card>

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

        {/* Actionable Next Steps & Retry portal */}
        <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-4 flex items-center gap-2">
            <BookOpen className="size-4 text-cyan-400" />
            Recommended Practice & Retry portal
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
              const avgScore = Math.round(
                (log.score.depth + log.score.accuracy + log.score.reasoning + log.score.consistency + log.score.adaptability) / 5
              )

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
                      <span className="text-xs font-normal border border-cyan-400/25 bg-cyan-400/5 text-cyan-300 px-2 py-0.5 rounded-full w-fit">
                        {log.difficulty}
                      </span>
                      <span className="text-sm font-semibold text-white line-clamp-2 md:line-clamp-1 max-w-sm md:max-w-md whitespace-normal">
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
                          &ldquo;{log.answer}&rdquo;
                        </p>
                      </div>

                      {/* Specific Turn Scores */}
                      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 bg-zinc-950 p-3 rounded-lg border border-white/5 text-center">
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase">Depth</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.depth}%</p>
                        </div>
                        <div className="border-l border-white/5 sm:border-x">
                          <p className="text-[10px] text-zinc-500 uppercase">Clarity</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.clarity}%</p>
                        </div>
                        <div className="border-l border-white/5 sm:border-r">
                          <p className="text-[10px] text-zinc-500 uppercase">Accuracy</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.accuracy}%</p>
                        </div>
                        <div className="border-l border-white/5">
                          <p className="text-[10px] text-zinc-500 uppercase">Consistency</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.consistency}%</p>
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
