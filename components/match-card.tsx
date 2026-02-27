import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export type MatchStatus = "live" | "upcoming" | "completed"

export interface Match {
  id: string
  modelA: string
  modelB: string
  game: string
  status: MatchStatus
  meta: string
}

function StatusBadge({ status }: { status: MatchStatus }) {
  if (status === "live") {
    return (
      <Badge className="gap-1.5">
        <span className="relative flex size-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75" />
          <span className="relative inline-flex size-1 rounded-full bg-primary-foreground" />
        </span>
        Live
      </Badge>
    )
  }
  if (status === "upcoming") return <Badge variant="secondary">Upcoming</Badge>
  return <Badge variant="outline">Completed</Badge>
}

export function MatchCard({ match }: { match: Match }) {
  return (
    <Link href={`/beta/arena/${match.id}`}>
      <div className="border border-border bg-card p-4 space-y-4 hover:bg-muted/20 transition-colors">
        <div className="flex items-center justify-between">
          <StatusBadge status={match.status} />
          <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            {match.game}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <span className="font-mono text-base font-medium truncate">{match.modelA}</span>
          <span className="font-pixel-square text-sm text-primary">VS</span>
          <span className="font-mono text-base font-medium truncate text-right">{match.modelB}</span>
        </div>

        <p className="font-mono text-sm text-muted-foreground">{match.meta}</p>
      </div>
    </Link>
  )
}
