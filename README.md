# PrepPilot: AI Technical Interview Preparation Agent

PrepPilot is a technical interview practice application built for the **AI Cohort Hackathon**. It dynamically conducts technical interviews based on a candidate's learning journey, evaluates their performance in real-time across key dimensions, and serves a post-interview feedback dashboard.

---

## Features

- **Home & Candidate Selection**: Displays candidates dynamically imported from the official `candidates.json` dataset.
- **Dynamic Curriculum Alignment**: Reads the cohort's `curriculum.json` and selects 4 distinct modules completed by the candidate to form a custom question set.
- **8-Question Conversational Flow**: Asks a main question followed by a reactive follow-up query for each of the 4 topics (satisfying the 8-question minimum rule).
- **Real-Time Evaluation Console**: Evaluates responses for **Technical Depth**, **Logical Clarity**, and **Communication Quality** with live visual indicators.
- **HTTP Endpoint Spec Alignment**: Exposes the required `POST /api/interview` route for session setup, conversational turns, and structured feedback output.
- **Post-Session Dashboard**: Showcases overall readiness index, granular scores, strengths, focus gaps, resource recommendations, and turn-by-turn transcript reviews.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (micro-animations), Lucide React (icons)
- **UI Architecture**: shadcn/ui

---

## Project Structure

```
PrepPilot/
├── app/
│   ├── api/
│   │   └── interview/
│   │       └── route.ts         # Spec-compliant POST handler
│   ├── candidate/
│   │   └── page.tsx             # Candidate Profile details
│   ├── feedback/
│   │   └── page.tsx             # Performance feedback dashboard
│   ├── interview/
│   │   └── page.tsx             # Interactive chat console
│   ├── globals.css              # Global styles & Tailwind tokens
│   ├── layout.tsx
│   └── page.tsx                 # Candidate list selection
├── components/
│   ├── candidate/
│   │   └── candidate-card.tsx
│   ├── feedback/
│   │   └── feedback-dashboard.tsx
│   ├── interview/
│   │   └── interview-console.tsx
│   └── layout/
│       ├── site-footer.tsx
│       └── site-header.tsx
├── data/
│   ├── candidates.ts            # Maps candidates.json profiles
│   └── interview-questions.ts   # Dynamic question matching engine
├── candidates.json              # Official Hackathon candidates list
├── curriculum.json              # Official Hackathon curriculum details
└── technical-spec.md            # Hackathon API specification
```

---

## API Documentation

### `POST /api/interview`

Exposes the required backend endpoint for interview automation.

#### 1. Start Session
```json
POST /api/interview
{
  "sessionId": "session-xyz",
  "candidate": {
    "member": {
      "id": "CAND-001",
      "name": "Sarah Johnson"
    }
  }
}
```

#### 2. Turn Message
```json
POST /api/interview
{
  "sessionId": "session-xyz",
  "message": "Text embeddings represent semantic meaning as dense vectors in high-dimensional space..."
}
```

#### 3. Output Feedback
When the 8-turn interview completes, it returns `done: true` alongside structured feedback:
```json
{
  "reply": "Interview completed.",
  "done": true,
  "feedback": {
    "summary": "Demonstrated a solid grasp of text embeddings and vector search metrics.",
    "strengths": ["Clear explanation of dense retrieval concepts."],
    "gaps": ["Could expand on vector database indexing scaling policies."],
    "next": ["Review the indexing objectives on curriculum day 8."]
  }
}
```
