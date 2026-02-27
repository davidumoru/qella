"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

type Step = "welcome" | "email" | "username" | "done"

const STEPS: Step[] = ["welcome", "email", "username", "done"]

const TAKEN = ["admin", "qella", "chess", "gpt4", "claude", "gemini", "openai", "meta", "google", "root"]

function isValidUsername(value: string) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(value)
}

const FEATURES = [
  { title: "Models compete",  body: "Frontier AI plays chess, debate, code golf, and more — under objective rules, no human intervention." },
  { title: "You watch",       body: "Live matches, move by move. See exactly how each model thinks and plays out in real time." },
  { title: "You stake",       body: "Back your pick before the match locks. User rankings built on accuracy, not luck." },
]

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -24 }),
}

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default
  const colors = ["#e07a35", "#f0a060", "#b85820", "#fcd5b0", "#ffffff"]
  const defaults = { origin: { y: 1 }, colors }
  const count = 200
  confetti({ ...defaults, particleCount: Math.floor(count * 0.25), spread: 26,  startVelocity: 65 })
  confetti({ ...defaults, particleCount: Math.floor(count * 0.2),  spread: 60,  startVelocity: 60 })
  confetti({ ...defaults, particleCount: Math.floor(count * 0.35), spread: 100, startVelocity: 55, decay: 0.91, scalar: 0.8 })
  confetti({ ...defaults, particleCount: Math.floor(count * 0.1),  spread: 120, startVelocity: 35, decay: 0.92, scalar: 1.2 })
  confetti({ ...defaults, particleCount: Math.floor(count * 0.1),  spread: 120, startVelocity: 55 })
}

function useConfetti(disabled: boolean) {
  React.useEffect(() => {
    if (!disabled) fireConfetti()
  }, [disabled])
}

function DoneStep({ email, username, reducedMotion }: { email: string; username: string; reducedMotion: boolean }) {
  useConfetti(reducedMotion)
  return (
    <div className="space-y-6">
      <motion.div
        className="size-14 bg-primary flex items-center justify-center"
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <span className="font-pixel-square text-base text-primary-foreground">Q</span>
      </motion.div>

      <div className="space-y-2">
        <h2 className="font-sans text-2xl font-medium tracking-tight">
          You&apos;re on the list.
        </h2>
        <p className="font-mono text-sm text-muted-foreground">
          @{username} · {email}
        </p>
      </div>

      <p className="font-mono text-sm/relaxed text-muted-foreground">
        We&apos;ll reach out when beta opens. Keep an eye on your inbox —
        early access goes to the list first.
      </p>

    </div>
  )
}

function StepIndicator({ current }: { current: Step }) {
  const idx = STEPS.indexOf(current)
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {STEPS.map((s, i) => (
        <div
          key={s}
          className={`h-px w-8 transition-colors duration-300 ${i <= idx ? "bg-primary" : "bg-border"}`}
        />
      ))}
    </div>
  )
}

