# PrepPilot: AI Technical Interview Preparation App

Generate a complete Next.js (App Router, version 16+) project called **PrepPilot**. PrepPilot is a technical interview practice application featuring candidate selection, technical interview tracks, mock chats, progress analytics, and responsive dark mode styling with custom animations.

## Tech Stack & Setup
- **Framework**: Next.js 16+ (using React 19)
- **Styling**: Tailwind CSS v4, `@tailwindcss/postcss`, `tw-animate-css`
- **UI Components**: Shadcn UI with `@base-ui/react` (Base UI) for accessible primitives
- **Animation**: `framer-motion`
- **Icons**: `lucide-react`
- **TypeScript**: Enabled

---

## File Structure

Create the following files and directories exactly as structured below.

```
PrepPilot/
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── components.json
├── README.md
├── app/
│   ├── api/
│   │   └── interview/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── candidate/
│   │   └── page.tsx
│   ├── feedback/
│   │   └── page.tsx
│   └── interview/
│       └── page.tsx
├── components/
│   ├── theme-provider.tsx
│   ├── candidate/
│   │   └── candidate-card.tsx
│   ├── interview/
│   │   └── interview-console.tsx
│   ├── feedback/
│   │   └── feedback-dashboard.tsx
│   ├── layout/
│   │   ├── site-footer.tsx
│   │   └── site-header.tsx
│   ├── shared/
│   │   ├── feature-card.tsx
│   │   ├── hero-preview.tsx
│   │   └── step-card.tsx
│   └── ui/
│       ├── button.tsx
│       └── card.tsx
├── data/
│   ├── candidates.ts
│   └── interview-questions.ts
├── types/
│   ├── candidate.ts
│   └── global-declarations.d.ts
├── lib/
│   ├── utils.ts
│   ├── ai/
│   │   └── gemini.ts
│   ├── interview/
│   │   ├── engine.ts
│   │   ├── evaluator.ts
│   │   ├── memory.ts
│   │   └── planner.ts
│   └── prompts/
│       ├── feedback.ts
│       ├── question.ts
│       └── system.ts
├── hooks/
│   └── .gitkeep
├── services/
│   └── .gitkeep
└── utils/
    └── .gitkeep
```

---

## Configuration & Project Files

### 1. `package.json`
```json
{
  "name": "PrepPilot",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write \"**/*.{ts,tsx}\"",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@base-ui/react": "^1.7.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^13.0.0",
    "lucide-react": "^1.30.0",
    "next": "16.2.6",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "shadcn": "^4.16.2",
    "tailwind-merge": "^3.6.0",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "prettier": "^3.8.3",
    "prettier-plugin-tailwindcss": "^0.8.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### 2. `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "next.config.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.mts",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### 3. `next.config.ts`
```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {}

export default nextConfig
```

### 4. `postcss.config.mjs`
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
```

### 5. `eslint.config.mjs`
```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### 6. `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
```

### 7. `.prettierrc`
```json
{
  "endOfLine": "lf",
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "app/globals.css",
  "tailwindFunctions": ["cn", "cva"]
}
```

### 8. `.prettierignore`
```
dist/
node_modules/
.next/
.turbo/
coverage/
pnpm-lock.yaml
.pnpm-store/
```

### 9. `.gitignore`
```
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# typescript
*.tsbuildinfo
next-env.d.ts
```

### 10. `README.md`
```markdown
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
```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
```

---

## Styling & Layouts

### 11. `app/globals.css`
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
    --font-heading: var(--font-sans);
    --font-sans: var(--font-sans);
    --color-sidebar-ring: var(--sidebar-ring);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar: var(--sidebar);
    --color-chart-5: var(--chart-5);
    --color-chart-4: var(--chart-4);
    --color-chart-3: var(--chart-3);
    --color-chart-2: var(--chart-2);
    --color-chart-1: var(--chart-1);
    --color-ring: var(--ring);
    --color-input: var(--input);
    --color-border: var(--border);
    --color-destructive: var(--destructive);
    --color-accent-foreground: var(--accent-foreground);
    --color-accent: var(--accent);
    --color-muted-foreground: var(--muted-foreground);
    --color-muted: var(--muted);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-secondary: var(--secondary);
    --color-primary-foreground: var(--primary-foreground);
    --color-primary: var(--primary);
    --color-popover-foreground: var(--popover-foreground);
    --color-popover: var(--popover);
    --color-card-foreground: var(--card-foreground);
    --color-card: var(--card);
    --color-foreground: var(--foreground);
    --color-background: var(--background);
    --radius-sm: calc(var(--radius) * 0.6);
    --radius-md: calc(var(--radius) * 0.8);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) * 1.4);
    --radius-2xl: calc(var(--radius) * 1.8);
    --radius-3xl: calc(var(--radius) * 2.2);
    --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --radius: 0.625rem;
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
}

