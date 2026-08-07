import type { Candidate } from "@/types/candidate"

export const candidates: Candidate[] = [
  {
    id: "maya-sharma",
    name: "Maya Sharma",
    role: "Frontend Engineer",
    skillLevel: "Intermediate",
    completedTopics: ["React Patterns", "TypeScript", "Accessibility"],
    pendingTopics: ["System Design", "Performance"],
    readinessScore: 82,
    difficulty: "Intermediate",
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Backend Engineer",
    skillLevel: "Advanced",
    completedTopics: ["APIs", "Databases", "Caching"],
    pendingTopics: ["Distributed Systems", "Observability"],
    readinessScore: 88,
    difficulty: "Advanced",
  },
  {
    id: "nina-patel",
    name: "Nina Patel",
    role: "Full Stack Engineer",
    skillLevel: "Intermediate",
    completedTopics: ["Next.js", "Node.js", "Authentication"],
    pendingTopics: ["Scaling", "Testing Strategy"],
    readinessScore: 76,
    difficulty: "Intermediate",
  },
  {
    id: "dev-iyer",
    name: "Dev Iyer",
    role: "Software Engineer Intern",
    skillLevel: "Beginner",
    completedTopics: ["JavaScript", "Data Structures"],
    pendingTopics: ["Algorithms", "Debugging", "Communication"],
    readinessScore: 64,
    difficulty: "Beginner",
  },
]
