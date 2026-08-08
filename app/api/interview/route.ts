import { NextResponse } from "next/server"
import { getQuestionsForCandidate, Question } from "@/data/interview-questions"
import type { EvalLog } from "@/types/candidate"

type SessionState = {
  candidateId: string
  candidateName: string
  candidateRole: string
  questions: Question[]
  currentIdx: number
  currentStep: "main" | "followup"
  logs: EvalLog[]
  metrics: {
    depth: number
    clarity: number
    communication: number
    accuracy: number
    reasoning: number
    consistency: number
    adaptability: number
  }
  lastActive: number
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT"
  mode: "quick" | "technical" | "deep_dive" | "system_design" | "debugging" | "behavioral"
  personality: "mentor" | "interviewer" | "challenger" | "designer"
  role: string
  probeState: "NORMAL" | "VERIFYING" | "DEEP_PROBE" | "CONFIRMED"
  understandingConfidence: "LOW" | "MODERATE" | "HIGH"
  riskSignal: "LOW" | "MODERATE" | "ELEVATED"
  choicesMemory: string[]
  streak: number
}

// Global server-side in-memory session store
const sessions = new Map<string, SessionState>()

// Dynamic Adaptive Question Generator
function buildAdaptiveQuestion(
  baseQuestion: Question,
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT",
  role: string,
  mode: "quick" | "technical" | "deep_dive" | "system_design" | "debugging" | "behavioral",
  personality: "mentor" | "interviewer" | "challenger" | "designer",
  choices: string[]
): { question: string; expectedConcepts: string[]; followUpQuestions: string[] } {
  const topic = baseQuestion.topic
  let qText = baseQuestion.question
  let concepts = [...baseQuestion.expectedConcepts]
  let followUps = [...baseQuestion.followUpQuestions]

  // 1. Level Escalation/De-escalation
  if (difficulty === "EASY") {
    qText = `Let's focus on the foundations of ${topic}. Can you explain the core concepts here, how it functions under basic conditions, and what a simple application scenario looks like?`
    followUps = [`What is the most straightforward way you would verify that this setup works in a development environment?`]
  } else if (difficulty === "HARD") {
    qText = `For ${topic}, how would you design this to handle high concurrency, and what architectural constraints or latency bottlenecks would you expect to encounter?`
    concepts = [...concepts, "concurrency", "bottleneck", "latency", "throughput", "scale"]
    followUps = [`If traffic grows 10x instantly, which specific component in this design fails first, and why?`]
  } else if (difficulty === "EXPERT") {
    qText = `Design an enterprise-level, highly-available architecture for ${topic}. How do you handle distributed consistency, partitioning boundaries, and cross-regional replication failovers?`
    concepts = [...concepts, "partitioning", "consistency", "distributed", "replication", "active-active", "failover"]
    followUps = [`What happens to database writes under your design if a network partition isolates one of the regional server datacenters?`]
  }

  // 2. Role Specific tailoring
  if (role.toLowerCase().includes("frontend")) {
    qText += ` Focus on the React state tree, browser render loops, DOM layout reflow triggers, and responsive interactions.`
    concepts = [...concepts, "state", "react", "rendering", "layout", "hydration", "performance"]
  } else if (role.toLowerCase().includes("backend") || role.toLowerCase().includes("data")) {
    qText += ` Focus on database normalization, transactions serializability, connection pools, and caching mechanisms.`
    concepts = [...concepts, "database", "sql", "cache", "connection", "pool", "transactions"]
  } else if (role.toLowerCase().includes("full stack")) {
    qText += ` Focus on end-to-end payload sizes, CORS security policies, session cookie parameters, and database query latency.`
    concepts = [...concepts, "payload", "cookie", "session", "cors", "integration"]
  }

  // 3. Interview Mode Customizations
  if (mode === "debugging") {
    qText = `[DEBUGGING CHALLENGE] Suppose your implementation for ${topic} starts throwing 'Maximum call stack size exceeded' or connection pool exhaustion errors in staging. Walk me through your diagnostics: what is the root cause, what files do you inspect, and how do you resolve it?`
    concepts = [...concepts, "recursion", "exhaustion", "leak", "stack", "debug"]
    followUps = [`How would you configure alert boundaries to catch this leak in production before it triggers an outage?`]
  } else if (mode === "system_design") {
    qText = `[SYSTEM DESIGN] Design a scalable system for ${topic} from scratch. Detail the load balancers, database schema constraints, memory caching policies, and asynchronous task queues.`
    concepts = [...concepts, "gateway", "queue", "cache-aside", "redundancy", "system design"]
  }

  // 4. Interviewer Personality Transitions
  if (personality === "challenger") {
    qText = `Prove your judgment here: why is your approach for ${topic} better than standard industry designs, and how do you defend against common performance pitfalls?`
  } else if (personality === "mentor") {
    qText = `Let's look at ${topic} step-by-step. Walk me through your design, and let's identify the simplest point where we can optimize the code.`
  }

  // 5. Memory Injection
  if (choices.length > 0) {
    const lastChoice = choices[choices.length - 1]
    qText = `You previously selected ${lastChoice} for core storage. Keeping that in mind, how does your choice of ${lastChoice} shape your engineering approach to ${topic}?`
  }

  return { question: qText, expectedConcepts: concepts, followUpQuestions: followUps }
}

