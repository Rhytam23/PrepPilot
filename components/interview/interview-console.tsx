"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Bot, ChevronRight, Mic2, Send, Sparkles, UserRound, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { candidates } from "@/data/candidates"
import { getQuestionsForCandidate, Question } from "@/data/interview-questions"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  sender: "interviewer" | "candidate"
  text: string
}

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

export default function InterviewConsole() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const candidateId = searchParams.get("candidate") || "CAND-001"

  // Find candidate details
  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0]
  const questions = React.useMemo(() => getQuestionsForCandidate(candidate.id), [candidate.id])

  // Interview state
  const sessionId = React.useRef(
  `session-${candidateId}-${Date.now()}`
)
  const [currentIdx, setCurrentIdx] = React.useState(0)
  const [currentStep, setCurrentStep] = React.useState<"main" | "followup">("main")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [userInput, setUserInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [analysisStatus, setAnalysisStatus] = React.useState("")

  // Metrics
  const [metrics, setMetrics] = React.useState({ depth: 0, clarity: 0, communication: 0 })
  const [evalLogs, setEvalLogs] = React.useState<EvalLog[]>([])

  const chatEndRef = React.useRef<HTMLDivElement>(null)

// Initialize interview
React.useEffect(() => {
  if (questions.length === 0) return

  let cancelled = false

  const initializeInterview = async () => {
    setIsTyping(true)

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId.current,
          candidate: {
            id: candidate.id,
            name: candidate.name,
           jobRole: candidate.role,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to start interview")
      }

      if (cancelled) return

      setMessages([
        {
          id: "initial-msg",
          sender: "interviewer",
          text: data.reply,
        },
      ])
    } catch (error) {
      console.error("Interview initialization failed:", error)

      if (!cancelled) {
        setMessages([
          {
            id: "initial-error",
            sender: "interviewer",
            text: "I couldn't start the interview. Please refresh and try again.",
          },
        ])
      }
    } finally {
      if (!cancelled) {
        setIsTyping(false)
      }
    }
  }

  initializeInterview()

  return () => {
    cancelled = true
  }
}, [candidate, questions])

