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
