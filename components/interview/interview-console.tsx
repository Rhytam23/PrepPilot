"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Bot, ChevronRight, Mic2, Send, Sparkles, UserRound, Loader2, ShieldAlert, Cpu, Activity, User, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { candidates } from "@/data/candidates"
import { getQuestionsForCandidate } from "@/data/interview-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { cn } from "@/lib/utils"
import type { EvalLog } from "@/types/candidate"

type Message = {
  id: string
  sender: "interviewer" | "candidate"
  text: string
}

export default function InterviewConsole() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const candidateId = searchParams.get("candidate") || "CAND-001"

  // Find candidate details
  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0]
  const questions = React.useMemo(() => getQuestionsForCandidate(candidate.id), [candidate.id])

  // Session parameters (configured during Setup stage)
  const [stage, setStage] = React.useState<"setup" | "chat">("setup")
  const [selectedMode, setSelectedMode] = React.useState<"quick" | "technical" | "deep_dive" | "system_design" | "debugging" | "behavioral">("technical")
  const [selectedPersonality, setSelectedPersonality] = React.useState<"mentor" | "interviewer" | "challenger" | "designer">("interviewer")
  const [roleOverride, setRoleOverride] = React.useState(candidate.role)

  // Interview state (React purity warning fix: lazy useState initializer)
  const [sessionId] = React.useState(() => `session-${candidate.id}-${Date.now()}`)
  
  const [currentIdx, setCurrentIdx] = React.useState(0)
  const [currentStep, setCurrentStep] = React.useState<"main" | "followup">("main")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [userInput, setUserInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [analysisStatus, setAnalysisStatus] = React.useState("")

  // Adaptive properties returned from API
  const [difficulty, setDifficulty] = React.useState<"EASY" | "MEDIUM" | "HARD" | "EXPERT">("MEDIUM")
  const [probeState, setProbeState] = React.useState<"NORMAL" | "VERIFYING" | "DEEP_PROBE" | "CONFIRMED">("NORMAL")
  const [understandingConfidence, setUnderstandingConfidence] = React.useState<"LOW" | "MODERATE" | "HIGH">("MODERATE")
  const [riskSignal, setRiskSignal] = React.useState<"LOW" | "MODERATE" | "ELEVATED">("LOW")

  // Heuristic metrics
  const [metrics, setMetrics] = React.useState({
    depth: 0,
    clarity: 0,
    communication: 0,
    accuracy: 0,
    reasoning: 0,
    consistency: 0,
    adaptability: 0
  })
  const [evalLogs, setEvalLogs] = React.useState<EvalLog[]>([])

  const chatEndRef = React.useRef<HTMLDivElement>(null)

  // Initialize interview logic upon Setup Launch
  const startSession = async () => {
    setStage("chat")
    setIsTyping(true)

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          mode: selectedMode,
          personality: selectedPersonality,
          role: roleOverride,
          candidate: {
            id: candidate.id,
            name: candidate.name,
            jobRole: roleOverride,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to start interview")
      }

      if (data.metrics) setMetrics(data.metrics)
      if (data.logs) setEvalLogs(data.logs)
      if (data.difficulty) setDifficulty(data.difficulty)
      if (data.probeState) setProbeState(data.probeState)
      if (data.understandingConfidence) setUnderstandingConfidence(data.understandingConfidence)
      if (data.riskSignal) setRiskSignal(data.riskSignal)

      setMessages([
        {
          id: "initial-msg",
          sender: "interviewer",
          text: data.reply,
        },
      ])
    } catch (error) {
      console.error("Interview initialization failed:", error)
      setMessages([
        {
          id: "initial-error",
          sender: "interviewer",
          text: "I couldn't start the interview. Please refresh and try again.",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Scroll to bottom on new messages
  React.useEffect(() => {
    if (stage === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping, stage])

  // DNA and Mastery helper calculation
  const generateEndPayload = (finalMetrics: typeof metrics, finalLogs: EvalLog[], completed: boolean) => {
    // 1. Mastery Map based on average topic scores
    const masteryMap: Record<string, number> = {}
    const topicCounts: Record<string, number> = {}
    
    finalLogs.forEach(log => {
      const avgScore = Math.round(
        (log.score.depth + log.score.accuracy + log.score.reasoning + log.score.consistency + log.score.adaptability) / 5
      )
      if (!masteryMap[log.topic]) {
        masteryMap[log.topic] = 0
        topicCounts[log.topic] = 0
      }
      masteryMap[log.topic] += avgScore
      topicCounts[log.topic] += 1
    })

    Object.keys(masteryMap).forEach(topic => {
      masteryMap[topic] = Math.round(masteryMap[topic] / topicCounts[topic])
    })

    // 2. DNA Profile strongest/developing/weakest
    const items = [
      { name: "Technical Depth", val: finalMetrics.depth },
      { name: "Logical Clarity", val: finalMetrics.clarity },
      { name: "Communication", val: finalMetrics.communication },
      { name: "Accuracy", val: finalMetrics.accuracy },
      { name: "Reasoning", val: finalMetrics.reasoning },
      { name: "Consistency", val: finalMetrics.consistency },
      { name: "Adaptability", val: finalMetrics.adaptability }
    ].sort((a, b) => b.val - a.val)

    return {
      candidateId: candidate.id,
      sessionId,
      logs: finalLogs,
      metrics: finalMetrics,
      finalScore: Math.round((finalMetrics.depth + finalMetrics.accuracy + finalMetrics.reasoning + finalMetrics.consistency + finalMetrics.adaptability) / 5),
      timestamp: new Date().toISOString(),
      completed,
      mode: selectedMode,
      personality: selectedPersonality,
      role: roleOverride,
      difficulty,
      understandingConfidence,
      riskSignal,
      dnaProfile: {
        strongest: items[0].name,
        developing: items[Math.floor(items.length / 2)].name,
        weakest: items[items.length - 1].name
      },
      masteryMap
    }
  }

  // Handle Answer Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userInput.trim() || isTyping || isAnalyzing || isFinished) {
      return
    }

    const answer = userInput.trim()

    // Show candidate's answer immediately
    const newUserMsg: Message = {
      id: `candidate-msg-${Date.now()}`,
      sender: "candidate",
      text: answer,
    }

    setMessages((prev) => [...prev, newUserMsg])
    setUserInput("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: answer,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit answer")
      }

      setIsTyping(false)

      // Display interviewer response from the API
      setMessages((prev) => [
        ...prev,
        {
          id: `interviewer-msg-${Date.now()}`,
          sender: "interviewer",
          text: data.reply,
        },
      ])

      // Synchronize metrics and adaptive state variables
      if (data.metrics) setMetrics(data.metrics)
      if (data.logs) setEvalLogs(data.logs)
      if (data.difficulty) setDifficulty(data.difficulty)
      if (data.probeState) setProbeState(data.probeState)
      if (data.understandingConfidence) setUnderstandingConfidence(data.understandingConfidence)
      if (data.riskSignal) setRiskSignal(data.riskSignal)

      // API returns done=true when the interview is complete
      if (data.done) {
        setIsTyping(false)
        const finalMetrics = data.metrics || metrics
        const finalLogs = data.logs || evalLogs

        const sessionPayload = generateEndPayload(finalMetrics, finalLogs, true)
        sessionStorage.setItem("preppilot_session", JSON.stringify(sessionPayload))
        
        // Append results to progress history for learning paths
        const historyJson = localStorage.getItem("preppilot_history")
        const history = historyJson ? JSON.parse(historyJson) : []
        history.push(sessionPayload)
        localStorage.setItem("preppilot_history", JSON.stringify(history))

        router.push(`/feedback?candidate=${candidate.id}`)
        return
      }

      // Keep the UI progress in sync with the API flow.
      if (currentStep === "main") {
        setCurrentStep("followup")
      } else if (currentIdx < questions.length - 1) {
        setCurrentIdx((prev) => prev + 1)
        setCurrentStep("main")
      }
    } catch (error) {
      console.error("Interview submission failed:", error)
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "interviewer",
          text: "I couldn't process that answer. Please try submitting again.",
        },
      ])
    }
  }

  // End Interview early or wrap up
  const triggerAnalysis = () => {
    if (evalLogs.length === 0) {
      alert("Please answer at least one question before ending the interview.")
      return
    }

    setIsAnalyzing(true)
    
    // Simulation processing steps
    const steps = [
      "Analyzing semantic depth and key concept coverage...",
      "Measuring response structure and clarity metrics...",
      "Evaluating professional vocabulary and communication signals...",
      "Compiling interview signals and formatting dashboard report...",
    ]

    let stepIdx = 0
    setAnalysisStatus(steps[0])

    const interval = setInterval(() => {
      stepIdx++
      if (stepIdx < steps.length) {
        setAnalysisStatus(steps[stepIdx])
      } else {
        clearInterval(interval)

        // Save session state to sessionStorage
        const sessionPayload = generateEndPayload(metrics, evalLogs, false)
        sessionStorage.setItem("preppilot_session", JSON.stringify(sessionPayload))
        
        // Save to history
        const historyJson = localStorage.getItem("preppilot_history")
        const history = historyJson ? JSON.parse(historyJson) : []
        history.push(sessionPayload)
        localStorage.setItem("preppilot_history", JSON.stringify(history))
        
        // Redirect to feedback page
        router.push(`/feedback?candidate=${candidate.id}`)
      }
    }, 1200)
  }

  const isFinished = messages[messages.length - 1]?.text.includes("completes our technical interview") || messages[messages.length - 1]?.text.includes("Interview completed")

  if (stage === "setup") {
    return (
      <div className="dark min-h-svh bg-black text-white flex flex-col justify-between">
        <SiteHeader />
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 flex flex-col gap-8 justify-center">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-xs font-semibold text-cyan-300 mb-4 tracking-wider uppercase">
              <Cpu className="size-3.5" /> PrepPilot Engine v0.8
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Adaptive Interview Setup
            </h1>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base">
              Customize the evaluation context, interviewer personality, and target engineering role constraints before launching your session.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Mode Select */}
            <Card className="border-white/10 bg-zinc-950/70 p-5 flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Activity className="size-4" /> 1. Interview Mode
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Select the architectural focus and question format.</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {[
                    { id: "technical", label: "Technical" },
                    { id: "deep_dive", label: "Deep Dive" },
                    { id: "system_design", label: "System Design" },
                    { id: "debugging", label: "Debugging" },
                    { id: "behavioral", label: "Behavioral" },
                    { id: "quick", label: "Quick Check" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMode(m.id as "quick" | "technical" | "deep_dive" | "system_design" | "debugging" | "behavioral")}
                      className={cn(
                        "py-2 px-2.5 rounded-lg border text-xs font-medium transition",
                        selectedMode === m.id
                          ? "border-cyan-300 bg-cyan-400/10 text-cyan-200"
                          : "border-white/5 bg-white/3 text-zinc-400 hover:bg-white/5 hover:border-white/10"
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Personality Select */}
            <Card className="border-white/10 bg-zinc-950/70 p-5 flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <User className="size-4" /> 2. Interviewer Style
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Change the questioning behavior and feedback tone.</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {[
                    { id: "interviewer", label: "Interviewer", desc: "Professional, balanced" },
                    { id: "mentor", label: "Mentor", desc: "Supportive, guided" },
                    { id: "challenger", label: "Challenger", desc: "Skeptical, rigorous" },
                    { id: "designer", label: "System Designer", desc: "Architectural focus" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPersonality(p.id as "mentor" | "interviewer" | "challenger" | "designer")}
                      className={cn(
                        "py-2 px-2.5 rounded-lg border text-xs font-medium flex flex-col items-center justify-center transition",
                        selectedPersonality === p.id
                          ? "border-cyan-300 bg-cyan-400/10 text-cyan-200"
                          : "border-white/5 bg-white/3 text-zinc-400 hover:bg-white/5 hover:border-white/10"
                      )}
                    >
                      <span>{p.label}</span>
                      <span className="text-[9px] text-zinc-500 font-normal mt-0.5">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Role Override Form */}
          <Card className="border-white/10 bg-zinc-950/70 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <BookOpen className="size-4" /> 3. Target Engineering Role
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Tailors terminology criteria to the candidate&apos;s specialization.</p>
            <input
              type="text"
              value={roleOverride}
              onChange={(e) => setRoleOverride(e.target.value)}
              placeholder="e.g. Backend Software Engineer"
              className="mt-4 w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </Card>

          {/* Start CTA */}
          <Button
            onClick={startSession}
            size="lg"
            className="w-full bg-cyan-400 text-black hover:bg-cyan-500 font-bold tracking-wider py-4 shadow-lg shadow-cyan-900/20"
          >
            Launch Interview Session
            <ChevronRight className="size-4" />
          </Button>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="dark min-h-svh bg-black text-white flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1 flex flex-col relative px-4 md:px-6 max-w-6xl mx-auto w-full py-6 gap-6">
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 z-50 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-6"
            >
              <Loader2 className="size-10 text-cyan-400 animate-spin" />
              <div className="flex flex-col items-center text-center max-w-md px-6">
                <h3 className="text-xl font-medium text-white mb-2">Analyzing Performance</h3>
                <p className="text-sm text-zinc-400 h-10 transition-all duration-300 animate-pulse">
                  {analysisStatus}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
            <span className="flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-cyan-300">
              <Bot className="size-5" />
            </span>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                PrepPilot Interview Board
                <span className="text-xs font-normal border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 px-2 py-0.5 rounded-full">
                  Adaptive
                </span>
                <span className="text-xs font-normal border border-yellow-400/20 bg-yellow-400/10 text-yellow-300 px-2 py-0.5 rounded-full">
                  {difficulty}
                </span>
              </h1>
              <p className="text-xs text-zinc-400">
                Session with <span className="text-white font-medium">{candidate.name}</span> &bull; {roleOverride} ({selectedMode.toUpperCase()} mode)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-zinc-400 text-right">
              Progress
              <p className="text-sm font-semibold text-white">
                {currentIdx + 1} / {questions.length} Focus Areas
              </p>
            </div>
            <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-all duration-500" 
                style={{ width: `${((currentIdx + (currentStep === "followup" ? 0.5 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] flex-1">
          {/* Chat Console Section */}
          <div className="flex flex-col border border-white/10 rounded-xl bg-zinc-950/70 p-4 shadow-2xl overflow-hidden min-h-[450px]">
            {/* Scrollable messages container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-[380px] min-h-[300px]">
              {messages.map((msg: Message) => {
                const isAI = msg.sender === "interviewer"
                return (
                  <motion.article
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "rounded-lg border p-4 max-w-[85%] shadow-md",
                      isAI
                        ? "border-cyan-300/10 bg-cyan-300/4 text-zinc-100"
                        : "border-white/5 bg-white/5 ml-auto text-zinc-200"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-md border",
                          isAI
                            ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"
                            : "border-white/10 bg-white/10 text-white"
                        )}
                      >
                        {isAI ? <Bot className="size-3.5" /> : <UserRound className="size-3.5" />}
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {isAI ? `AI Interviewer (${selectedPersonality.toUpperCase()})` : candidate.name}
                      </span>
                    </div>
                    <p className="text-sm leading-6 whitespace-pre-line text-zinc-300">
                      {msg.text}
                    </p>
                  </motion.article>
                )
              })}

              {isTyping && (
                <div className="flex items-center gap-3 text-sm text-zinc-500 bg-cyan-300/2 border border-cyan-300/5 p-4 rounded-lg w-40">
                  <span className="flex size-7 items-center justify-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Bot className="size-3.5" />
                  </span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* User Input Form */}
            <form onSubmit={handleSubmit} className="border-t border-white/10 pt-4 mt-4 flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={userInput}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
                  placeholder={
                    isFinished 
                      ? "Interview completed. Please click 'Generate Performance Report'." 
                      : `Explain your approach for ${questions[currentIdx]?.topic || "focus area"}...`
                  }
                  disabled={isFinished || isTyping || isAnalyzing}
                  className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 pr-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none h-16 min-h-16 max-h-24 disabled:opacity-50"
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || isFinished || isTyping || isAnalyzing}
                  className="absolute right-2.5 bottom-2.5 size-7 rounded-md bg-white text-black hover:bg-zinc-200 flex items-center justify-center disabled:opacity-40 transition-colors"
                  aria-label="Send answer"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Performance Signals Dashboard (Right Hand Column) */}
          <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-4">
            <Card className="border-white/10 bg-zinc-950/70 shadow-2xl">
              <CardHeader className="p-4 pb-2 border-b border-white/10">
                <CardTitle className="text-xs uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                  <Mic2 className="size-4 text-cyan-400" />
                  Live Session Signals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-3">
                {/* 7 Core Dimensions */}
                {[
                  { name: "Depth", val: metrics.depth, grad: "from-cyan-400 to-emerald-400" },
                  { name: "Clarity", val: metrics.clarity, grad: "from-cyan-400 to-white" },
                  { name: "Communication", val: metrics.communication, grad: "from-cyan-400 to-violet-400" },
                  { name: "Accuracy", val: metrics.accuracy, grad: "from-emerald-400 to-cyan-400" },
                  { name: "Reasoning", val: metrics.reasoning, grad: "from-cyan-400 to-yellow-400" },
                  { name: "Consistency", val: metrics.consistency, grad: "from-violet-400 to-emerald-400" },
                  { name: "Adaptability", val: metrics.adaptability, grad: "from-yellow-400 to-cyan-400" }
                ].map(dim => (
                  <div key={dim.name}>
                    <div className="mb-1.5 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">{dim.name}</span>
                      <span className={cn("font-medium", dim.val > 70 ? "text-emerald-300" : dim.val > 40 ? "text-cyan-300" : "text-zinc-500")}>
                        {dim.val > 0 ? `${dim.val}%` : "Awaiting"}
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className={cn("h-full bg-gradient-to-r transition-all duration-500", dim.grad)} 
                        style={{ width: `${dim.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Authenticity Verification Info */}
            <Card className="border-white/10 bg-zinc-950/70 p-4 shadow-2xl flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-1.5">
                <ShieldAlert className="size-3.5 text-cyan-400" />
                Adaptive Verification
              </p>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded border border-white/5 bg-white/3 p-2">
                  <p className="text-[9px] text-zinc-500 uppercase">Understanding</p>
                  <p className={cn("text-xs font-bold mt-1", 
                    understandingConfidence === "HIGH" ? "text-emerald-400" : 
                    understandingConfidence === "MODERATE" ? "text-cyan-400" : "text-yellow-400"
                  )}>
                    {understandingConfidence}
                  </p>
                </div>
                <div className="rounded border border-white/5 bg-white/3 p-2">
                  <p className="text-[9px] text-zinc-500 uppercase">Assistance Risk</p>
                  <p className={cn("text-xs font-bold mt-1", 
                    riskSignal === "LOW" ? "text-emerald-400" : 
                    riskSignal === "MODERATE" ? "text-yellow-400" : "text-red-400"
                  )}>
                    {riskSignal}
                  </p>
                </div>
              </div>
              <div className="rounded border border-cyan-500/20 bg-cyan-500/5 p-2.5">
                <p className="text-[10px] text-zinc-400 leading-normal">
                  Verification State: <span className="font-semibold text-white">{probeState}</span>
                </p>
              </div>
            </Card>

            {/* Target focus topic */}
            <Card className="border-white/10 bg-zinc-950/70 p-4 shadow-2xl flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-1.5">
                  <Sparkles className="size-3 text-cyan-400" />
                  Target Focus Topic
                </p>
                <div className="rounded border border-cyan-500/20 bg-cyan-500/5 p-3">
                  <p className="text-xs font-semibold text-white">
                    {questions[currentIdx]?.topic || "Loading topic"}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 leading-5">
                    {currentStep === "main" 
                      ? "Present a detailed high-level explanation. Mention architectural choices, trade-offs, and expected pitfalls."
                      : "Expand on your previous logic. The AI is asking a critical follow-up question to probe context limits."}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {isFinished ? (
                  <Button 
                    onClick={triggerAnalysis} 
                    className="w-full bg-emerald-400 text-black hover:bg-emerald-500 font-semibold"
                  >
                    Generate Performance Report
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={triggerAnalysis} 
                      disabled={evalLogs.length === 0 || isAnalyzing}
                      variant="outline" 
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
                    >
                      Finish & Evaluate Early
                    </Button>
                    <p className="text-[10px] text-zinc-500 text-center leading-normal">
                      Ending early evaluates you based on the questions you&apos;ve answered so far.
                    </p>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
