import type { Candidate } from "@/types/candidate"
import candidatesData from "../candidates.json"

interface Mission {
  day: number
  title: string
  passed?: boolean
  skipped?: boolean
  attempts?: number
}

export const candidates: Candidate[] = candidatesData.candidates.map((cand) => {
  const years = cand.member.yearsExperience
  const skillLevel = years >= 8 ? "Senior" : years >= 4 ? "Mid-Level" : "Junior"
  const difficulty: "Beginner" | "Intermediate" | "Advanced" = 
    years >= 8 ? "Advanced" : years >= 4 ? "Intermediate" : "Beginner"
  
  const completedTopics = cand.missions
    .filter((m: Mission) => m.passed)
    .map((m: Mission) => m.title)
  
  const pendingTopics = cand.missions
    .filter((m: Mission) => m.skipped || !m.passed)
    .map((m: Mission) => m.title)
    
  // Dynamic score based on missions completed and commit days
  const readinessScore = Math.round(
    (cand.signals.missionsCompleted / 31) * 70 + (cand.signals.commitDays / 31) * 30
  )

  return {
    id: cand.member.id,
    name: cand.member.name,
    role: cand.member.jobRole,
    skillLevel,
    completedTopics,
    pendingTopics: pendingTopics.length > 0 ? pendingTopics : ["Advanced Observability", "Multi-region Deployments"],
    readinessScore: Math.min(100, Math.max(40, readinessScore)),
    difficulty
  }
})
