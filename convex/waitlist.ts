import { v } from "convex/values";
import { internalAction, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,}$/;
const USERNAME_RE = /^[a-zA-Z0-9_]{3,17}$/;

const RESERVED_USERNAMES = new Set([
  "qella", "qellagg", "qella_gg",
  "admin", "administrator", "root", "system", "superuser",
  "mod", "moderator", "staff", "support", "help", "info",
  "security", "official", "team", "contact", "noreply", "no_reply",
  "api", "beta", "arena", "games", "models", "leaderboard",
  "tournaments", "profile", "onboarding", "login", "branding",
  "null", "undefined", "anonymous", "test", "user", "me", "you",
]);

export const isEmailAvailable = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const e = email.trim().toLowerCase();
    if (!EMAIL_RE.test(e)) return false;
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", e))
      .first();
    return existing === null;
  },
});

export const isUsernameAvailable = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const u = username.trim().toLowerCase();
    if (!USERNAME_RE.test(u)) return false;
    if (RESERVED_USERNAMES.has(u)) return false;
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_username", (q) => q.eq("username", u))
      .first();
    return existing === null;
  },
});

export const join = mutation({
  args: { email: v.string(), username: v.string() },
  handler: async (ctx, { email, username }) => {
    const e = email.trim().toLowerCase();
    const u = username.trim().toLowerCase();

    if (!EMAIL_RE.test(e) || !USERNAME_RE.test(u) || RESERVED_USERNAMES.has(u)) {
      throw new Error("invalid_input");
    }

    const existingEmail = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", e))
      .first();
    if (existingEmail !== null) throw new Error("email_taken");

    const existingUsername = await ctx.db
      .query("waitlist")
      .withIndex("by_username", (q) => q.eq("username", u))
      .first();
    if (existingUsername !== null) throw new Error("username_taken");

    const all = await ctx.db.query("waitlist").collect();
    const waitlistNumber = all.length + 1;

    await ctx.db.insert("waitlist", {
      email: e,
      username: u,
      waitlistNumber,
      createdAt: Date.now(),
    });

    const padded = String(waitlistNumber).padStart(4, "0");

    await ctx.scheduler.runAfter(0, internal.waitlist.sendConfirmationEmail, {
      to: e,
      username: u,
      waitlistNumber: padded,
    });

    return padded;
  },
});

export const sendConfirmationEmail = internalAction({
  args: { to: v.string(), username: v.string(), waitlistNumber: v.string() },
  handler: async (_ctx, { to, username, waitlistNumber }) => {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to,
      subject: `You're on the list, @${username}`,
      html: confirmationEmail(username, waitlistNumber),
    });
    if (error) console.error("[resend]", error);
  },
});

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
</html>`;
}