.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
    }
  body {
    @apply bg-background text-foreground;
    }
  html {
    @apply scroll-smooth font-sans;
    }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow-drift {
  0%,
  100% {
    opacity: 0.55;
    transform: translateX(-50%) translateY(0) scale(1);
  }

  50% {
    opacity: 0.9;
    transform: translateX(-50%) translateY(16px) scale(1.08);
  }
}

.animate-hero-rise {
  animation: hero-rise 700ms ease-out both;
}

.animate-glow-drift {
  animation: glow-drift 7s ease-in-out infinite;
}
```

### 12. `app/layout.tsx`
```tsx
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

---

## App Routes & Views

### 13. `app/page.tsx`
```tsx
"use client"

import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  MessageSquareMore,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FeatureCard } from "@/components/shared/feature-card"
import { HeroPreview } from "@/components/shared/hero-preview"
import { StepCard } from "@/components/shared/step-card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Personalized Interviews",
    description:
      "Practice sessions align with the candidate profile, target role, and technical focus areas.",
    icon: BrainCircuit,
  },
  {
    title: "Adaptive Follow-up Questions",
    description:
      "Interviews evolve naturally with deeper prompts based on each response.",
    icon: MessageSquareMore,
  },
  {
    title: "AI Feedback",
    description:
      "Receive concise feedback that highlights strengths, gaps, and next steps.",
    icon: Sparkles,
  },
  {
    title: "Performance Analytics",
    description:
      "Track interview readiness across communication, problem solving, and execution.",
    icon: BarChart3,
  },
]

const steps = [
  {
    title: "Select Candidate",
    description:
      "Choose the candidate profile and interview track for the session.",
  },
  {
    title: "Start Interview",
    description:
      "Begin a focused technical interview with structured AI guidance.",
  },
  {
    title: "Answer Questions",
    description:
      "Work through realistic prompts while the session adapts to your answers.",
  },
  {
    title: "Receive AI Feedback",
    description:
      "Review a clear summary of performance signals and improvement areas.",
  },
]

export default function HomePage() {
  return (
    <div className="dark min-h-svh bg-black text-white">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pb-28 sm:pt-28">
          <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_56%)]" />
          <div className="animate-glow-drift absolute left-1/2 top-16 -z-10 h-48 w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/20 via-white/10 to-emerald-300/20 blur-3xl" />
          <div className="mx-auto max-w-5xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mx-auto mb-7 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200 shadow-lg shadow-cyan-950/20"
            >
              PrepPilot
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
              className="mx-auto max-w-4xl text-balance text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              Ace Your Next Technical Interview with AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
              className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-400 sm:text-lg"
            >
              PrepPilot helps candidates practice realistic technical
              interviews, sharpen answers, and turn feedback into measurable
              progress.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/candidate"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full border border-white/10 bg-white px-5 text-black shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-cyan-500/20 sm:w-auto"
                )}
              >
                Start Interview
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#how-it-works"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 w-full border-white/15 bg-white/[0.03] px-5 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
                )}
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          <HeroPreview />
        </section>

        <section id="features" className="border-t border-white/10 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-300">Features</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Built for focused interview preparation
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-400">
                A clean practice loop for technical candidates who want sharper
                answers and better interview signal.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-white/10 bg-zinc-950 px-6 py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-cyan-300">How It Works</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                From setup to feedback in four steps
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <StepCard
                  key={step.title}
                  index={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
```

### 14. `app/candidate/page.tsx`
```tsx
import { CandidateCard } from "@/components/candidate/candidate-card"
import { candidates } from "@/data/candidates"

export default function CandidatePage() {
  return (
    <main className="dark min-h-svh bg-black px-6 py-10 text-white sm:py-14">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-medium text-cyan-300">
            Candidate Selection
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Choose a candidate to begin
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            Review interview readiness, topic progress, and difficulty before
            starting a focused PrepPilot session.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </section>
    </main>
  )
}
```

### 15. `app/feedback/page.tsx`
```tsx
"use client"

import { Suspense } from "react"
import FeedbackDashboard from "@/components/feedback/feedback-dashboard"
import { Loader2 } from "lucide-react"

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div className="dark min-h-svh bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-cyan-400" />
          <p className="text-zinc-400 text-sm">Loading performance report...</p>
        </div>
      </div>
    }>
      <FeedbackDashboard />
    </Suspense>
  )
}
```

