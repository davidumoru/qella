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
    const { LoopsClient } = await import("loops");
    const loops = new LoopsClient(process.env.LOOPS_API_KEY!);
    await loops.updateContact({ email: to, properties: { username } });
    await loops.sendTransactionalEmail({
      transactionalId: "cmm7l8du814u90i10mbatdblm",
      email: to,
      addToAudience: true,
      dataVariables: {
        username,
        waitlistNumber,
      },
    });
  },
});
