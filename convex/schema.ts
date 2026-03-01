import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    username: v.string(),
    waitlistNumber: v.number(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_username", ["username"]),
});
