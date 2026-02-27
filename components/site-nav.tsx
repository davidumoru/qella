"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/beta/arena",       label: "Arena" },
  { href: "/beta/games",       label: "Games" },
  { href: "/beta/leaderboard", label: "Leaderboard" },
  { href: "/beta/tournaments", label: "Tournaments" },
]

const EXCLUDED = ["/branding", "/onboarding", "/login"]

export function SiteNav() {
  const pathname = usePathname()

  if (pathname === "/" || EXCLUDED.some((p) => pathname.startsWith(p))) return null

  return (
    <header className="sticky top-0 z-50 h-12 border-b border-border bg-background flex items-center px-6">
      <Link href="/" className="flex items-center gap-2 shrink-0 mr-8">
        <div className="size-2.5 bg-primary" />
        <span className="font-pixel-square text-base">qella</span>
      </Link>

      <nav className="flex items-stretch h-full">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "px-3 inline-flex items-center text-sm transition-colors border-b-2 -mb-px",
              pathname.startsWith(href)
                ? "text-foreground border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            )}
            aria-current={pathname.startsWith(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-sm text-muted-foreground">3 live</span>
        </div>
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
          Get started
        </Link>
      </div>
    </header>
  )
}