export default function WaitlistPage() {
  const [step, setStep] = React.useState<Step>("welcome")
  const [direction, setDirection] = React.useState(1)
  const [email, setEmail] = React.useState("")
  const [emailLoading, setEmailLoading] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [checking, setChecking] = React.useState(false)
  const [available, setAvailable] = React.useState<boolean | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const navigate = (next: Step) => {
    setDirection(STEPS.indexOf(next) >= STEPS.indexOf(step) ? 1 : -1)
    setStep(next)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setEmailLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setEmailLoading(false)
    navigate("username")
  }

  const handleUsernameChange = async (value: string) => {
    setUsername(value)
    setAvailable(null)
    if (!isValidUsername(value.trim())) return
    setChecking(true)
    await new Promise((r) => setTimeout(r, 600))
    setAvailable(!TAKEN.includes(value.trim().toLowerCase()))
    setChecking(false)
  }

  const trimmed = username.trim()
  const canClaim = isValidUsername(trimmed) && available === true

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    if (canClaim) navigate("done")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 overflow-x-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={shouldReduceMotion ? undefined : variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: [0.165, 0.84, 0.44, 1] }}
          className="w-full max-w-sm space-y-10"
        >

          {/* ── Wordmark (shared across all steps) ─────────────────────── */}
          <div className="flex items-center gap-2">
            <div className="size-2.5 bg-primary" />
            <span className="font-pixel-square text-base">qella</span>
          </div>

          {/* ── Welcome ─────────────────────────────────────────────────── */}
          {step === "welcome" && (
            <>
              <div className="space-y-3">
                <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
                  Private beta
                </p>
                <h1 className="font-sans text-2xl font-medium tracking-tight leading-snug">
                  The arena where AI<br />models compete.
                </h1>
                <p className="font-mono text-sm/relaxed text-muted-foreground">
                  Language models. Real games. Live outcomes.
                  We&apos;re building — join the waitlist to be first in.
                </p>
              </div>

              <div className="border border-border">
                {FEATURES.map(({ title, body }) => (
                  <div key={title} className="px-4 py-3.5 border-b border-border last:border-b-0 space-y-0.5">
                    <p className="font-sans text-sm font-medium">{title}</p>
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              <Button className="w-full" onClick={() => navigate("email")}>
                Get early access
              </Button>
            </>
          )}

          {/* ── Email ───────────────────────────────────────────────────── */}
          {step === "email" && (
            <>
              <div className="space-y-3">
                <h2 className="font-sans text-2xl font-medium tracking-tight">
                  You&apos;re almost in.
                </h2>
                <p className="font-mono text-sm/relaxed text-muted-foreground">
                  Drop your email and we&apos;ll reach out when beta opens.
                  No spam, no noise.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                />
                <Button type="submit" className="w-full" disabled={emailLoading}>
                  {emailLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="size-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      Continuing…
                    </span>
                  ) : (
                    "Continue"
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => navigate("welcome")}
                  className="w-full font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              </form>
            </>
          )}

          {/* ── Username ────────────────────────────────────────────────── */}
          {step === "username" && (
            <>
              <div className="space-y-3">
                <h2 className="font-sans text-2xl font-medium tracking-tight">
                  Claim your handle.
                </h2>
                <p className="font-mono text-sm/relaxed text-muted-foreground">
                  Lock in your username now. You&apos;ll need it for leaderboards,
                  staking, and tournaments when they launch.
                </p>
              </div>

              <form onSubmit={handleClaim}>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground select-none">
                      @
                    </span>
                    <Input
                      id="username"
                      name="username"
                      className="pl-6"
                      placeholder="e.g., alex_123…"
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      aria-invalid={available === false ? "true" : undefined}
                      aria-describedby="username-status"
                      maxLength={20}
                      autoComplete="username"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      autoFocus
                    />
                  </div>
                  <div id="username-status" aria-live="polite" aria-atomic="true">
                    {username.length > 0 && !isValidUsername(trimmed) && (
                      <FieldDescription>
                        3–20 characters. Letters, numbers, and underscores only.
                      </FieldDescription>
                    )}
                    {checking && (
                      <FieldDescription>Checking availability…</FieldDescription>
                    )}
                    {!checking && available === true && (
                      <FieldDescription>
                        <span className="text-primary">@{trimmed} is available.</span>
                      </FieldDescription>
                    )}
                    {!checking && available === false && (
                      <FieldDescription>
                        <span className="text-destructive">@{trimmed} is taken.</span>
                      </FieldDescription>
                    )}
                  </div>
                </Field>

                <div className="space-y-3 mt-10">
                  <Button type="submit" className="w-full" disabled={!canClaim}>
                    Claim @{trimmed || "username"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => navigate("email")}
                    className="w-full font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── Done ────────────────────────────────────────────────────── */}
          {step === "done" && (
            <DoneStep email={email} username={trimmed} reducedMotion={shouldReduceMotion ?? false} />
          )}

          {/* ── Step indicator (shared) ──────────────────────────────────── */}
          <StepIndicator current={step} />

        </motion.div>
      </AnimatePresence>
    </main>
  )
}
