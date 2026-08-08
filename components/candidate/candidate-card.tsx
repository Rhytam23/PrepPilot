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