// Helper to evaluate responses with advanced metrics
function evaluateAnswer(
  answer: string,
  questionText: string,
  expectedConcepts: string[],
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT",
  probeState: "NORMAL" | "VERIFYING" | "DEEP_PROBE" | "CONFIRMED",
  choicesMemory: string[]
): {
  score: {
    depth: number
    clarity: number
    communication: number
    accuracy: number
    reasoning: number
    consistency: number
    adaptability: number
  }
  guidance: string
  extractedTech: string | null
  isContradiction: boolean
  isPolishedTextbook: boolean
} {
  const cleanAnswer = answer.trim()
  const lowerAnswer = cleanAnswer.toLowerCase()

  if (cleanAnswer.length < 10) {
    return {
      score: { depth: 15, clarity: 20, communication: 30, accuracy: 15, reasoning: 20, consistency: 50, adaptability: 20 },
      guidance: "Your answer is too short. Please provide a detailed engineering explanation including technical choices, tradeoffs, and production scenarios.",
      extractedTech: null,
      isContradiction: false,
      isPolishedTextbook: false
    }
  }

  // Extract technical stack choices for memory
  const techKeywords = ["postgres", "postgresql", "redis", "mongodb", "mysql", "kafka", "rabbitmq", "jwt", "cookies", "websockets", "rest", "graphql", "sqlite"]
  let extractedTech: string | null = null
  for (const tech of techKeywords) {
    if (lowerAnswer.includes(tech)) {
      extractedTech = tech
      break
    }
  }

  // Detect Contradictions against memory
  let isContradiction = false
  if (extractedTech) {
    if (extractedTech === "mongodb" && choicesMemory.includes("postgres")) {
      isContradiction = true
    } else if (extractedTech === "postgres" && choicesMemory.includes("mongodb")) {
      isContradiction = true
    }
  }

  // Evaluate Accuracy (concept matching)
  const matchedConcepts: string[] = []
  expectedConcepts.forEach((concept) => {
    if (lowerAnswer.includes(concept.toLowerCase())) {
      matchedConcepts.push(concept)
    }
  })
  const conceptRatio = expectedConcepts.length > 0 ? matchedConcepts.length / expectedConcepts.length : 1
  let accuracy = Math.round(50 + conceptRatio * 45)
  if (cleanAnswer.length < 30) accuracy = Math.min(accuracy, 40)

  // Detect Polished Textbook / AI-like behavior
  const textbookKeywords = ["firstly", "secondly", "crucial", "essential", "in summary", "moreover", "furthermore", "vital", "specifically", "additionally"]
  let textbookHits = 0
  textbookKeywords.forEach((w) => {
    if (lowerAnswer.includes(w)) textbookHits++
  })
  const isPolishedTextbook = textbookHits >= 3 && cleanAnswer.length > 300 && conceptRatio > 0.8

  // Evaluate Reasoning
  const logicalTransitions = ["however", "therefore", "because", "since", "while", "contrast", "trade-off", "compromise"]
  let transitionCount = 0
  logicalTransitions.forEach((w) => {
    if (lowerAnswer.includes(w)) transitionCount++
  })
  const sentences = cleanAnswer.split(/[.!?]+/).filter(s => s.trim().length > 0)
  let reasoning = 50
  if (transitionCount >= 2) reasoning += 20
  if (sentences.length >= 3) reasoning += 20
  reasoning = Math.min(98, reasoning)

  // Evaluate Depth (incorporates difficulty context)
  const depthBase = conceptRatio * 75
  const lengthBonus = Math.min(cleanAnswer.length / 400, 1) * 20
  let depth = Math.min(100, Math.round(depthBase + lengthBonus))
  if (difficulty === "HARD") depth = Math.round(depth * 0.95)
  if (difficulty === "EXPERT") depth = Math.round(depth * 0.9)

  // Evaluate Clarity
  let clarity = 60
  if (cleanAnswer.length > 150) clarity += 15
  if (lowerAnswer.includes("\n") || lowerAnswer.includes(" - ") || lowerAnswer.includes("•")) clarity += 15
  clarity = Math.min(100, clarity)

  // Evaluate Communication (use of real-world scenarios or personal experience examples)
  const experienceTokens = ["in my experience", "production", "we ran into", "staging", "benchmark", "trade-off", "specifically"]
  let hasExp = false
  experienceTokens.forEach((t) => {
    if (lowerAnswer.includes(t)) hasExp = true
  })
  let communication = 65
  if (hasExp) communication += 20
  if (cleanAnswer.length > 200) communication += 10
  communication = Math.min(100, communication)

  // Evaluate Consistency & Adaptability
  let consistency = isContradiction ? 30 : 85
  if (probeState === "DEEP_PROBE" && isContradiction) consistency = 20

  let adaptability = 70
  if (probeState === "VERIFYING" || probeState === "DEEP_PROBE") {
    // Probe adaptability based on answer specificity in verification
    if (cleanAnswer.length > 250 && conceptRatio > 0.4) {
      adaptability = 90
    } else {
      adaptability = 45
    }
  }

  return {
    score: { depth, clarity, communication, accuracy, reasoning, consistency, adaptability },
    guidance: isContradiction 
      ? "Reconcile your choices: your current design patterns contradict your previous data consistency decisions."
      : isPolishedTextbook 
        ? "Avoid standard textbook summaries. Detail exact failure configurations, latency thresholds, and tools you've worked with directly."
        : "Provide deeper explanations of implementation constraints and why other options were ruled out.",
    extractedTech,
    isContradiction,
    isPolishedTextbook
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId parameter" }, { status: 400 })
    }

    // 1. Initial request (Start Interview)
    if (body.candidate) {
      const { candidate } = body
      const candidateId = candidate.id || "CAND-001"
      const candidateName = candidate.name || "Sarah Johnson"
      const candidateRole = candidate.jobRole || "Senior Data Engineer"

      // Mode and Personality overrides from Client UI selection
      const mode = body.mode || "technical"
      const personality = body.personality || "interviewer"
      const role = body.role || candidateRole

      const candidateQuestions = getQuestionsForCandidate(candidateId)

      // TTL memory cleanup: remove idle maps older than 1 hour
      const now = Date.now()
      try {
        for (const [sId, sState] of sessions.entries()) {
          if (now - sState.lastActive > 3600000) {
            sessions.delete(sId)
          }
        }
      } catch (cleanError) {
        console.error("Cleanup error:", cleanError)
      }

      // Initialize advanced session state
      const initialDifficulty = "MEDIUM"
      const adaptiveState = buildAdaptiveQuestion(candidateQuestions[0], initialDifficulty, role, mode, personality, [])

      // Replace the first question in memory with the customized adaptive version
      const adaptedQuestions = [...candidateQuestions]
      adaptedQuestions[0] = {
        ...candidateQuestions[0],
        question: adaptiveState.question,
        expectedConcepts: adaptiveState.expectedConcepts,
        followUpQuestions: adaptiveState.followUpQuestions
      }

      const newState: SessionState = {
        candidateId,
        candidateName,
        candidateRole,
        questions: adaptedQuestions,
        currentIdx: 0,
        currentStep: "main",
        logs: [],
        metrics: { depth: 0, clarity: 0, communication: 0, accuracy: 0, reasoning: 0, consistency: 0, adaptability: 0 },
        lastActive: now,
        difficulty: initialDifficulty,
        mode,
        personality,
        role,
        probeState: "NORMAL",
        understandingConfidence: "MODERATE",
        riskSignal: "LOW",
        choicesMemory: [],
        streak: 0
      }

      sessions.set(sessionId, newState)

      const welcomeMessage = `Welcome, ${candidateName}. I'm your AI Interviewer (${personality.toUpperCase()} mode). We'll perform a personalized evaluation. Let's begin with a question on ${adaptedQuestions[0].topic}:\n\n${adaptedQuestions[0].question}`

      return NextResponse.json({
        reply: welcomeMessage,
        done: false,
        metrics: newState.metrics,
        logs: newState.logs,
        difficulty: newState.difficulty,
        understandingConfidence: newState.understandingConfidence,
        riskSignal: newState.riskSignal,
        probeState: newState.probeState
      })
    }

    // 2. Conversation Turn
    const sessionState = sessions.get(sessionId)
    if (!sessionState) {
      return NextResponse.json({ error: "Session expired or not found. Please restart the interview." }, { status: 400 })
    }

    sessionState.lastActive = Date.now()

    const { message } = body
    if (!message) {
      return NextResponse.json({ error: "Missing message parameter" }, { status: 400 })
    }

    const { questions, currentIdx, currentStep } = sessionState
    const currentQuestion = questions[currentIdx]

    // Determine current question text being answered
    const currentQuestionText = currentStep === "main"
      ? currentQuestion.question
      : currentQuestion.followUpQuestions[0]

    // Evaluate answer with advanced heuristics
    const evaluation = evaluateAnswer(
      message,
      currentQuestionText,
      currentQuestion.expectedConcepts,
      sessionState.difficulty,
      sessionState.probeState,
      sessionState.choicesMemory
    )

    // Save stack selections to session memory
    if (evaluation.extractedTech) {
      sessionState.choicesMemory.push(evaluation.extractedTech)
    }

    // Authenticity / Verification State Machine transitions
    if (sessionState.probeState === "NORMAL") {
      if (evaluation.isPolishedTextbook) {
        sessionState.probeState = "VERIFYING"
        sessionState.riskSignal = "MODERATE"
      }
    } else if (sessionState.probeState === "VERIFYING") {
      if (evaluation.score.depth < 40 || evaluation.score.accuracy < 40) {
        sessionState.probeState = "DEEP_PROBE"
        sessionState.understandingConfidence = "LOW"
        sessionState.riskSignal = "ELEVATED"
      } else {
        sessionState.probeState = "CONFIRMED"
        sessionState.understandingConfidence = "HIGH"
        sessionState.riskSignal = "LOW"
        sessionState.streak += 1
      }
    } else if (sessionState.probeState === "DEEP_PROBE") {
      if (evaluation.score.depth >= 65 && evaluation.score.accuracy >= 65) {
        sessionState.probeState = "CONFIRMED"
        sessionState.understandingConfidence = "MODERATE"
        sessionState.riskSignal = "LOW"
      }
    }

    // Adjust difficulty level dynamically based on performance score
    const turnAvg = Math.round((evaluation.score.depth + evaluation.score.accuracy + evaluation.score.reasoning) / 3)
    if (turnAvg >= 80) {
      sessionState.streak = Math.max(1, sessionState.streak + 1)
      if (sessionState.streak >= 2) {
        if (sessionState.difficulty === "EASY") sessionState.difficulty = "MEDIUM"
        else if (sessionState.difficulty === "MEDIUM") sessionState.difficulty = "HARD"
        else if (sessionState.difficulty === "HARD") sessionState.difficulty = "EXPERT"
        sessionState.streak = 0
      }
    } else if (turnAvg < 50) {
      sessionState.streak = Math.min(-1, sessionState.streak - 1)
      if (sessionState.streak <= -2) {
        if (sessionState.difficulty === "EXPERT") sessionState.difficulty = "HARD"
        else if (sessionState.difficulty === "HARD") sessionState.difficulty = "MEDIUM"
        else if (sessionState.difficulty === "MEDIUM") sessionState.difficulty = "EASY"
        sessionState.streak = 0
      }
    } else {
      sessionState.streak = 0
    }

    // Save eval turn log
    const newLog: EvalLog = {
      topic: currentQuestion.topic,
      question: currentQuestionText,
      isFollowUp: currentStep === "followup",
      answer: message,
      score: evaluation.score,
      guidance: evaluation.guidance,
      difficulty: sessionState.difficulty,
      probeState: sessionState.probeState
    }

    sessionState.logs.push(newLog)

    // Recalculate dynamic metrics
    const logCount = sessionState.logs.length
    const accumulated = sessionState.logs.reduce(
      (acc, val) => {
        acc.depth += val.score.depth
        acc.clarity += val.score.clarity
        acc.communication += val.score.communication
        acc.accuracy += val.score.accuracy
        acc.reasoning += val.score.reasoning
        acc.consistency += val.score.consistency
        acc.adaptability += val.score.adaptability
        return acc
      },
      { depth: 0, clarity: 0, communication: 0, accuracy: 0, reasoning: 0, consistency: 0, adaptability: 0 }
    )

    sessionState.metrics = {
      depth: Math.round(accumulated.depth / logCount),
      clarity: Math.round(accumulated.clarity / logCount),
      communication: Math.round(accumulated.communication / logCount),
      accuracy: Math.round(accumulated.accuracy / logCount),
      reasoning: Math.round(accumulated.reasoning / logCount),
      consistency: Math.round(accumulated.consistency / logCount),
      adaptability: Math.round(accumulated.adaptability / logCount)
    }

    // Process State transitions
    if (currentStep === "main") {
      // Transitioning to follow-up turn
      sessionState.currentStep = "followup"

      let followUpPrompt = currentQuestion.followUpQuestions[0]
      if (sessionState.probeState === "VERIFYING") {
        followUpPrompt = `Your answer covers the definitions. In production, how does this layout break under 100x traffic load, and what specific metric triggers your alerts?`
      } else if (sessionState.probeState === "DEEP_PROBE") {
        followUpPrompt = `Let's step back. Can you explain the fundamental mechanics of how data stays consistent in this design, without relying on automated caching keys?`
      } else if (evaluation.isContradiction) {
        followUpPrompt = `You chose ${evaluation.extractedTech} here, but earlier you specified using a different data consistency schema. How do you reconcile these two design constraints?`
      }

      sessions.set(sessionId, sessionState)

      const challengerPrefix = sessionState.personality === "challenger" ? "That choice introduces compromises. " : "Interesting approach. "

      return NextResponse.json({
        reply: `${challengerPrefix}Let's probe this decision: ${followUpPrompt}`,
        done: false,
        metrics: sessionState.metrics,
        logs: sessionState.logs,
        difficulty: sessionState.difficulty,
        understandingConfidence: sessionState.understandingConfidence,
        riskSignal: sessionState.riskSignal,
        probeState: sessionState.probeState
      })
    } else {
      // Completed follow-up turn. Move to next topic/question, or finish.
      if (currentIdx < questions.length - 1) {
        sessionState.currentIdx = currentIdx + 1
        sessionState.currentStep = "main"

        const rawNextQ = questions[currentIdx + 1]
        
        // Generate adaptive properties for the next base question
        const adaptiveProperties = buildAdaptiveQuestion(
          rawNextQ,
          sessionState.difficulty,
          sessionState.role,
          sessionState.mode,
          sessionState.personality,
          sessionState.choicesMemory
        )

        // Inject adapted values
        sessionState.questions[currentIdx + 1] = {
          ...rawNextQ,
          question: adaptiveProperties.question,
          expectedConcepts: adaptiveProperties.expectedConcepts,
          followUpQuestions: adaptiveProperties.followUpQuestions
        }

        sessions.set(sessionId, sessionState)

        const nextAdaptedQ = sessionState.questions[currentIdx + 1]
        const prefix = sessionState.personality === "mentor" 
          ? "Understood. Let's move onto our next topic area, " 
          : "Okay. Moving to the next focus area, which is "

        return NextResponse.json({
          reply: `${prefix}${nextAdaptedQ.topic}:\n\n${nextAdaptedQ.question}`,
          done: false,
          metrics: sessionState.metrics,
          logs: sessionState.logs,
          difficulty: sessionState.difficulty,
          understandingConfidence: sessionState.understandingConfidence,
          riskSignal: sessionState.riskSignal,
          probeState: sessionState.probeState
        })
      } else {
        // Natural complete turn (all questions finished)
        const finalScore = Math.round(
          (sessionState.metrics.depth +
            sessionState.metrics.accuracy +
            sessionState.metrics.reasoning +
            sessionState.metrics.consistency +
            sessionState.metrics.adaptability) / 5
        )

        // Dynamic feedback content builders based on metrics
        const strengths: string[] = []
        if (sessionState.metrics.depth >= 75) {
          strengths.push(`Deep Technical Depth: Excellent understanding of trade-offs in ${questions[0].topic} and ${questions[1].topic}.`)
        } else {
          strengths.push(`Conceptual Breadth: Standard understanding of design properties in ${questions[0].topic}.`)
        }
        if (sessionState.metrics.consistency >= 75) {
          strengths.push("Architecture Consistency: Demonstrated logical coherence across the entire engineering session.")
        }

        const gaps: string[] = []
        if (sessionState.metrics.accuracy < 70) {
          gaps.push(`Terminology Gaps: Missing key specifications in ${questions[2].topic} and ${questions[3].topic}.`)
        }
        if (sessionState.understandingConfidence === "LOW") {
          gaps.push("Understanding Verification: Unable to explain system behaviors during edge-case validation probes.")
        } else if (sessionState.metrics.adaptability < 70) {
          gaps.push("Architectural Adaptability: Showed rigidity when asked to modify caching or network topologies.")
        }

        const next: string[] = [
          `Review the official day curriculum objectives for day ${questions[2].day} and day ${questions[3].day}.`,
          "Practice building offline sandbox systems to verify rate-limiting failure constraints."
        ]

        const summary = `${sessionState.candidateName} completed the PrepPilot adaptive evaluation under ${sessionState.mode.toUpperCase()} mode. They demonstrated an overall readiness index of ${finalScore}%, with ${sessionState.understandingConfidence} confidence in their verification probes.`

        sessions.delete(sessionId)

        return NextResponse.json({
          reply: "Interview completed.",
          done: true,
          metrics: sessionState.metrics,
          logs: sessionState.logs,
          difficulty: sessionState.difficulty,
          understandingConfidence: sessionState.understandingConfidence,
          riskSignal: sessionState.riskSignal,
          probeState: sessionState.probeState,
          feedback: {
            summary,
            strengths,
            gaps,
            next
          }
        })
      }
    }
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
