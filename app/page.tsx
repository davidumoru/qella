"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { useConvex, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

type Step = "welcome" | "email" | "username" | "done"

const STEPS: Step[] = ["welcome", "email", "username", "done"]

function isValidEmail(value: string) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,}$/.test(value)
}

function isValidUsername(value: string) {
  return /^[a-zA-Z0-9_]{3,17}$/.test(value)
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

type PassportTheme = "dark" | "orange"

const PassportCard = React.forwardRef<
  HTMLDivElement,
  { username: string; waitlistNumber: string; theme: PassportTheme }
>(function PassportCard({ username, waitlistNumber, theme }, ref) {
  const mono = "monospace"
  const isOrange = theme === "orange"

  return (
    <div
      ref={ref}
      style={{ width: "100%", backgroundColor: "var(--background)", border: "1px solid var(--border)", fontFamily: mono, overflow: "hidden" }}
    >
      {!isOrange && <div style={{ height: 3, backgroundColor: "var(--primary)" }} />}

      <div style={{ backgroundColor: isOrange ? "var(--primary)" : "var(--background)", padding: "24px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <span style={{ fontFamily: mono, fontSize: 17, fontWeight: 700, letterSpacing: "0.04em",
            color: isOrange ? "var(--background)" : "var(--primary)" }}>
            qella
          </span>
          <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase" as const, marginTop: 4,
            color: isOrange ? "rgba(0,0,0,0.45)" : "var(--muted-foreground)" }}>
            Early Access Passport
          </span>
        </div>

        <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em",
          color: isOrange ? "var(--background)" : "var(--foreground)" }}>
          @{username}
        </div>
      </div>

      <div style={{ padding: "20px 28px 18px", borderTop: isOrange ? "none" : "1px solid var(--border)" }}>
        <div style={{ fontFamily: mono, fontSize: 8, color: "var(--muted-foreground)", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: 8 }}>
          Waitlist No.
        </div>
        <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 700, color: "var(--primary)" }}>
          #{waitlistNumber}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", padding: "10px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: mono, fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
          qella.gg · AI model arena
        </span>
        <div style={{ width: 7, height: 7, backgroundColor: "var(--primary)" }} />
      </div>
    </div>
  )
})

function DoneStep({
  email,
  username,
  waitlistNumber,
  reducedMotion,
}: {
  email: string
  username: string
  waitlistNumber: string
  reducedMotion: boolean
}) {
  useConfetti(reducedMotion)
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [flipping, setFlipping] = React.useState(false)
  const [showPassport, setShowPassport] = React.useState(false)
  const [theme, setTheme] = React.useState<PassportTheme>("dark")

  const handleReveal = () => {
    if (reducedMotion) { setShowPassport(true); return }
    setFlipping(true)
    setTimeout(() => setShowPassport(true), 275)
  }

  const handleDownload = async () => {
    if (!cardRef.current) return
    const { toPng } = await import("html-to-image")
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, skipFonts: true })
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = `qella-passport-${username}.png`
    a.click()
  }

  return (
    <div className="space-y-6">
      <motion.div
        animate={flipping ? { scaleX: [1, 0.01, 1] } : { scaleX: 1 }}
        transition={flipping ? { duration: 0.55, times: [0, 0.5, 1], ease: ["easeIn", "easeOut"] } : {}}
      >
        {showPassport ? (
          <PassportCard ref={cardRef} username={username} waitlistNumber={waitlistNumber} theme={theme} />
        ) : (
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

            <Button className="w-full" onClick={handleReveal} disabled={flipping}>
              Reveal your passport
            </Button>
          </div>
        )}
      </motion.div>

      {showPassport && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.3 }}
        >
          <div className="flex justify-center gap-3">
            {(["dark", "orange"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-label={`${t} theme`}
                className={`size-6 transition-shadow cursor-pointer ${theme === t ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : "ring-1 ring-border"}`}
                style={{ backgroundColor: t === "dark" ? "var(--background)" : "var(--primary)" }}
              />
            ))}
          </div>
          <Button variant="outline" className="w-full" onClick={handleDownload}>
            Download passport
          </Button>
        </motion.div>
      )}
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
  const [waitlistNumber, setWaitlistNumber] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [claiming, setClaiming] = React.useState(false)
  const [claimError, setClaimError] = React.useState("")
  const convex = useConvex()
  const join = useMutation(api.waitlist.join)
  const shouldReduceMotion = useReducedMotion()
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const checkGenRef = React.useRef(0)

  const navigate = (next: Step) => {
    setDirection(STEPS.indexOf(next) >= STEPS.indexOf(step) ? 1 : -1)
    setStep(next)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    if (!isValidEmail(email.trim())) {
      setEmailError("Please enter a valid email address.")
      return
    }
    setEmailError("")
    setEmailLoading(true)
    const available = await convex.query(api.waitlist.isEmailAvailable, { email: email.trim() })
    setEmailLoading(false)
    if (!available) {
      setEmailError("This email is already on the waitlist.")
      return
    }
    navigate("username")
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value)
    setAvailable(null)
    setClaimError("")
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const gen = ++checkGenRef.current
    if (!isValidUsername(value.trim())) {
      setChecking(false)
      return
    }
    setChecking(true)
    debounceRef.current = setTimeout(async () => {
      const isAvailable = await convex.query(api.waitlist.isUsernameAvailable, { username: value.trim() })
      if (gen !== checkGenRef.current) return
      setAvailable(isAvailable)
      setChecking(false)
    }, 300)
  }

  const trimmed = username.trim()
  const canClaim = isValidUsername(trimmed) && available === true && !claiming

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canClaim) return
    setClaiming(true)
    setClaimError("")
    try {
      const number = await join({ email, username: trimmed })
      setWaitlistNumber(number)
      navigate("done")
    } catch (err) {
      setClaiming(false)
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("username_taken")) setAvailable(false)
      else if (msg.includes("email_taken")) setClaimError("This email is already registered. Go back and use a different one.")
      else setClaimError("Something went wrong. Please try again.")
    }
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
          className="w-full max-w-sm space-y-6 md:space-y-10"
        >

          <div className="flex items-center gap-2">
            <div className="size-2.5 bg-primary" />
            <span className="font-pixel-square text-base">qella</span>
          </div>

          {step === "welcome" && (
            <>
              <div className="space-y-3">
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
                  <div key={title} className="px-4 py-2.5 md:py-3.5 border-b border-border last:border-b-0 space-y-0.5">
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
                  onChange={(e) => { setEmail(e.target.value); setEmailError("") }}
                  required
                  autoComplete="email"
                  autoFocus
                />
                {emailError && (
                  <p className="font-mono text-xs text-destructive">{emailError}</p>
                )}
                <Button type="submit" className="w-full" disabled={emailLoading}>
                  {emailLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="size-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      Checking…
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
                      maxLength={17}
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
                        3–17 characters. Letters, numbers, and underscores only.
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

                <div className="space-y-3 mt-3">
                  {claimError && (
                    <p className="font-mono text-xs text-destructive">{claimError}</p>
                  )}
                  <Button type="submit" className="w-full" disabled={!canClaim}>
                    {claiming ? (
                      <span className="flex items-center gap-2">
                        <span className="size-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                        Claiming…
                      </span>
                    ) : (
                      <>Claim @{trimmed || "username"}</>
                    )}
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

          {step === "done" && (
            <DoneStep email={email} username={trimmed} waitlistNumber={waitlistNumber} reducedMotion={shouldReduceMotion ?? false} />
          )}

          <StepIndicator current={step} />

        </motion.div>
      </AnimatePresence>
    </main>
  )
}