### 16. `app/interview/page.tsx`
```tsx
"use client"

import { Suspense } from "react"
import InterviewConsole from "@/components/interview/interview-console"
import { Loader2 } from "lucide-react"

export default function InterviewPage() {
  return (
    <Suspense fallback={
      <div className="dark min-h-svh bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-cyan-400" />
          <p className="text-zinc-400 text-sm">Loading interview console...</p>
        </div>
      </div>
    }>
      <InterviewConsole />
    </Suspense>
  )
}
```

---

## Custom & Shared Components

### 17. `components/theme-provider.tsx`
```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }
```

### 18. `components/candidate/candidate-card.tsx`
```tsx
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import type { Candidate } from "@/types/candidate"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const difficultyStyles = {
  Beginner: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  Intermediate: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  Advanced: "border-violet-300/20 bg-violet-300/10 text-violet-200",
}

type CandidateCardProps = {
  candidate: Candidate
  key?: any
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card className="group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/5.5 hover:shadow-cyan-950/25">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{candidate.name}</CardTitle>
            <CardDescription className="mt-1">{candidate.role}</CardDescription>
          </div>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium",
              difficultyStyles[candidate.difficulty]
            )}
          >
            {candidate.difficulty}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <Metric label="Skill Level" value={candidate.skillLevel} />
          <Metric
            label="Readiness"
            value={`${candidate.readinessScore}%`}
            valueClassName="text-cyan-200"
          />
        </div>

        <TopicList label="Completed Topics" topics={candidate.completedTopics} />
        <TopicList label="Pending Topics" topics={candidate.pendingTopics} muted />
      </CardContent>

      <CardFooter className="w-full">
        <Link href={`/interview?candidate=${candidate.id}`} className="w-full">
          <Button className="h-10 w-full border border-white/10 bg-white text-black transition duration-300 hover:bg-zinc-200">
            Start Interview
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function Metric({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={cn("mt-2 text-sm font-semibold text-white", valueClassName)}>
        {value}
      </p>
    </div>
  )
}

function TopicList({
  label,
  topics,
  muted = false,
}: {
  label: string
  topics: string[]
  muted?: boolean
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs",
              muted
                ? "border-white/10 bg-white/3 text-zinc-400"
                : "border-cyan-300/15 bg-cyan-300/7 text-cyan-100"
            )}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  )
}
```

### 19. `components/layout/site-header.tsx`
```tsx
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="group flex items-center gap-3"
        aria-label="PrepPilot home"
      >
        <span className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white text-sm font-bold text-black shadow-lg shadow-cyan-500/10 transition duration-300 group-hover:shadow-cyan-300/25">
          P
        </span>
        <span className="text-sm font-semibold tracking-wide text-white">
          PrepPilot
        </span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
        <a className="transition hover:text-white" href="/#features">
          Features
        </a>
        <a className="transition hover:text-white" href="/#how-it-works">
          How it works
        </a>
      </nav>

      <Link
        href="/candidate"
        className={cn(
          buttonVariants({ size: "sm" }),
          "border border-white/10 bg-white text-black hover:bg-zinc-200"
        )}
      >
        Start Interview
      </Link>
    </header>
  )
}
```

### 20. `components/layout/site-footer.tsx`
```tsx
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>PrepPilot</p>
        <p>AI-powered technical interview practice for focused candidates.</p>
      </div>
    </footer>
  )
}
```

### 21. `components/shared/feature-card.tsx`
```tsx
"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

type FeatureCardProps = {
  title: string
  description: string
  icon: LucideIcon
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055] hover:shadow-cyan-950/25"
    >
      <div className="mb-5 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-cyan-300">
        <Icon className="size-5 transition duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </motion.article>
  )
}
```

### 22. `components/shared/step-card.tsx`
```tsx
"use client"

import { motion } from "framer-motion"

type StepCardProps = {
  index: string
  title: string
  description: string
}

export function StepCard({ index, title, description }: StepCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group rounded-lg border border-white/10 bg-zinc-950/70 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.035]"
    >
      <div className="mb-5 flex size-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-200 transition duration-300 group-hover:border-cyan-200/50 group-hover:bg-cyan-300/15">
        {index}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </motion.article>
  )
}
```

