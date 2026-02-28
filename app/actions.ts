"use server"

import { eq } from "drizzle-orm"
import { Resend } from "resend"
import { db } from "@/db"
import { waitlist } from "@/db/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,}$/
const USERNAME_RE = /^[a-zA-Z0-9_]{3,17}$/

const RESERVED_USERNAMES = new Set([
  "qella", "qellagg", "qella_gg",
  "admin", "administrator", "root", "system", "superuser",
  "mod", "moderator", "staff", "support", "help", "info",
  "security", "official", "team", "contact", "noreply", "no_reply",
  "api", "beta", "arena", "games", "leaderboard",
  "tournaments", "profile", "onboarding", "login", "branding",
  "null", "undefined", "anonymous", "test", "user", "me", "you",
])

export async function checkEmailTaken(email: string): Promise<boolean> {
  if (!EMAIL_RE.test(email.trim())) return false
  const rows = await db
    .select({ id: waitlist.id })
    .from(waitlist)
    .where(eq(waitlist.email, email.trim().toLowerCase()))
    .limit(1)
  return rows.length > 0
}

export async function checkUsername(username: string): Promise<boolean> {
  const u = username.trim().toLowerCase()
  if (!USERNAME_RE.test(u)) return false
  if (RESERVED_USERNAMES.has(u)) return false
  const rows = await db
    .select({ id: waitlist.id })
    .from(waitlist)
    .where(eq(waitlist.username, u))
    .limit(1)
  return rows.length === 0
}

export async function joinWaitlist(
  email: string,
  username: string
): Promise<
  | { waitlistNumber: string }
  | { error: "email_taken" | "username_taken" | "server_error" }
> {
  const u = username.trim().toLowerCase()
  if (!EMAIL_RE.test(email.trim()) || !USERNAME_RE.test(u) || RESERVED_USERNAMES.has(u)) {
    return { error: "server_error" }
  }

  try {
    const [row] = await db
      .insert(waitlist)
      .values({
        email: email.trim().toLowerCase(),
        username: u,
      })
      .returning({ waitlistNumber: waitlist.waitlistNumber })

    const waitlistNumber = String(row.waitlistNumber).padStart(4, "0")

    void sendConfirmation(email.trim(), username.trim(), waitlistNumber)

    return { waitlistNumber }
  } catch (err: unknown) {
    const pg = err as { code?: string; constraint?: string }
    if (pg.code === "23505") {
      if (pg.constraint?.includes("email")) return { error: "email_taken" }
      if (pg.constraint?.includes("username")) return { error: "username_taken" }
    }
    console.error("[joinWaitlist]", err)
    return { error: "server_error" }
  }
}

async function sendConfirmation(to: string, username: string, waitlistNumber: string) {
  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to,
      subject: `You're on the list, @${username}`,
      html: confirmationEmail(username, waitlistNumber),
    })
    if (error) console.error("[resend]", error)
  } catch (err) {
    console.error("[resend]", err)
  }
}

function confirmationEmail(username: string, waitlistNumber: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0c0c0c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0c0c;padding:48px 24px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;">

        <tr><td style="height:3px;background:#f07535;"></td></tr>

        <tr><td style="padding:28px 0 40px;">
          <span style="font-family:monospace;font-size:17px;font-weight:700;color:#f07535;letter-spacing:0.04em;">qella</span>
        </td></tr>

        <tr><td style="padding-bottom:8px;">
          <h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:22px;font-weight:600;color:#f0f0f0;letter-spacing:-0.02em;">You're on the list.</h1>
        </td></tr>

        <tr><td style="padding-bottom:32px;">
          <p style="margin:0;font-family:monospace;font-size:13px;color:#666;">@${username} &middot; #${waitlistNumber}</p>
        </td></tr>

        <tr><td style="padding-bottom:40px;">
          <p style="margin:0;font-family:monospace;font-size:13px;line-height:1.8;color:#777;">
            We'll reach out when beta opens.<br>Early access goes to the list first.
          </p>
        </td></tr>

        <tr><td style="border-top:1px solid #1e1e1e;padding-top:20px;">
          <p style="margin:0;font-family:monospace;font-size:10px;color:#333;letter-spacing:0.1em;text-transform:uppercase;">qella.gg &middot; AI model arena</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
