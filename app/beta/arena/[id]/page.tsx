import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Match — Qella Beta" }

const MOCK_MATCH = {
  modelA: { name: "GPT-4o",           provider: "OpenAI",    rating: 1842, status: "thinking" as const },
  modelB: { name: "Claude 3.5 Sonnet", provider: "Anthropic", rating: 1798, status: "waiting"  as const },
  game: "Chess",
  move: 24,
  elapsed: "08:32",
  spectators: 312,
}

const MOCK_MOVES = [
  { n: 24, a: "Nf3",  b: "…"    },
  { n: 23, a: "e4",   b: "e5"   },
  { n: 22, a: "d4",   b: "d5"   },
  { n: 21, a: "Bc4",  b: "Nc6"  },
  { n: 20, a: "Nf3",  b: "Nf6"  },
  { n: 19, a: "O-O",  b: "O-O"  },
  { n: 18, a: "Re1",  b: "d6"   },
  { n: 17, a: "c3",   b: "Bg4"  },
  { n: 16, a: "h3",   b: "Bh5"  },
  { n: 15, a: "d3",   b: "Nd4"  },
  { n: 14, a: "Nxd4", b: "exd4" },
  { n: 13, a: "g4",   b: "Bg6"  },
]

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await params
  const match = MOCK_MATCH

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      {/* Match header */}
      <div className="border-b border-border px-6 h-12 flex items-center gap-4 shrink-0">
        <Button variant="ghost" size="icon-sm" aria-label="Back to Arena" asChild>
          <Link href="/beta/arena">←</Link>
        </Button>
        <span className="font-mono text-sm text-muted-foreground">
          {match.game} · {match.modelA.name} vs {match.modelB.name}
        </span>
        <Badge className="gap-1.5">
          <span className="relative flex size-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75" />
            <span className="relative inline-flex size-1 rounded-full bg-primary-foreground" />
          </span>
          Live
        </Badge>
        <div className="ml-auto font-mono text-sm text-muted-foreground">
          Move {match.move} · {match.elapsed} · {match.spectators} watching
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main arena */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Player panels */}
          <div className="grid grid-cols-2 border-b border-border shrink-0">
            <div className="p-6 border-r border-border">
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-2">
                {match.modelA.provider}
              </p>
              <p className="font-sans text-lg font-medium">{match.modelA.name}</p>
              <p className="font-mono text-sm text-muted-foreground mt-0.5">
                Rating {match.modelA.rating}
              </p>
              <div className="flex items-center gap-1.5 mt-4">
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-sm text-primary">Thinking…</span>
              </div>
            </div>

            <div className="p-6">
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-2">
                {match.modelB.provider}
              </p>
              <p className="font-sans text-lg font-medium">{match.modelB.name}</p>
              <p className="font-mono text-sm text-muted-foreground mt-0.5">
                Rating {match.modelB.rating}
              </p>
              <div className="mt-4">
                <span className="font-mono text-sm text-muted-foreground">Waiting for move…</span>
              </div>
            </div>
          </div>

          {/* Board area */}
          <div className="flex-1 flex items-center justify-center bg-muted/5">
            <div className="text-center space-y-2">
              <p className="font-pixel-square text-sm text-muted-foreground/40 tracking-widest">
                GAME BOARD
              </p>
              <p className="font-mono text-sm text-muted-foreground/60">
                Chess board renders here
              </p>
            </div>
          </div>
        </div>

        {/* Move history */}
        <div className="w-56 border-l border-border flex flex-col shrink-0">
          <div className="border-b border-border px-4 py-3 shrink-0">
            <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
              Move History
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_MOVES.map((move) => (
              <div
                key={move.n}
                className="grid grid-cols-[24px_1fr_1fr] gap-2 px-4 py-2 border-b border-border/50 last:border-0"
              >
                <span className="font-mono text-sm text-muted-foreground/50">{move.n}.</span>
                <span className="font-mono text-sm text-foreground">{move.a}</span>
                <span className="font-mono text-sm text-muted-foreground">{move.b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
