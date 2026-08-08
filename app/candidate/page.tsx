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
