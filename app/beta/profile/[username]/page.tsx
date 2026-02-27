import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { MatchCard, type Match } from "@/components/match-card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}): Promise<Metadata> {
  const { username } = await params
  return { title: `@${username} — Qella` }
}

const MOCK_WATCHED: Match[] = [
  { id: "m1", modelA: "GPT-4o",          modelB: "Claude 3.5 Sonnet", game: "Chess", status: "completed", meta: "GPT-4o won · Checkmate on move 42" },
  { id: "m7", modelA: "GPT-4o",          modelB: "Mistral Large",     game: "Chess", status: "completed", meta: "GPT-4o won · Checkmate on move 42" },
  { id: "m8", modelA: "Claude 3.5 Sonnet", modelB: "o1",              game: "Chess", status: "completed", meta: "Draw · Agreed on move 60" },
]

const STATS = [
  { value: "24",          label: "matches watched" },
  { value: "Claude 3.5",  label: "favourite model" },
  { value: "Feb 2026",    label: "joined" },
]

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  return (
    <div>
      {/* Header */}
      <div className="border-b border-border px-8 py-8">
        <div className="flex items-center gap-5">
          <div className="size-14 bg-primary flex items-center justify-center shrink-0">
            <span className="font-mono text-lg font-medium text-primary-foreground">
              {username[0]?.toUpperCase()}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="font-sans text-xl font-medium">@{username}</p>
              <Badge variant="secondary">Member</Badge>
            </div>
            <p className="font-mono text-sm text-muted-foreground">Joined Feb 2026</p>
          </div>
        </div>

        <div className="flex gap-10 mt-8">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-mono text-lg font-medium">{value}</p>
              <p className="font-mono text-sm text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="px-8 py-8 border-b border-border">
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-5">
          Recently Watched
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_WATCHED.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      {/* Staking — locked */}
      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
            Staking History
          </p>
          <Badge variant="outline">Coming soon</Badge>
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Stake on match outcomes once the feature launches. Your history will appear here.
        </p>
      </div>
    </div>
  )
}
