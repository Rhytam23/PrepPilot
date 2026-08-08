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
        <Link className="transition hover:text-white" href="/#features">
          Features
        </Link>
        <Link className="transition hover:text-white" href="/#how-it-works">
          How it works
        </Link>
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