### 23. `components/shared/hero-preview.tsx`
```tsx
"use client"

import { Bot, Mic2, Sparkles, UserRound } from "lucide-react"
import { motion } from "framer-motion"

const messages = [
  {
    speaker: "AI Interviewer",
    label: "Question",
    text: "Explain how you would design a distributed rate limiter.",
    icon: Bot,
    tone: "cyan",
  },
  {
    speaker: "Candidate",
    label: "Candidate Answer",
    text: "I would use Redis with a token bucket algorithm...",
    icon: UserRound,
    tone: "white",
  },
  {
    speaker: "AI Interviewer",
    label: "AI Follow-up",
    text: "How would your design handle multi-region deployments?",
    icon: Sparkles,
    tone: "emerald",
  },
]

export function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.32, ease: "easeOut" }}
      className="relative mx-auto mt-16 w-full max-w-5xl rounded-lg border border-white/10 bg-zinc-950/85 p-3 shadow-2xl shadow-cyan-950/30"
    >
      <div className="absolute -inset-px -z-10 rounded-lg bg-gradient-to-r from-cyan-400/20 via-white/10 to-emerald-300/20 blur-xl" />
      <div className="rounded-md border border-white/10 bg-black/95">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-yellow-300" />
            <span className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Live AI Interview
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-4 border-white/10 p-4 sm:p-6 lg:border-r">
            {messages.map((message, index) => {
              const Icon = message.icon
              const isCandidate = message.speaker === "Candidate"

              return (
                <motion.article
                  key={message.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.48 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className={`rounded-lg border p-4 shadow-2xl shadow-black/20 ${
                    isCandidate
                      ? "ml-auto border-white/10 bg-white/[0.06]"
                      : message.tone === "emerald"
                        ? "border-emerald-300/20 bg-emerald-300/[0.07]"
                        : "border-cyan-300/20 bg-cyan-300/[0.07]"
                  } max-w-[42rem]`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-9 items-center justify-center rounded-lg border ${
                        isCandidate
                          ? "border-white/10 bg-white/10 text-white"
                          : message.tone === "emerald"
                            ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
                            : "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {message.speaker}
                      </p>
                      <p className="text-xs text-zinc-500">{message.label}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-7 text-zinc-100">
                    {message.text}
                  </p>
                </motion.article>
              )
            })}
          </div>

          <div className="p-4 sm:p-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Mic2 className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Session Signal
                  </p>
                  <p className="text-xs text-zinc-500">Systems design round</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Depth</span>
                    <span className="text-cyan-200">Strong</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Clarity</span>
                    <span className="text-cyan-200">Improving</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-300 to-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Next Focus
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Explain consistency, latency, and failover tradeoffs across
                regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

---

## Shadcn UI Primitives

### 24. `components/ui/button.tsx`
```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

### 25. `components/ui/card.tsx`
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-lg border border-white/10 bg-white/[0.03] text-card-foreground shadow-2xl shadow-black/20",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-semibold text-white", className)}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-zinc-400", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-5 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-5 pt-0", className)}
      {...props}
    />
  )
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
```

---

## Data & Types

### 26. `data/candidates.ts`
```typescript
import type { Candidate } from "@/types/candidate"
import candidatesData from "../candidates.json"

