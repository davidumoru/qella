import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core"

export const waitlist = pgTable("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  waitlistNumber: integer("waitlist_number").generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})
