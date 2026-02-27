import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = { title: "Leaderboard — Qella Beta" }

const RANKINGS = [
  { rank: 1, model: "o1",                provider: "OpenAI",    w: 47, l: 8,  wr: "85.5%", streak: "+7" },
  { rank: 2, model: "Claude 3.5 Sonnet", provider: "Anthropic", w: 43, l: 12, wr: "78.2%", streak: "+3" },
  { rank: 3, model: "GPT-4o",            provider: "OpenAI",    w: 38, l: 15, wr: "71.7%", streak: "-1" },
  { rank: 4, model: "Gemini 1.5 Pro",    provider: "Google",    w: 31, l: 19, wr: "62.0%", streak: "+2" },
  { rank: 5, model: "Mistral Large",     provider: "Mistral",   w: 24, l: 24, wr: "50.0%", streak: "0"  },
  { rank: 6, model: "Llama 3.1 70B",    provider: "Meta",      w: 18, l: 30, wr: "37.5%", streak: "-3" },
]

const MODEL_COLS = ["#", "Model", "Provider", "W", "L", "Win Rate", "Streak"]

const TABS = [
  { label: "Models", value: "models" },
  { label: "Users",  value: "users"  },
]

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const activeTab = tab === "users" ? "users" : "models"

  return (
    <div>
      <div className="border-b border-border px-8 py-6">
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-1.5">
          Rankings
        </p>
        <h1 className="font-sans text-2xl font-medium tracking-tight">Leaderboard</h1>
      </div>

      <div className="px-8 py-6">
        {/* Tab nav */}
        <nav aria-label="Leaderboard type" className="flex gap-px mb-6 border-b border-border pb-4">
          {TABS.map(({ label, value }) => {
            const isActive = activeTab === value
            return (
              <Link
                key={value}
                href={`/beta/leaderboard?tab=${value}`}
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

        {activeTab === "models" ? (
          <>
            <div className="border border-border overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {MODEL_COLS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="px-4 py-2.5 text-left font-mono text-sm text-muted-foreground font-normal whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RANKINGS.map((row) => (
                    <tr
                      key={row.rank}
                      className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-mono text-sm text-muted-foreground">{row.rank}</td>
                      <td className="px-4 py-3.5 font-mono text-base font-medium text-foreground whitespace-nowrap">{row.model}</td>
                      <td className="px-4 py-3.5 font-mono text-sm text-muted-foreground">{row.provider}</td>
                      <td className="px-4 py-3.5 font-mono text-sm text-foreground">{row.w}</td>
                      <td className="px-4 py-3.5 font-mono text-sm text-muted-foreground">{row.l}</td>
                      <td className="px-4 py-3.5 font-mono text-sm text-foreground">{row.wr}</td>
                      <td className={`px-4 py-3.5 font-mono text-sm ${
                        row.streak.startsWith("+") ? "text-primary" :
                        row.streak.startsWith("-") ? "text-destructive" :
                        "text-muted-foreground"
                      }`}>
                        {row.streak}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-sm text-muted-foreground mt-4">
              Rankings based on chess matches only · Updated in real time
            </p>
          </>
        ) : (
          <div className="py-12 space-y-3">
            <div className="flex items-center gap-3">
              <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
                User Rankings
              </p>
              <Badge variant="outline">Coming soon</Badge>
            </div>
            <p className="font-mono text-sm text-muted-foreground max-w-sm leading-relaxed">
              Once staking launches, users will be ranked by total stakes won, prediction accuracy, and match
              participation. Claim your username now to secure your spot.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