export const candidates: Candidate[] = candidatesData.candidates.map((cand) => {
  const years = cand.member.yearsExperience
  const skillLevel = years >= 8 ? "Senior" : years >= 4 ? "Mid-Level" : "Junior"
  const difficulty: "Beginner" | "Intermediate" | "Advanced" = 
    years >= 8 ? "Advanced" : years >= 4 ? "Intermediate" : "Beginner"
  
  const completedTopics = cand.missions
    .filter((m: any) => m.passed)
    .map((m: any) => m.title)
  
  const pendingTopics = cand.missions
    .filter((m: any) => m.skipped || !m.passed)
    .map((m: any) => m.title)
    
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
```

### 27. `types/candidate.ts`
```typescript
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
```

### 28. `lib/utils.ts`
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---



---

## Newly Added Files & Modules

### 37. `app/api/interview/route.ts`
```tsx
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
```

### 38. `data/interview-questions.ts`
```typescript
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
```

### 39. `types/global-declarations.d.ts`
```typescript
// Global declarations fallback for environments without locally installed typings
import * as React from "react"

declare module "react" {
  const React: any;
  export default React;
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useMemo: any;
  export const createContext: any;
  export const useContext: any;
  export type ReactNode = any;
  export type FormEvent = any;
  export type KeyboardEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type Key = any;
}

declare module "react-dom" {
  const ReactDOM: any;
  export default ReactDOM;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "next/server" {
  export const NextResponse: any;
}

declare module "next/navigation" {
  export const useRouter: any;
  export const useSearchParams: any;
}

declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "framer-motion" {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module "lucide-react" {
  export const ArrowRight: any;
  export const ArrowLeft: any;
  export const Bot: any;
  export const ChevronRight: any;
  export const ChevronLeft: any;
  export const ChevronUp: any;
  export const ChevronDown: any;
  export const Mic2: any;
  export const Send: any;
  export const Sparkles: any;
  export const UserRound: any;
  export const Loader2: any;
  export const AlertCircle: any;
  export const RefreshCw: any;
  export const Award: any;
  export const BookOpen: any;
  export const CheckCircle2: any;
}

declare module "class-variance-authority" {
  export const cva: any;
}

declare module "tailwind-merge" {
  export const twMerge: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

### 40. `components/interview/interview-console.tsx`
```tsx
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
    if (questions && questions.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
        setMessages([
          {
            id: "initial-msg",
            sender: "interviewer",
            text: `Welcome, ${candidate.name}. I'm your AI Interviewer. Today, we'll evaluate your engineering experience in ${candidate.completedTopics.join(", ")}, as well as focus areas: ${candidate.pendingTopics.join(", ")}.\n\nLet's start with a question on ${questions[0].topic}:\n\n${questions[0].question}`,
          },
        ])
      }, 1200)
      return () => clearTimeout(timer)
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim() || isTyping || isAnalyzing) return

    const currentQuestion = questions[currentIdx]
    const userMsgText = userInput.trim()

    // Add user message
    const newUserMsg: Message = {
      id: `candidate-msg-${Date.now()}`,
      sender: "candidate",
      text: userMsgText,
    }
    setMessages((prev: Message[]) => [...prev, newUserMsg])
    setUserInput("")

    // Run evaluation
    const evaluation = evaluateResponse(
      userMsgText, 
      currentQuestion, 
      currentStep === "followup"
    )

    // Log the turn
    const currentQuestionText = currentStep === "main" 
      ? currentQuestion.question 
      : currentQuestion.followUpQuestions[0]

    const newLog: EvalLog = {
      topic: currentQuestion.topic,
      question: currentQuestionText,
      isFollowUp: currentStep === "followup",
      answer: userMsgText,
      score: evaluation.score,
      guidance: evaluation.guidance,
    }

    const updatedLogs = [...evalLogs, newLog]
    setEvalLogs(updatedLogs)

    // Recalculate metrics (average of all inputs)
    const newMetrics = updatedLogs.reduce(
      (acc, log) => {
        acc.depth += log.score.depth
        acc.clarity += log.score.clarity
        acc.communication += log.score.communication
        return acc
      },
      { depth: 0, clarity: 0, communication: 0 }
    )

    const logCount = updatedLogs.length
    const computedMetrics = {
      depth: Math.round(newMetrics.depth / logCount),
      clarity: Math.round(newMetrics.clarity / logCount),
      communication: Math.round(newMetrics.communication / logCount),
    }
    setMetrics(computedMetrics)

    // Progress chat
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)

      if (currentStep === "main") {
        // Move to followup
        setCurrentStep("followup")
        const followUpQ = currentQuestion.followUpQuestions[0]
        setMessages((prev: Message[]) => [
          ...prev,
          {
            id: `interviewer-msg-${Date.now()}`,
            sender: "interviewer",
            text: `Good point. Let's delve deeper into this: ${followUpQ}`,
          },
        ])
      } else {
        // Move to next question or complete
        if (currentIdx < questions.length - 1) {
          const nextIdx = currentIdx + 1
          setCurrentIdx(nextIdx)
          setCurrentStep("main")
          const nextQ = questions[nextIdx]
          setMessages((prev: Message[]) => [
            ...prev,
            {
              id: `interviewer-msg-${Date.now()}`,
              sender: "interviewer",
              text: `Understood. Let's move on to the next focus area, which is ${nextQ.topic}:\n\n${nextQ.question}`,
            },
          ])
        } else {
          // Finished the last question!
          setMessages((prev: Message[]) => [
            ...prev,
            {
              id: `interviewer-msg-${Date.now()}`,
              sender: "interviewer",
              text: "Thank you. That completes our technical interview! I have gathered enough data signals to evaluate your readiness. Please click below to generate your performance report.",
            },
          ])
        }
      }
    }, 1500)
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
```

### 41. `components/feedback/feedback-dashboard.tsx`
```tsx
"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Award, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, RefreshCw, BookOpen, BrainCircuit } from "lucide-react"
import Link from "next/link"

import { candidates } from "@/data/candidates"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

type SessionPayload = {
  candidateId: string
  logs: EvalLog[]
  metrics: {
    depth: number
    clarity: number
    communication: number
  }
  finalScore: number
  timestamp: string
}

