import candidatesData from "../candidates.json"
import curriculumData from "../curriculum.json"

export type Question = {
  id: string
  day: number
  topic: string
  question: string
  expectedConcepts: string[]
  evaluationCriteria: string
  followUpQuestions: string[]
  improvementGuidance: string
}

// Hand-crafted premium questions database for core days
const premiumQuestions: Record<number, Omit<Question, "id" | "day" | "topic">> = {
  7: {
    question: "Explain what text embeddings are, how cosine similarity measures their relationship, and why vector dimensions matter.",
    expectedConcepts: ["embedding", "cosine similarity", "vector", "dimension", "semantic", "high-dimensional"],
    evaluationCriteria: "The candidate should specify that text embeddings represent semantic meaning as dense vectors in a high-dimensional space. Cosine similarity calculates the cosine of the angle between two vectors, ranging from -1 to 1, focusing on orientation rather than magnitude. More dimensions capture finer semantic details, but increase storage and indexing cost.",
    followUpQuestions: ["If two sentences contain completely different words but the same meaning, how does the embedding model capture this?"],
    improvementGuidance: "Make sure to frame embeddings as capturing semantic meaning rather than word matches. Explain cosine similarity mathematically as the dot product divided by the magnitude product."
  },
  8: {
    question: "What is a vector database (like Pinecone), how does it index vectors, and what distance metrics (Euclidean, Cosine) would you choose for search?",
    expectedConcepts: ["Pinecone", "index", "distance", "metric", "cosine", "euclidean", "HNSW", "search"],
    evaluationCriteria: "Should define vector databases as engines optimized for fast K-Nearest Neighbor similarity search using indexes like HNSW or IVF. They should contrast Euclidean distance (good for absolute magnitudes) with Cosine distance (standard for text embeddings because it normalizes lengths).",
    followUpQuestions: ["How does vector index scaling affect search latency and retrieval recall rates in production?"],
    improvementGuidance: "Focus on how approximate nearest neighbor (ANN) indexes trade off 100% search accuracy (recall) for millisecond latency."
  },
  10: {
    question: "How would you design a retrieval matching engine? What is the difference between dense retrieval and hybrid search?",
    expectedConcepts: ["dense", "hybrid", "search", "retrieval", "keyword", "bm25", "sparse", "re-rank"],
    evaluationCriteria: "A strong answer should explain that sparse search (BM25/keyword) looks for exact string matches, whereas dense search (embeddings) looks for semantic meaning. Hybrid search combines both scores (often using Reciprocal Rank Fusion) to get the best of both. Re-ranking is a secondary step utilizing a cross-encoder model to sort the top retrieval candidates.",
    followUpQuestions: ["When would you introduce a re-ranking model into your retrieval pipeline, and what is the latency trade-off?"],
    improvementGuidance: "Clearly separate the two retrieval phases: candidate generation (fast, high recall) and re-ranking (slower, high precision)."
  },
  12: {
    question: "Explain Prompt Engineering. Contrast zero-shot prompting with few-shot prompting and Chain-of-Thought (CoT).",
    expectedConcepts: ["zero-shot", "few-shot", "chain-of-thought", "CoT", "prompt", "examples", "reasoning"],
    evaluationCriteria: "Explain that zero-shot prompts ask for a direct reply without examples; few-shot prompts supply inputs and expected outputs to guide LLM style; Chain-of-Thought prompts instruct the model to output its step-by-step reasoning steps before the final answer, which improves accuracy on logical tasks.",
    followUpQuestions: ["How do you protect your system prompts from jailbreaks or prompt leakage when users try to override instructions?"],
    improvementGuidance: "Highlight that Chain-of-Thought exposes the model's 'thinking path' which guides the token generation parameters towards logical consistency."
  },
  13: {
    question: "How does function calling and structured outputs work in LLMs? How do you ensure the model responds in a valid JSON schema?",
    expectedConcepts: ["function calling", "JSON schema", "tool", "arguments", "parsing", "validation", "structured outputs"],
    evaluationCriteria: "The candidate must explain that the developer provides a JSON schema defining function names and arguments. The LLM outputs a structured payload requesting a function call, rather than executing the code itself. The application executes the function and sends the result back to the LLM to complete the turn.",
    followUpQuestions: ["What does the model actually output when it triggers a tool call, and who executes the function?"],
    improvementGuidance: "Explicitly mention that the LLM is just a text generator; it cannot execute functions directly. It is the host client application that parses the argument strings and invokes the local codebase APIs."
  },
  16: {
    question: "How would you design a FastAPI backend to support real-time chatbot interactions? How do you manage API routing and connection states?",
    expectedConcepts: ["FastAPI", "route", "endpoint", "connection", "async", "coroutine", "Pydantic", "routing"],
    evaluationCriteria: "Should propose asynchronous endpoints (`async def`) to handle concurrent client requests without blocking the thread pool. Pydantic schemas validate inputs/outputs. Connection states can be tracked using middleware or dependency injection, and persistent state can be synced to a DB or memory cache.",
    followUpQuestions: ["How do you handle rate-limiting and client request timeouts in a FastAPI chat server?"],
    improvementGuidance: "Stress using `async` keywords. Explain how blocking execution loops in FastAPI block the single-threaded event loop, slowing down concurrent requests."
  },
  20: {
    question: "How do you handle conversation memory and context management in long-running chatbot sessions? What are the tradeoffs of token summarization?",
    expectedConcepts: ["memory", "context", "token", "summarization", "buffer", "window", "state", "management"],
    evaluationCriteria: "Should explain memory strategies: Buffer memory (full log, high cost/tokens), window memory (last N messages, loses long-term memory), and summary memory (LLM condenses old turns into a system variable). The tradeoff is detail loss vs token cost limits.",
    followUpQuestions: ["How do you prevent context window overflow when conversations span hundreds of messages?"],
    improvementGuidance: "Compare buffer window limits to summarizing memory. Propose hybrid approaches (keeping recent messages in full, summarizing everything older)."
  },
  22: {
    question: "Explain multi-agent orchestration. What is the difference between hierarchical routing (supervisor) and sequential handoffs?",
    expectedConcepts: ["multi-agent", "orchestration", "supervisor", "handoff", "routing", "LangGraph", "state"],
    evaluationCriteria: "Must detail sequential handoff (Agent A passes context to Agent B, fixed flow) vs hierarchical routing (a supervisor LLM agent assesses state and decides which worker agent to call next). Mention maintaining shared graph state in platforms like LangGraph.",
    followUpQuestions: ["How do you prevent agents from getting stuck in infinite loops when passing tasks back and forth?"],
    improvementGuidance: "Explain how shared graphs coordinate state. Propose recursion limiters (e.g. max 10 steps) to terminate loops when agents ping-pong indefinitely."
  },
  23: {
    question: "What is Model Context Protocol (MCP)? How does it bridge the gap between LLM agents and external databases or local systems?",
    expectedConcepts: ["MCP", "protocol", "context", "server", "client", "schemas", "bridge", "data source"],
    evaluationCriteria: "Explain MCP as an open standard protocol enabling LLM applications (clients) to securely connect to diverse data servers (servers) presenting resources, tools, and prompts under a unified interface, replacing ad-hoc tool configurations.",
    followUpQuestions: ["How does context mapping change when using MCP compared to standard custom tool calls?"],
    improvementGuidance: "Define MCP as analogous to LSP (Language Server Protocol) but for AI models, separating integration endpoints from client reasoning engines."
  },
  28: {
    question: "Explain how you would containerize and deploy an AI system using Docker and Kubernetes. How do you scale pod configurations for heavy workloads?",
    expectedConcepts: ["Docker", "Kubernetes", "container", "pod", "scale", "deployment", "workload", "resource limits"],
    evaluationCriteria: "Detail packaging the application and models in a Dockerfile, deploying to Kubernetes pods, setting resource limits (CPU/GPU boundaries), and utilizing Horizontal Pod Autoscalers (HPA) to scale replicas based on target metrics.",
    followUpQuestions: ["How do you manage persistent vector index updates in a distributed stateful Kubernetes cluster?"],
    improvementGuidance: "Frame Docker as the container runtime and Kubernetes as the orchestrator. Discuss scaling GPU workloads and caching large model weights on nodes to avoid long startup times."
  },
  31: {
    question: "Explain the architecture of your cohort capstone project. What technical decisions did you make, and how did you verify production readiness?",
    expectedConcepts: ["architecture", "capstone", "database", "evaluation", "readiness", "observability", "metrics"],
    evaluationCriteria: "Should describe their project structure (RAG, agent loops, DB choices), deployment details, and how they evaluated performance (precision, latency, cost metrics). Show clear choices for prompt evaluations and latency bounds.",
    followUpQuestions: ["What was the most surprising bottleneck in your capstone, and how did you resolve it?"],
    improvementGuidance: "Detail production checks: logging (traces), evaluation test runs (Ragas/G-Eval), and prompt caching to reduce token overhead."
  }
}