// Scroll to bottom on new messages
React.useEffect(() => {

    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Evaluation engine
  const evaluateResponse = (answer: string, questionObj: Question, isFollowUp: boolean): {
    score: { depth: number; clarity: number; communication: number }
    guidance: string
  } => {
    const cleanAnswer = answer.trim()
    if (cleanAnswer.length < 10) {
      return {
        score: { depth: 15, clarity: 20, communication: 30 },
        guidance: "The answer is too brief to evaluate. Please provide a more detailed engineering explanation with technical reasoning and concrete examples.",
      }
    }

    // 1. Evaluate DEPTH
    let matchedConcepts: string[] = []
    questionObj.expectedConcepts.forEach((concept) => {
      const regex = new RegExp(`\\b${concept}\\b`, "i")
      if (regex.test(cleanAnswer) || cleanAnswer.toLowerCase().includes(concept.toLowerCase())) {
        matchedConcepts.push(concept)
      }
    })

    const keywordRatio = questionObj.expectedConcepts.length > 0 
      ? matchedConcepts.length / questionObj.expectedConcepts.length 
      : 1
    
    // Depth base is based on keyword coverage
    let depthBase = keywordRatio * 85
    // Length bonus (up to 15 points for deep answers)
    const lengthBonus = Math.min(cleanAnswer.length / 350, 1) * 15
    let depth = Math.min(100, Math.round(depthBase + lengthBonus))
    if (cleanAnswer.length < 25) depth = Math.min(depth, 30)

    // 2. Evaluate CLARITY
    // Check for structure (paragraphs, line breaks) and transition keywords
    const transitions = ["however", "therefore", "because", "since", "while", "whereas", "first", "second", "then", "next", "finally", "for instance", "for example", "contrast", "specifically"]
    let transitionCount = 0
    transitions.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "i")
      if (regex.test(cleanAnswer)) transitionCount++
    })

    const sentences = cleanAnswer.split(/[.!?]+/).filter(s => s.trim().length > 0)
    let clarity = 60 // base clarity
    if (transitionCount >= 2) clarity += 15
    if (sentences.length >= 2) clarity += 15
    if (cleanAnswer.includes("\n") || cleanAnswer.length > 200) clarity += 10
    clarity = Math.min(100, clarity)
    if (cleanAnswer.length < 25) clarity = Math.min(clarity, 35)

    // 3. Evaluate COMMUNICATION
    // Looks at tone words, examples, and overall formulation
    const examples = ["for example", "e.g.", "such as", "like", "in my experience", "specifically", "scenario", "production"]
    let hasExample = false
    examples.forEach((word) => {
      if (cleanAnswer.toLowerCase().includes(word)) hasExample = true
    })

    let communication = 65 // base
    if (hasExample) communication += 15
    if (cleanAnswer.length > 120) communication += 10
    if (cleanAnswer.length > 250) communication += 10
    communication = Math.min(100, communication)
    if (cleanAnswer.length < 25) communication = Math.min(communication, 40)

    return {
      score: { depth, clarity, communication },
      guidance: questionObj.improvementGuidance,
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
        sessionId: sessionId.current,
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

    // API returns done=true when the interview is complete
    if (data.done) {
 
  setIsTyping(false)

  if (data.feedback) {
    sessionStorage.setItem(
      "interviewFeedback",
      JSON.stringify(data.feedback)
    )
  }

  router.push(`/feedback?candidate=${candidateId}`)

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
        const finalScore = Math.round((metrics.depth + metrics.clarity + metrics.communication) / 3)
        const sessionPayload = {
          candidateId: candidate.id,
          logs: evalLogs,
          metrics,
          finalScore,
          timestamp: new Date().toISOString(),
        }

        sessionStorage.setItem("preppilot_session", JSON.stringify(sessionPayload))
        
        // Redirect to feedback page
        router.push(`/feedback?candidate=${candidate.id}`)
      }
    }, 1200)
  }

  const isFinished = messages[messages.length - 1]?.text.includes("completes our technical interview")

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
                  Live
                </span>
              </h1>
              <p className="text-xs text-zinc-400">
                Session with <span className="text-white font-medium">{candidate.name}</span> &bull; {candidate.role}
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
          <div className="flex flex-col border border-white/10 rounded-xl bg-zinc-950/70 p-4 shadow-2xl overflow-hidden min-h-112.5">
            {/* Scrollable messages container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-95 min-h-75">
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
                        {isAI ? "AI Interviewer" : candidate.name}
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
                      : `Type your explanation for ${questions[currentIdx]?.topic || "focus area"}...`
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
              <CardContent className="p-4 flex flex-col sm:grid sm:grid-cols-3 lg:flex lg:flex-col gap-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Depth</span>
                    <span className={cn("font-medium", metrics.depth > 70 ? "text-emerald-300" : metrics.depth > 40 ? "text-cyan-300" : "text-zinc-400")}>
                      {metrics.depth > 0 ? `${metrics.depth}%` : "Awaiting response"}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-cyan-400 to-emerald-400 transition-all duration-500" 
                      style={{ width: `${metrics.depth}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Clarity</span>
                    <span className={cn("font-medium", metrics.clarity > 70 ? "text-emerald-300" : metrics.clarity > 40 ? "text-cyan-300" : "text-zinc-400")}>
                      {metrics.clarity > 0 ? `${metrics.clarity}%` : "Awaiting response"}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-cyan-400 to-white transition-all duration-500" 
                      style={{ width: `${metrics.clarity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Communication</span>
                    <span className={cn("font-medium", metrics.communication > 70 ? "text-emerald-300" : metrics.communication > 40 ? "text-cyan-300" : "text-zinc-400")}>
                      {metrics.communication > 0 ? `${metrics.communication}%` : "Awaiting response"}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-cyan-400 to-violet-400 transition-all duration-500" 
                      style={{ width: `${metrics.communication}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

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
                      : "Expand on your previous logic. AI is asking a critical follow-up questions to probe context limits."}
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
                      Ending early evaluates you based on the questions you've answered so far.
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
