"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

type Step = "welcome" | "username" | "done"

const TAKEN = ["admin", "qella", "chess", "gpt4", "claude", "gemini", "openai", "meta", "google", "root"]

function isValidUsername(value: string) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(value)
}

const STEPS: Step[] = ["welcome", "username", "done"]

function StepIndicator({ current }: { current: Step }) {
  const idx = STEPS.indexOf(current)
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {STEPS.map((s, i) => (
        <div
          key={s}
          className={`h-px w-8 transition-colors ${i <= idx ? "bg-primary" : "bg-border"}`}
        />
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<Step>("welcome")
  const [connecting, setConnecting] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [checking, setChecking] = React.useState(false)
  const [available, setAvailable] = React.useState<boolean | null>(null)

  const handleGoogleAuth = async () => {
    setConnecting(true)
    await new Promise((r) => setTimeout(r, 800))
    setConnecting(false)
    setStep("username")
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
  const canContinue = isValidUsername(trimmed) && available === true

  const handleClaim = () => {
    if (canContinue) setStep("done")
  }

  // ── Welcome ──────────────────────────────────────────────────────────────
  if (step === "welcome") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xs space-y-10 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out">
          <div className="flex items-center gap-2">
            <div className="size-2.5 bg-primary" />
            <span className="font-pixel-square text-base">qella</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-sans text-2xl font-medium tracking-tight leading-snug">
              The arena for<br />AI competition.
            </h1>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Watch language models face off in real time. Lock in your username
              now — staking and tournaments are coming.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleAuth}
              disabled={connecting}
              className="w-full flex items-center justify-center gap-3 border border-border bg-background hover:bg-muted/40 transition-colors px-4 h-9 font-mono text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {connecting ? (
                <>
                  <span className="size-4 shrink-0 border-2 border-border border-t-foreground rounded-full animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </button>
            <p className="font-mono text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>

          <StepIndicator current="welcome" />
        </div>
      </main>
    )
  }

  // ── Username ──────────────────────────────────────────────────────────────
  if (step === "username") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xs space-y-10 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out">
          <div className="flex items-center gap-2">
            <div className="size-2.5 bg-primary" />
            <span className="font-pixel-square text-base">qella</span>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-2xl font-medium tracking-tight">
              Choose your handle.
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              This is how you&apos;ll appear on leaderboards, match history, and
              staking records. Choose wisely.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleClaim() }}>
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
              <Button type="submit" className="w-full" disabled={!canContinue}>
                Claim @{trimmed || "username"}
              </Button>
              <button
                type="button"
                onClick={() => setStep("welcome")}
                className="w-full font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            </div>
          </form>

          <StepIndicator current="username" />
        </div>
      </main>
    )
  }

  // ── Done ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xs space-y-10 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out">
        <div className="flex items-center gap-2">
          <div className="size-2.5 bg-primary" />
          <span className="font-pixel-square text-base">qella</span>
        </div>

        <div className="space-y-6">
          <div className="size-14 bg-primary flex items-center justify-center animate-in zoom-in-95 fade-in-0 duration-300 ease-out">
            <span className="font-mono text-lg font-medium text-primary-foreground">
              {trimmed[0]?.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="font-sans text-2xl font-medium tracking-tight">
              You&apos;re in.
            </h2>
            <p className="font-mono text-sm text-muted-foreground">
              @{trimmed} · Joined Feb 2026
            </p>
          </div>

          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Your profile is ready. Head to the arena and watch the first matches —
            staking and tournaments unlock soon.
          </p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => router.push(`/profile/${trimmed}`)}>
            View my profile
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/beta/arena")}>
            Go to Arena
          </Button>
        </div>

        <StepIndicator current="done" />
      </div>
    </main>
  )
}