// Function to generate/retrieve questions for any candidate dynamically
export function getQuestionsForCandidate(candidateId: string): Question[] {
  // Load candidate
  const candidate = candidatesData.candidates.find((c) => c.member.id === candidateId) || candidatesData.candidates[0]
  
  // Find completed days (where passed = true)
  const completedMissions = candidate.missions.filter((m: any) => m.passed)
  
  // Pick up to 5 completed days. To ensure we have variety, select them from different day ranges
  // If not enough days completed, fallback to any available completed days
  const selectedDays: number[] = []
  
  // Target a diverse set of days if possible
  const preferredDays = [7, 8, 10, 12, 13, 16, 20, 22, 23, 28, 31]
  const completedPreferred = completedMissions
    .map((m: any) => m.day)
    .filter((day: number) => preferredDays.includes(day))

  // Populate from preferred completed days
  completedPreferred.forEach((d) => {
    if (selectedDays.length < 5) selectedDays.push(d)
  })

  // If still under 5, fill from other completed days
  completedMissions.forEach((m: any) => {
    if (selectedDays.length < 5 && !selectedDays.includes(m.day)) {
      selectedDays.push(m.day)
    }
  })

  // Defensive fallback: if candidate completed very few days, fill up with general curriculum days from preferred list
  if (selectedDays.length < 4) {
    preferredDays.forEach((d) => {
      if (selectedDays.length < 4 && !selectedDays.includes(d)) {
        selectedDays.push(d)
      }
    })
  }

  // Map each selected day to a Question
  const candidateQuestions: Question[] = selectedDays.map((dayNum, index) => {
    const dayMeta = curriculumData.days.find((d: any) => d.day === dayNum) || curriculumData.days[0]
    
    // Check if we have a premium handcrafted question
    if (premiumQuestions[dayNum]) {
      return {
        id: `q-${candidate.member.id}-${dayNum}`,
        day: dayNum,
        topic: dayMeta.title,
        ...premiumQuestions[dayNum]
      }
    }

    // Dynamic question generation fallback for general days
    const toolsText = dayMeta.tools.length > 0 ? ` using ${dayMeta.tools.slice(0, 3).join(", ")}` : ""
    const objective = dayMeta.objectives[0] || "achieve the core topics"
    
    return {
      id: `q-${candidate.member.id}-${dayNum}`,
      day: dayNum,
      topic: dayMeta.title,
      question: `Explain how you approached ${dayMeta.title}${toolsText} during the cohort, specifically to: ${objective}.`,
      expectedConcepts: dayMeta.tools.concat(dayMeta.title.split(" ")).map(s => s.toLowerCase()).filter(s => s.length > 3),
      evaluationCriteria: `Candidate should outline the design choices, tools used, and implementation details for Day ${dayNum} objective: ${objective}.`,
      followUpQuestions: [`What was the most challenging part of implementing this setup, and how did you debug it?`],
      improvementGuidance: `Focus on detailing the exact commands, configuration configurations, and architecture adjustments made to complete the objectives.`
    }
  })

  return candidateQuestions
}
