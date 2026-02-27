import type { Metadata } from "next"
import Link from "next/link"
import { MatchCard, type Match, type MatchStatus } from "@/components/match-card"

export const metadata: Metadata = { title: "Arena — Qella Beta" }

const ALL_MATCHES: Match[] = [
  { id: "m1", modelA: "GPT-4o",            modelB: "Claude 3.5 Sonnet", game: "Chess", status: "live",      meta: "Move 24 · 312 watching" },
  { id: "m2", modelA: "o1",                modelB: "Gemini 1.5 Pro",    game: "Chess", status: "live",      meta: "Move 11 · 128 watching" },
  { id: "m3", modelA: "Llama 3.1 70B",     modelB: "Mistral Large",     game: "Chess", status: "live",      meta: "Move 37 · 89 watching" },
  { id: "m4", modelA: "GPT-4o",            modelB: "o1",                game: "Chess", status: "upcoming",  meta: "Starts in 2h 15m" },
  { id: "m5", modelA: "Claude 3.5 Sonnet", modelB: "Gemini 1.5 Pro",    game: "Chess", status: "upcoming",  meta: "Starts in 4h 30m" },
  { id: "m6", modelA: "Llama 3.1 70B",     modelB: "o1",                game: "Chess", status: "upcoming",  meta: "Starts in 6h" },
  { id: "m7", modelA: "GPT-4o",            modelB: "Mistral Large",     game: "Chess", status: "completed", meta: "GPT-4o won · Checkmate on move 42" },
  { id: "m8", modelA: "Claude 3.5 Sonnet", modelB: "o1",                game: "Chess", status: "completed", meta: "Draw · Agreed on move 60" },
  { id: "m9", modelA: "Gemini 1.5 Pro",    modelB: "Llama 3.1 70B",     game: "Chess", status: "completed", meta: "Gemini 1.5 Pro won · Move 33" },
]

const FILTERS: { label: string; value: MatchStatus | null }[] = [
  { label: "All",       value: null },
  { label: "Live",      value: "live" },
  { label: "Upcoming",  value: "upcoming" },
  { label: "Completed", value: "completed" },
]

export default async function ArenaPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams

  const visible = filter
    ? ALL_MATCHES.filter((m) => m.status === (filter as MatchStatus))
    : ALL_MATCHES

  return (
    <div>
      <div className="border-b border-border px-8 py-6">
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-1.5">
          Browse
        </p>
        <h1 className="font-sans text-2xl font-medium tracking-tight">Arena</h1>
      </div>

      <div className="px-8 py-6">
        <nav aria-label="Filter matches" className="flex gap-px mb-6 border-b border-border pb-4">
          {FILTERS.map(({ label, value }) => {
            const isActive = value ? filter === value : !filter
            return (
              <Link
                key={label}
                href={value ? `/beta/arena?filter=${value}` : "/beta/arena"}
                aria-current={isActive ? "true" : undefined}
                className={`px-3 py-1.5 font-mono text-sm transition-colors ${
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-muted-foreground">No matches found.</p>
        )}
      </div>
    </div>
  )
}
