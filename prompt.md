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
│   └── candidates.ts
├── types/
│   └── candidate.ts
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
# PrepPilot

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
export default function FeedbackPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <h1 className="text-3xl font-semibold">Feedback</h1>
    </main>
  )
}
```

### 16. `app/interview/page.tsx`
```tsx
export default function InterviewPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <h1 className="text-3xl font-semibold">Interview</h1>
    </main>
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
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card className="group flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.055] hover:shadow-cyan-950/25">
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

      <CardFooter>
        <Button className="h-10 w-full border border-white/10 bg-white text-black transition duration-300 hover:bg-zinc-200">
          Start Interview
          <ArrowRight className="size-4" />
        </Button>
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
                ? "border-white/10 bg-white/[0.03] text-zinc-400"
                : "border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-100"
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
        <a className="transition hover:text-white" href="#features">
          Features
        </a>
        <a className="transition hover:text-white" href="#how-it-works">
          How it works
        </a>
      </nav>

     
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
