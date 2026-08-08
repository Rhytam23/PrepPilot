import { NextResponse } from "next/server"
import { getQuestionsForCandidate, Question } from "@/data/interview-questions"

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
  }
}

// Global server-side in-memory session store
const sessions = new Map<string, SessionState>()

// Helper to evaluate responses (similar to client side)
function evaluateAnswer(answer: string, questionObj: Question): {
  score: { depth: number; clarity: number; communication: number }
  guidance: string
} {
  const cleanAnswer = answer.trim()
  if (cleanAnswer.length < 10) {
    return {
      score: { depth: 15, clarity: 20, communication: 30 },
      guidance: "The answer is too brief to evaluate. Please provide a more detailed engineering explanation with technical reasoning and concrete examples.",
    }
  }

  // Evaluate Depth
  let matchedConcepts: string[] = []
  questionObj.expectedConcepts.forEach((concept) => {
    if (cleanAnswer.toLowerCase().includes(concept.toLowerCase())) {
      matchedConcepts.push(concept)
    }
  })

  const keywordRatio = questionObj.expectedConcepts.length > 0 
    ? matchedConcepts.length / questionObj.expectedConcepts.length 
    : 1
  
  let depthBase = keywordRatio * 85
  const lengthBonus = Math.min(cleanAnswer.length / 350, 1) * 15
  let depth = Math.min(100, Math.round(depthBase + lengthBonus))

  // Evaluate Clarity
  const transitions = ["however", "therefore", "because", "since", "while", "whereas", "first", "second", "then", "next", "finally", "for instance", "for example", "contrast", "specifically"]
  let transitionCount = 0
  transitions.forEach((word) => {
    if (cleanAnswer.toLowerCase().includes(word)) transitionCount++
  })

  const sentences = cleanAnswer.split(/[.!?]+/).filter(s => s.trim().length > 0)
  let clarity = 60
  if (transitionCount >= 2) clarity += 15
  if (sentences.length >= 2) clarity += 15
  clarity = Math.min(100, clarity)

  // Evaluate Communication
  const examples = ["for example", "e.g.", "such as", "like", "in my experience", "specifically", "scenario", "production"]
  let hasExample = false
  examples.forEach((word) => {
    if (cleanAnswer.toLowerCase().includes(word)) hasExample = true
  })

  let communication = 65
  if (hasExample) communication += 15
  if (cleanAnswer.length > 120) communication += 15
  communication = Math.min(100, communication)

  return {
    score: { depth, clarity, communication },
    guidance: questionObj.improvementGuidance,
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
      // Map candidate id
      const candidateId = candidate.id || "CAND-001"
      const candidateName = candidate.name || "Sarah Johnson"
      const candidateRole = candidate.jobRole || "Senior Data Engineer"

      // Generate dynamic questions based on completed missions
      const candidateQuestions = getQuestionsForCandidate(candidateId)

      // Initialize session state
      const newState: SessionState = {
        candidateId,
        candidateName,
        candidateRole,
        questions: candidateQuestions,
        currentIdx: 0,
        currentStep: "main",
        logs: [],
        metrics: { depth: 0, clarity: 0, communication: 0 }
      }

      sessions.set(sessionId, newState)

      const initialQ = candidateQuestions[0]
      const welcomeMessage = `Welcome, ${candidateName}. I'm your AI Interviewer. Today, we'll evaluate your engineering experience across the curriculum. Let's start with a question on ${initialQ.topic}:\n\n${initialQ.question}`

      return NextResponse.json({
        reply: welcomeMessage,
        done: false
      })
    }

    // 2. Conversation Turn
    const sessionState = sessions.get(sessionId)
    if (!sessionState) {
      return NextResponse.json({ error: "Session not found. Please start the interview with the candidate object first." }, { status: 400 })
    }

    const { message } = body
    if (!message) {
      return NextResponse.json({ error: "Missing message parameter" }, { status: 400 })
    }

    const { questions, currentIdx, currentStep, logs } = sessionState
    const currentQuestion = questions[currentIdx]

    // Evaluate message response
    const evaluation = evaluateAnswer(message, currentQuestion)

    const currentQuestionText = currentStep === "main"
      ? currentQuestion.question
      : currentQuestion.followUpQuestions[0]

    // Create log turn
    const newLog: EvalLog = {
      topic: currentQuestion.topic,
      question: currentQuestionText,
      isFollowUp: currentStep === "followup",
      answer: message,
      score: evaluation.score,
      guidance: evaluation.guidance
    }

    sessionState.logs.push(newLog)

    // Recalculate metrics
    const logCount = sessionState.logs.length
    const accumulated = sessionState.logs.reduce(
      (acc, val) => {
        acc.depth += val.score.depth
        acc.clarity += val.score.clarity
        acc.communication += val.score.communication
        return acc
      },
      { depth: 0, clarity: 0, communication: 0 }
    )

    sessionState.metrics = {
      depth: Math.round(accumulated.depth / logCount),
      clarity: Math.round(accumulated.clarity / logCount),
      communication: Math.round(accumulated.communication / logCount)
    }

    // Transition state
    if (currentStep === "main") {
      sessionState.currentStep = "followup"
      const followUpQ = currentQuestion.followUpQuestions[0]
      
      sessions.set(sessionId, sessionState)

      return NextResponse.json({
        reply: `Good point. Let's delve deeper into this: ${followUpQ}`,
        done: false
      })
    } else {
      // Completed follow-up, advance idx or wrap up
      if (currentIdx < questions.length - 1) {
        sessionState.currentIdx = currentIdx + 1
        sessionState.currentStep = "main"
        
        sessions.set(sessionId, sessionState)
        
        const nextQ = questions[currentIdx + 1]
        return NextResponse.json({
          reply: `Understood. Let's move on to the next focus topic, which is ${nextQ.topic}:\n\n${nextQ.question}`,
          done: false
        })
      } else {
        // All questions completed!
        const finalScore = Math.round((sessionState.metrics.depth + sessionState.metrics.clarity + sessionState.metrics.communication) / 3)
        
        // Generate feedback details
        const summary = `${sessionState.candidateName} completed the AI Cohort personalized evaluation, scoring an overall readiness index of ${finalScore}%. They showed solid knowledge across the curriculum.`

        const strengths = [
          `Technical Depth: Demonstrated good grasp of core concepts in ${questions[0].topic} and ${questions[1].topic}.`,
          `Logical Clarity: Response structure included transition parameters and clear explanations.`
        ]

        const gaps = [
          `Focus Topics: Could expand further on advanced tradeoffs in ${questions[2].topic} and ${questions[3].topic}.`
        ]

        const next = [
          `Review the official daily objectives in curriculum days ${questions[2].day} and ${questions[3].day}.`,
          `Practice building end-to-end sandbox integrations for real-time streaming interfaces.`
        ]

        // Clean up session memory
        sessions.delete(sessionId)

        return NextResponse.json({
          reply: "Interview completed.",
          done: true,
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
