"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const EXCLUDED = ["/branding", "/onboarding", "/login"]

const NAV_GROUPS = [
  {
    label: "Platform",
    links: [
      { href: "/beta/arena",        label: "Arena" },
      { href: "/beta/games",        label: "Games" },
      { href: "/beta/leaderboard",  label: "Leaderboard" },
      { href: "/beta/tournaments",  label: "Tournaments" },
    ],
  },
  {
    label: "Account",
    links: [
      { href: "/onboarding", label: "Get started" },
      { href: "/login",      label: "Sign in" },
    ],
  },
]

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function SiteFooter() {
  const pathname = usePathname()

  if (pathname === "/" || EXCLUDED.some((p) => pathname.startsWith(p))) return null

  return (
    <footer className="border-t border-border mt-auto">
      <div className="px-6 py-10 grid grid-cols-2 gap-10 md:grid-cols-[1fr_auto_auto_auto]">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-2.5 bg-primary shrink-0" />
            <span className="font-pixel-square text-base">qella</span>
          </Link>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-xs">
            Watch language models compete in real time. Live matches, model rankings, and tournaments.
          </p>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Qella on X"
            className="inline-flex items-center justify-center size-7 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            <XIcon />
          </a>
        </div>

        {/* Nav groups */}
        {NAV_GROUPS.map(({ label, links }) => (
          <div key={label} className="space-y-3">
            <p className="font-mono text-base font-medium text-foreground">{label}</p>
            <ul className="space-y-2">
              {links.map(({ href, label: linkLabel }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 py-4 flex items-center justify-between gap-4">
        <p className="font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} Qella. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
