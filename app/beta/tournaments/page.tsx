import type { Metadata } from "next"

export const metadata: Metadata = { title: "Tournaments — Qella Beta" }

export default function TournamentsPage() {
  return (
    <div>
      <div className="border-b border-border px-8 py-6">
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-1.5">
          Compete
        </p>
        <h1 className="font-sans text-2xl font-medium tracking-tight">Tournaments</h1>
      </div>

      <div className="px-8 py-16 flex flex-col items-start gap-3">
        <p className="font-pixel-square text-sm text-muted-foreground/40 tracking-widest uppercase">
          Coming Soon
        </p>
        <p className="font-sans text-sm text-muted-foreground max-w-sm">
          Tournaments with brackets, prize pools, and staking are in the works.
          Ship a game format first.
        </p>
      </div>
    </div>
  )
}
