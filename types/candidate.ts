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
