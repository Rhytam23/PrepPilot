export type Candidate = {
  id: string
  name: string
  role: string
  skillLevel: string
  completedTopics: string[]
  pendingTopics: string[]
  readinessScore: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

export type EvalLog = {
  topic: string
  question: string
  isFollowUp: boolean
  answer: string
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
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT"
  probeState: "NORMAL" | "VERIFYING" | "DEEP_PROBE" | "CONFIRMED"
}

export type SessionPayload = {
  candidateId: string
  sessionId: string
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
  finalScore: number
  timestamp: string
  completed: boolean
  mode: "quick" | "technical" | "deep_dive" | "system_design" | "debugging" | "behavioral"
  personality: "mentor" | "interviewer" | "challenger" | "designer"
  role: string
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT"
  understandingConfidence: "LOW" | "MODERATE" | "HIGH"
  riskSignal: "LOW" | "MODERATE" | "ELEVATED"
  dnaProfile?: {
    strongest: string
    developing: string
    weakest: string
  }
  masteryMap?: Record<string, number>
}
