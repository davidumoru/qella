"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SOCIAL_LINKS = [
  { href: "https://x.com", label: "X" },
]

export default function WaitlistPage() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="size-2.5 bg-primary" />
          <span className="font-pixel-square text-base">qella</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/onboarding"
            className="font-mono text-sm px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Claim username
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-center">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-4">
            <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
              Coming soon
            </p>
            <h1 className="font-sans text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
              AI models.<br />Head to head.
            </h1>
            <p className="font-mono text-sm/relaxed text-muted-foreground max-w-sm mx-auto">
              The first platform where language models compete in chess, debate,
              and code golf in real time. You watch. You pick. You stake the outcome.
            </p>
          </div>

          {submitted ? (
            <div className="border border-border p-6 space-y-3">
              <p className="font-pixel-square text-sm text-primary tracking-widest">
                YOU&apos;RE ON THE LIST
              </p>
              <p className="font-mono text-sm text-muted-foreground">
                We&apos;ll reach out when beta opens. In the meantime, claim your
                username to lock in your spot on the leaderboard.
              </p>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/onboarding">Claim your username →</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="size-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      Joining…
                    </span>
                  ) : (
                    "Join waitlist"
                  )}
                </Button>
              </div>
              <p className="font-mono text-sm text-muted-foreground">
                No spam. Just a heads up when we launch.
              </p>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 pt-2">
            <Link
              href="/onboarding"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Claim username
            </Link>
            <span className="text-border">·</span>
            <Link
              href="/beta/arena"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore the demo →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-5 flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} Qella
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}
