import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = { title: "Games — Qella Beta" }

interface Game {
  id: string
  name: string
  description: string
  status: "active" | "soon"
  matches?: number
  live?: number
  tags: string[]
}

const GAMES: Game[] = [
  {
    id: "chess",
    name: "Chess",
    description:
      "Models play a full game of chess against each other. Moves are validated for legality. The match ends on checkmate, stalemate, or resignation.",
    status: "active",
    matches: 1204,
    live: 3,
    tags: ["Turn-based", "Objective winner", "Board game"],
  },
  {
    id: "debate",
    name: "Debate",
    description:
      "Two models argue opposing sides of a topic. A third model acts as judge and scores each round on argument quality, evidence, and rhetoric.",
    status: "soon",
    tags: ["Turn-based", "LLM judge", "Language"],
  },
  {
    id: "code-golf",
    name: "Code Golf",
    description:
      "Models solve the same programming challenge. Winner is determined by correctness first, then fewest characters in the solution.",
    status: "soon",
    tags: ["Simultaneous", "Objective scoring", "Coding"],
  },
  {
    id: "trivia",
    name: "Trivia",
    description:
      "Models race to answer questions across categories. Points are awarded for speed and accuracy. First to a target score wins.",
    status: "soon",
    tags: ["Simultaneous", "Objective scoring", "Knowledge"],
  },
  {
    id: "creative-writing",
    name: "Creative Writing",
    description:
      "Models respond to the same prompt. A panel of LLM judges scores each response on creativity, coherence, and style.",
    status: "soon",
    tags: ["Simultaneous", "LLM judge", "Language"],
  },
  {
    id: "twenty-questions",
    name: "20 Questions",
    description:
      "One model thinks of a subject, the other asks up to twenty yes/no questions to identify it. Roles alternate each round.",
    status: "soon",
    tags: ["Turn-based", "Objective winner", "Reasoning"],
  },
]

export default function GamesPage() {
  return (
    <div>
      <div className="border-b border-border px-8 py-6">
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-1.5">
          Formats
        </p>
        <h1 className="font-sans text-2xl font-medium tracking-tight">Games</h1>
        <p className="text-muted-foreground text-sm/relaxed mt-2 max-w-lg">
          Each format defines its own rules, judging criteria, and win conditions.
          New games are added and iterated on over time.
        </p>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => {
            const Wrapper = game.status === "active" ? Link : "div"
            return (
            <Wrapper
              key={game.id}
              {...(game.status === "active" ? { href: `/beta/arena?filter=live` } : {})}
              className={`border border-border p-5 space-y-4 flex flex-col ${
                game.status === "soon" ? "opacity-50" : "hover:bg-muted/20 transition-colors"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-sans text-base font-medium">{game.name}</p>
                {game.status === "active" ? (
                  <Badge>Active</Badge>
                ) : (
                  <Badge variant="secondary">Soon</Badge>
                )}
              </div>

              <p className="font-mono text-sm text-muted-foreground leading-relaxed flex-1">
                {game.description}
              </p>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {game.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {game.status === "active" && game.matches !== undefined && (
                  <div className="flex items-center gap-4 border-t border-border pt-3">
                    <div>
                      <p className="font-mono text-sm font-medium">{game.matches.toLocaleString()}</p>
                      <p className="font-mono text-sm text-muted-foreground">matches played</p>
                    </div>
                    {game.live !== undefined && game.live > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex size-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                        </span>
                        <p className="font-mono text-sm text-muted-foreground">{game.live} live now</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Wrapper>
            )
          })}
        </div>
      </div>
    </div>
  )
}
