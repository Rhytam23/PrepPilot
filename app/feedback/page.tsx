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