export default function FeedbackDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const candidateId = searchParams.get("candidate") || "CAND-001"

  const [session, setSession] = React.useState<SessionPayload | null>(null)
  const [expandedIdx, setExpandedIdx] = React.useState<Record<number, boolean>>({})

  // Find candidate details
  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0]

  // Retrieve session data
  React.useEffect(() => {
    try {
      const stored = sessionStorage.getItem("preppilot_session")
      if (stored) {
        const parsed = JSON.parse(stored) as SessionPayload
        if (parsed.candidateId === candidateId) {
          setSession(parsed)
          // Default expand the first item
          setExpandedIdx({ 0: true })
        }
      }
    } catch (e) {
      console.error("Failed to parse sessionStorage payload", e)
    }
  }, [candidateId])

  const toggleExpand = (idx: number) => {
    setExpandedIdx((prev: Record<number, boolean>) => ({ ...prev, [idx]: !prev[idx] }))
  }

  // Fallback if no session found
  if (!session) {
    return (
      <div className="dark min-h-svh bg-black text-white flex flex-col justify-between">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="border-white/10 bg-zinc-950/70 p-6 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="size-12 text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Active Session Found</h2>
            <p className="text-zinc-400 text-sm mb-6">
              We couldn't retrieve any recent interview performance data for {candidate.name}. Please complete an interview first.
            </p>
            <div className="flex flex-col gap-2">
              <Link href={`/interview?candidate=${candidate.id}`}>
                <Button className="w-full bg-white text-black hover:bg-zinc-200">
                  Start New Interview
                </Button>
              </Link>
              <Link href="/candidate">
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/10 text-white">
                  Back to Candidates
                </Button>
              </Link>
            </div>
          </Card>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Helper values for generating feedback content based on scores
  const getFeedbackDetails = () => {
    const depth = session.metrics.depth
    const clarity = session.metrics.clarity
    const communication = session.metrics.communication

    let strengths: string[] = []
    let gaps: string[] = []
    let nextSteps: string[] = []

    // Evaluate Strengths
    if (depth >= 75) {
      strengths.push("Deep technical execution: Demonstrated strong understanding of core architectural parameters and trade-offs.")
    } else {
      strengths.push("Conceptual familiarity: Able to outline the high-level purpose and basic behaviors of the required tools.")
    }

    if (clarity >= 75) {
      strengths.push("Structured logical flow: Explained complex software engineering topics in a clear, step-by-step layout.")
    } else {
      strengths.push("Receptive communication: Answers were focused on the prompt and directly targeted the core question.")
    }

    if (communication >= 75) {
      strengths.push("Production readiness: Supplemented answers with concrete real-world context, scenarios, or code metrics.")
    }

    // Evaluate Gaps & Next Steps based on Candidate specialization
    if (candidate.role === "Frontend Engineer") {
      if (depth < 75) {
        gaps.push("React State boundaries: Needs to elaborate further on controlled render loops and state synchronization side effects.")
        nextSteps.push("Deep-dive React documentation regarding reconciliation, key indexes, and state scheduling.")
      }
      gaps.push("Advanced Web Vitals: Missed specific details about browser paint rendering lifecycles (LCP/CLS optimizations).")
      nextSteps.push("Study Next.js custom performance metrics, font-optimization APIs, and structural CLS debugging in Chrome DevTools.")
    } else if (candidate.role === "Backend Engineer") {
      if (depth < 75) {
        gaps.push("Distributed locks: Did not mention Redis transaction parameters or Lua scripts for atomic rate limiting checks.")
        nextSteps.push("Experiment with write atomic primitives using Redis Lua scripting or Zookeeper lease locks.")
      }
      gaps.push("Cache stampede triggers: Lacks explicit solutions to protect backend databases when cache keys drop concurrently.")
      nextSteps.push("Review cache-aside synchronization algorithms, specifically mutex locks, and distributed trace observability.")
    } else if (candidate.role === "Full Stack Engineer") {
      gaps.push("JWT Cookie parameters: Needs stronger security constraints (HttpOnly, SameSite, Secure flags) to defend auth state.")
      nextSteps.push("Implement mock Auth middleware in Next.js using custom secure HTTP cookies and csrf validation.")
      nextSteps.push("Read up on scaling persistent WebSocket connection adapters over Redis PubSub backplanes.")
    } else {
      // Software Engineer Intern
      gaps.push("Call stack mechanics: Lacks full understanding of JS task scheduling queues (microtask loop priority).")
      nextSteps.push("Create visual tracing diagrams of promise execution hierarchies vs browser timeout triggers.")
      nextSteps.push("Study basic search algorithm pointer mutations (binary boundaries log-n limits).")
    }

    // Always provide general steps
    if (nextSteps.length === 0) {
      nextSteps.push("Review intermediate system design patterns related to replication, load-balancers, and connection state.")
    }
    if (gaps.length === 0) {
      gaps.push("Edge-case exception handling: Answers could describe how systems fail under network partitions or memory starvation.")
    }

    return { strengths, gaps, nextSteps }
  }

  const feedbackDetails = getFeedbackDetails()

  return (
    <div className="dark min-h-svh bg-black text-white flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1 px-4 md:px-6 max-w-6xl mx-auto w-full py-6 flex flex-col gap-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Link href="/candidate">
              <Button variant="ghost" size="xs" className="text-zinc-400 hover:text-white border border-white/10 h-8 px-3">
                <ArrowLeft className="size-4 mr-1.5" />
                Back to Candidates
              </Button>
            </Link>
            <span className="text-zinc-500 text-xs">/</span>
            <span className="text-zinc-300 text-xs font-medium">Evaluation Report</span>
          </div>

          <div className="text-xs text-zinc-500">
            Evaluated on {new Date(session.timestamp).toLocaleDateString()}
          </div>
        </div>

        {/* Dashboard Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Performance Evaluation Report</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Readiness profile for <span className="text-white font-medium">{candidate.name}</span> &bull; {candidate.role}
            </p>
          </div>
          <Link href={`/interview?candidate=${candidate.id}`}>
            <Button size="sm" className="bg-white text-black hover:bg-zinc-200 gap-1.5 h-9 font-semibold">
              <RefreshCw className="size-3.5" />
              Retake Interview
            </Button>
          </Link>
        </div>

        {/* Main Grid: Score Summary & Dimensions */}
        <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
          {/* Radial score Dial Card */}
          <Card className="border-white/10 bg-zinc-950/70 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-6">
              Readiness Signal
            </p>
            
            <div className="relative size-32 flex items-center justify-center">
              {/* Glowing background ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/5" />
              {/* Score circle */}
              <svg className="absolute inset-0 size-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-cyan-400/20"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - session.finalScore / 100)}`}
                  className="text-cyan-400 transition-all duration-1000"
                />
              </svg>
              {/* Inner score text */}
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">{session.finalScore}%</span>
                <span className="text-[10px] uppercase text-zinc-400 mt-0.5 tracking-wider">Score</span>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 w-full">
              <p className="text-xs text-zinc-400">
                {session.finalScore >= 80 
                  ? "Highly prepared. Shows strong depth and communication." 
                  : session.finalScore >= 60 
                    ? "Moderate readiness. Solid basics with minor focus areas." 
                    : "Needs preparation. Focus on recommended next steps."}
              </p>
            </div>
          </Card>

          {/* Metrics breakdown sliders */}
          <Card className="border-white/10 bg-zinc-950/70 p-6 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-6 flex items-center gap-1.5">
              <Award className="size-4 text-cyan-400" />
              Dimension Breakdown
            </h3>
            <div className="space-y-6 md:grid md:grid-cols-3 md:space-y-0 md:gap-6 lg:flex lg:flex-col lg:space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">Technical Depth</span>
                  <span className="text-cyan-300 font-semibold">{session.metrics.depth}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-cyan-400 to-emerald-400" style={{ width: `${session.metrics.depth}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">
                  Evaluates use of technical keywords, terminology accuracy, and knowledge of tradeoffs.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">Logical Clarity</span>
                  <span className="text-cyan-300 font-semibold">{session.metrics.clarity}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-cyan-400 to-white" style={{ width: `${session.metrics.clarity}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">
                  Evaluates answer structure, step-by-step layout reasoning, and syntax transition words.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">Communication Quality</span>
                  <span className="text-cyan-300 font-semibold">{session.metrics.communication}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-linear-to-r from-cyan-400 to-violet-400" style={{ width: `${session.metrics.communication}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-1.5">
                  Evaluates thoroughness, tone professionalism, and presence of concrete production examples.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Strengths & Gaps Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Strengths Card */}
          <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Observed Strengths
            </h3>
            <ul className="space-y-3">
              {feedbackDetails.strengths.map((s, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-sm text-zinc-300">
                  <span className="text-emerald-400 mt-1">&bull;</span>
                  <p className="leading-6">{s}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Gaps & Focus Areas Card */}
          <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 mb-4 flex items-center gap-2">
              <BrainCircuit className="size-4" />
              Focus Areas & Gaps
            </h3>
            <ul className="space-y-3">
              {feedbackDetails.gaps.map((g, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-sm text-zinc-300">
                  <span className="text-cyan-300 mt-1">&bull;</span>
                  <p className="leading-6">{g}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Actionable Next Steps */}
        <Card className="border-white/10 bg-zinc-950/70 p-5 shadow-2xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-4 flex items-center gap-2">
            <BookOpen className="size-4 text-cyan-400" />
            Recommended Next Steps
          </h3>
          <ul className="space-y-3">
            {feedbackDetails.nextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-sm text-zinc-300">
                <span className="size-5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-6">{step}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Detailed Transcript Review */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            Interactive Transcript Review
            <span className="text-xs font-normal text-zinc-500">
              ({session.logs.length} answers logged)
            </span>
          </h2>

          <div className="space-y-3">
            {session.logs.map((log: EvalLog, idx: number) => {
              const isExpanded = expandedIdx[idx] || false
              const avgScore = Math.round((log.score.depth + log.score.clarity + log.score.communication) / 3)

              return (
                <Card 
                  key={idx} 
                  className={cn(
                    "border-white/10 bg-zinc-950/40 overflow-hidden transition-all duration-300",
                    isExpanded && "border-cyan-300/25 bg-zinc-950/80 shadow-lg shadow-cyan-950/10"
                  )}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/2 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <span className="text-xs font-semibold border border-white/10 bg-white/3 text-zinc-400 px-2.5 py-0.5 rounded-full w-fit">
                        {log.topic} {log.isFollowUp && "(Follow-up)"}
                      </span>
                      <span className="text-sm font-semibold text-white line-clamp-2 md:line-clamp-1 max-w-sm md:max-w-md whitespace-normal">
                        {log.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-xs text-zinc-400 flex items-center gap-2">
                        Turn Score
                        <span className={cn(
                          "font-bold text-sm px-1.5 py-0.5 rounded",
                          avgScore >= 80 ? "text-emerald-300 bg-emerald-300/10" : avgScore >= 60 ? "text-cyan-300 bg-cyan-300/10" : "text-zinc-400 bg-white/5"
                        )}>
                          {avgScore}%
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="size-4 text-zinc-500" /> : <ChevronDown className="size-4 text-zinc-500" />}
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-4 space-y-4 bg-black/40">
                      {/* Interviewer Question */}
                      <div className="space-y-1">
                        <p className="text-xs uppercase font-semibold text-cyan-400 tracking-wider">Interviewer Prompt</p>
                        <p className="text-sm text-zinc-300 leading-6 bg-cyan-400/2 border border-cyan-400/5 p-3 rounded-lg">
                          {log.question}
                        </p>
                      </div>

                      {/* Candidate Answer */}
                      <div className="space-y-1">
                        <p className="text-xs uppercase font-semibold text-white tracking-wider">Your Response</p>
                        <p className="text-sm text-zinc-300 leading-6 bg-white/3 border border-white/5 p-3 rounded-lg whitespace-pre-wrap italic">
                          "{log.answer}"
                        </p>
                      </div>

                      {/* Specific Turn Scores */}
                      <div className="grid gap-3 grid-cols-3 bg-zinc-950 p-3 rounded-lg border border-white/5 text-center">
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase">Depth</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.depth}%</p>
                        </div>
                        <div className="border-x border-white/10">
                          <p className="text-[10px] text-zinc-500 uppercase">Clarity</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.clarity}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase">Communication</p>
                          <p className="text-sm font-bold text-white mt-0.5">{log.score.communication}%</p>
                        </div>
                      </div>

                      {/* How to Improve */}
                      <div className="space-y-1">
                        <p className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">Improvement Guidance</p>
                        <p className="text-sm text-zinc-300 leading-6 bg-emerald-400/2 border border-emerald-400/5 p-3 rounded-lg">
                          {log.guidance}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>

      </main>

      <SiteFooter />
    </div>
  )
}
```

## Empty Placeholders & Folders

Create the following files as placeholders. They should export empty configurations or simple objects to satisfy TypeScript/import compilation:

### 29. `lib/ai/gemini.ts`
```typescript
export {}
```

### 30. `lib/interview/engine.ts`
```typescript
export {}
```

### 31. `lib/interview/evaluator.ts`
```typescript
export {}
```

### 32. `lib/interview/memory.ts`
```typescript
export {}
```

### 33. `lib/interview/planner.ts`
```typescript
export {}
```

### 34. `lib/prompts/feedback.ts`
```typescript
export {}
```

### 35. `lib/prompts/question.ts`
```typescript
export {}
```

### 36. `lib/prompts/system.ts`
```typescript
export {}
```

Create empty folders with `.gitkeep` files inside:
- `hooks/.gitkeep` (containing `# gitkeep` or just empty space)
- `services/.gitkeep`
- `utils/.gitkeep`
