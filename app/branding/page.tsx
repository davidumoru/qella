"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  FloppyDiskIcon,
  DownloadIcon,
  ShieldIcon,
  SunIcon,
  EyeIcon,
  CodeIcon,
  BluetoothIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// ─── Nav ─────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "colors",     label: "Colors",     index: "01" },
  { id: "typography", label: "Typography", index: "02" },
  { id: "buttons",    label: "Buttons",    index: "03" },
  { id: "badges",     label: "Badges",     index: "04" },
  { id: "inputs",     label: "Inputs",     index: "05" },
  { id: "cards",      label: "Cards",      index: "06" },
  { id: "spacing",    label: "Spacing",    index: "07" },
]

function useActiveSection() {
  const [active, setActive] = React.useState<string>("colors")

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: "-20% 0% -65% 0%" }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}

function SideNav() {
  const active = useActiveSection()

  return (
    <aside className="fixed left-0 top-0 h-screen w-52 border-r border-border bg-background z-10 hidden lg:flex flex-col">
      <div className="p-5 flex flex-col flex-1 min-h-0">
        <div className="mb-6 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="size-3 bg-primary" />
            <span className="font-pixel-square text-base">qella</span>
          </div>
          <p className="font-mono text-sm text-muted-foreground">Design System v1.0</p>
        </div>

        <nav className="flex-1 min-h-0 flex flex-col">
          <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-2 shrink-0">
            Sections
          </p>
          <div className="space-y-px overflow-y-auto">
            {NAV_SECTIONS.map(({ id, label, index }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`flex items-center gap-3 px-2 py-1.5 text-sm transition-colors ${
                  active === id
                    ? "text-foreground bg-muted font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span className={`font-mono text-sm w-5 shrink-0 transition-opacity ${active === id ? "opacity-100 text-primary" : "opacity-40"}`}>
                  {index}
                </span>
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-4 pt-4 border-t border-border shrink-0">
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Tailwind v4<br />shadcn radix-lyra<br />oklch color space
          </p>
        </div>
      </div>
    </aside>
  )
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionWrap({
  id, index, title, description, children,
}: {
  id: string; index: string; title: string; description?: string; children: React.ReactNode
}) {
  return (
    <section id={id} className="py-12 lg:py-16 border-b border-border last:border-b-0 scroll-mt-24 lg:scroll-mt-8">
      <div className="mb-10">
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-1.5">
          {index} — {id}
        </p>
        <h2 className="font-sans text-2xl font-medium tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm/relaxed mt-2 max-w-prose">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-4">
        {title}
      </p>
      {children}
    </div>
  )
}

// ─── 01. Colors ───────────────────────────────────────────────────────────────

const COLORS = [
  { label: "background",          cssVar: "--background",          light: "oklch(1 0 0)",               dark: "oklch(0.145 0 0)" },
  { label: "foreground",          cssVar: "--foreground",          light: "oklch(0.145 0 0)",            dark: "oklch(0.985 0 0)" },
  { label: "primary",             cssVar: "--primary",             light: "oklch(0.646 0.222 41.116)",   dark: "oklch(0.705 0.213 47.604)" },
  { label: "primary-foreground",  cssVar: "--primary-foreground",  light: "oklch(0.98 0.016 73.684)",   dark: "oklch(0.98 0.016 73.684)" },
  { label: "secondary",           cssVar: "--secondary",           light: "oklch(0.967 0.001 286.375)", dark: "oklch(0.274 0.006 286.033)" },
  { label: "secondary-foreground",cssVar: "--secondary-foreground",light: "oklch(0.21 0.006 285.885)",  dark: "oklch(0.985 0 0)" },
  { label: "muted",               cssVar: "--muted",               light: "oklch(0.97 0 0)",            dark: "oklch(0.269 0 0)" },
  { label: "muted-foreground",    cssVar: "--muted-foreground",    light: "oklch(0.556 0 0)",           dark: "oklch(0.708 0 0)" },
  { label: "accent",              cssVar: "--accent",              light: "oklch(0.97 0 0)",            dark: "oklch(0.371 0 0)" },
  { label: "accent-foreground",   cssVar: "--accent-foreground",   light: "oklch(0.205 0 0)",           dark: "oklch(0.985 0 0)" },
  { label: "destructive",         cssVar: "--destructive",         light: "oklch(0.58 0.22 27)",        dark: "oklch(0.704 0.191 22.216)" },
  { label: "border",              cssVar: "--border",              light: "oklch(0.922 0 0)",           dark: "oklch(1 0 0 / 10%)" },
  { label: "input",               cssVar: "--input",               light: "oklch(0.922 0 0)",           dark: "oklch(1 0 0 / 15%)" },
  { label: "ring",                cssVar: "--ring",                light: "oklch(0.708 0 0)",           dark: "oklch(0.556 0 0)" },
  { label: "card",                cssVar: "--card",                light: "oklch(1 0 0)",               dark: "oklch(0.205 0 0)" },
]

const CHART_COLORS = [
  { label: "chart-1", value: "oklch(0.837 0.128 66.29)" },
  { label: "chart-2", value: "oklch(0.705 0.213 47.604)" },
  { label: "chart-3", value: "oklch(0.646 0.222 41.116)" },
  { label: "chart-4", value: "oklch(0.553 0.195 38.402)" },
  { label: "chart-5", value: "oklch(0.47 0.157 37.304)" },
]

function ColorsSection() {
  return (
    <SectionWrap
      id="colors" index="01" title="Colors"
      description="Semantic color tokens defined in oklch color space for perceptual uniformity and wide-gamut display support. All values are mapped through CSS custom properties."
    >
      <Sub title="Semantic Palette">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {COLORS.map((color) => (
            <div key={color.label}>
              <div
                className="h-12 w-full ring-1 ring-border mb-2"
                style={{ backgroundColor: `var(${color.cssVar})` }}
              />
              <p className="font-mono text-sm font-medium text-foreground truncate">{color.label}</p>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed break-all">{color.light}</p>
            </div>
          ))}
        </div>
      </Sub>

      <Sub title="Chart Palette">
        <div className="flex gap-0 mb-3">
          {CHART_COLORS.map((color) => (
            <div key={color.label} className="flex-1 h-8" style={{ backgroundColor: color.value }} />
          ))}
        </div>
        <div className="flex gap-4 flex-wrap">
          {CHART_COLORS.map((color) => (
            <div key={color.label}>
              <p className="font-mono text-sm font-medium">{color.label}</p>
              <p className="font-mono text-sm text-muted-foreground">{color.value}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-sm text-muted-foreground mt-4">
          Monochromatic warm amber scale — calibrated for single-series data visualization.
        </p>
      </Sub>
    </SectionWrap>
  )
}

// ─── 02. Typography ───────────────────────────────────────────────────────────

const FONTS = [
  { label: "Geist Sans",           cls: "font-sans",           cssVar: "--font-geist-sans" },
  { label: "Geist Mono",           cls: "font-mono",           cssVar: "--font-geist-mono" },
  { label: "Geist Pixel Square",   cls: "font-pixel-square",   cssVar: "--font-geist-pixel-square" },
  { label: "Geist Pixel Grid",     cls: "font-pixel-grid",     cssVar: "--font-geist-pixel-grid" },
  { label: "Geist Pixel Circle",   cls: "font-pixel-circle",   cssVar: "--font-geist-pixel-circle" },
  { label: "Geist Pixel Triangle", cls: "font-pixel-triangle", cssVar: "--font-geist-pixel-triangle" },
  { label: "Geist Pixel Line",     cls: "font-pixel-line",     cssVar: "--font-geist-pixel-line" },
]

const TYPE_SCALE = [
  { label: "5xl",  cls: "text-5xl",  usage: "Hero headings"              },
  { label: "4xl",  cls: "text-4xl",  usage: "Large hero headings"        },
  { label: "3xl",  cls: "text-3xl",  usage: "Section headings"           },
  { label: "2xl",  cls: "text-2xl",  usage: "Page headings"              },
  { label: "xl",   cls: "text-xl",   usage: "Sub-headings"               },
  { label: "lg",   cls: "text-lg",   usage: "Large labels / stats"       },
  { label: "base", cls: "text-base", usage: "Card titles, model names"   },
  { label: "sm",   cls: "text-sm",   usage: "Body copy, labels, metadata"},
]

function TypographySection() {
  return (
    <SectionWrap
      id="typography" index="02" title="Typography"
      description="Seven typefaces served from the geist npm package for full glyph support and font-feature-settings access. Sans and Mono for UI; five Pixel variants for display use. Pixel Square is used for the wordmark and decorative accents."
    >
      <Sub title="Typefaces">
        <div className="space-y-10">
          {FONTS.map((font) => (
            <div key={font.label} className="border-t border-border pt-8 first:border-0 first:pt-0">
              <div className="flex items-baseline justify-between mb-5">
                <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
                  {font.label}
                </p>
                <p className="font-mono text-sm text-muted-foreground">{font.cssVar}</p>
              </div>
              <p className={`${font.cls} text-5xl leading-none mb-3 text-foreground`}>
                The quick brown fox
              </p>
              <p className={`${font.cls} text-lg leading-snug mb-4 text-muted-foreground`}>
                jumps over the lazy dog
              </p>
              <p className={`${font.cls} text-sm text-muted-foreground/70 leading-relaxed`}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789 · !@#$%&amp;*()_+
              </p>
            </div>
          ))}
        </div>
      </Sub>

      <Sub title="Type Scale — Geist Sans">
        <div className="border border-border divide-y divide-border">
          {TYPE_SCALE.map(({ label, cls, usage }) => (
            <div key={label} className="flex items-baseline gap-6 px-4 py-3">
              <p className="font-mono text-sm text-muted-foreground w-10 shrink-0">{label}</p>
              <p className={`font-sans ${cls} text-foreground flex-1`}>The quick brown fox</p>
              <p className="font-mono text-sm text-muted-foreground/50 shrink-0 hidden sm:block">{usage}</p>
            </div>
          ))}
        </div>
      </Sub>
    </SectionWrap>
  )
}

// ─── 03. Buttons ─────────────────────────────────────────────────────────────

const BTN_VARIANTS = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const BTN_SIZES    = ["xs", "sm", "default", "lg"] as const
const ICON_SIZES   = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

function ButtonsSection() {
  return (
    <SectionWrap
      id="buttons" index="03" title="Buttons"
      description="Six variants across four text sizes and four icon sizes. All buttons use rounded-none. The destructive variant uses a tinted background rather than a solid fill."
    >
      <Sub title="Variants × Sizes">
        <div className="border border-border overflow-x-auto">
          <div className="grid grid-cols-[100px_repeat(4,1fr)] border-b border-border bg-muted/40 min-w-120">
            <div className="px-3 py-2 font-mono text-sm text-muted-foreground border-r border-border">Variant</div>
            {BTN_SIZES.map((s) => (
              <div key={s} className="px-3 py-2 font-mono text-sm text-muted-foreground text-center">{s}</div>
            ))}
          </div>
          {BTN_VARIANTS.map((variant) => (
            <div key={variant} className="grid grid-cols-[100px_repeat(4,1fr)] border-b border-border last:border-b-0 min-w-120">
              <div className="px-3 py-4 font-mono text-sm text-muted-foreground flex items-center border-r border-border">
                {variant}
              </div>
              {BTN_SIZES.map((size) => (
                <div key={size} className="px-3 py-4 flex items-center justify-center">
                  <Button variant={variant} size={size}>Action</Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Sub>

      <Sub title="Icon Sizes">
        <div className="border border-border overflow-x-auto">
          <div className="grid grid-cols-[100px_repeat(4,1fr)] border-b border-border bg-muted/40 min-w-110">
            <div className="px-3 py-2 font-mono text-sm text-muted-foreground border-r border-border">Variant</div>
            {ICON_SIZES.map((s) => (
              <div key={s} className="px-3 py-2 font-mono text-sm text-muted-foreground text-center">{s}</div>
            ))}
          </div>
          {(["default", "outline", "ghost", "destructive"] as const).map((variant) => (
            <div key={variant} className="grid grid-cols-[100px_repeat(4,1fr)] border-b border-border last:border-b-0 min-w-110">
              <div className="px-3 py-4 font-mono text-sm text-muted-foreground flex items-center border-r border-border">
                {variant}
              </div>
              {ICON_SIZES.map((size) => (
                <div key={size} className="px-3 py-4 flex items-center justify-center">
                  <Button variant={variant} size={size}>
                    <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Sub>

      <Sub title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Button>
            <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} data-icon="inline-start" />
            Save changes
          </Button>
          <Button variant="outline">
            Export
            <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} data-icon="inline-end" />
          </Button>
          <Button variant="secondary">
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
            New item
          </Button>
          <Button disabled>
            Disabled
          </Button>
        </div>
      </Sub>
    </SectionWrap>
  )
}

// ─── 04. Badges ───────────────────────────────────────────────────────────────

const BADGE_VARIANTS = ["default", "secondary", "destructive", "outline", "ghost"] as const

function BadgesSection() {
  return (
    <SectionWrap
      id="badges" index="04" title="Badges"
      description="Inline status indicators. 20px height, sharp corners. Five variants mirroring the button system."
    >
      <Sub title="Variants">
        <div className="flex flex-wrap gap-3">
          {BADGE_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>{variant}</Badge>
          ))}
        </div>
      </Sub>

      <Sub title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Badge>
            <HugeiconsIcon icon={SunIcon} strokeWidth={2} data-icon="inline-start" />
            Published
          </Badge>
          <Badge variant="secondary">
            <HugeiconsIcon icon={EyeIcon} strokeWidth={2} data-icon="inline-start" />
            Draft
          </Badge>
          <Badge variant="destructive">
            <HugeiconsIcon icon={ShieldIcon} strokeWidth={2} data-icon="inline-start" />
            Error
          </Badge>
          <Badge variant="outline">
            <HugeiconsIcon icon={CodeIcon} strokeWidth={2} data-icon="inline-start" />
            v1.0.0
          </Badge>
        </div>
      </Sub>

      <Sub title="In Context">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm text-foreground">Deployment status</span>
          <Badge variant="secondary">Pending</Badge>
          <span className="text-sm text-muted-foreground">→</span>
          <Badge>Live</Badge>
        </div>
      </Sub>
    </SectionWrap>
  )
}

// ─── 05. Inputs ───────────────────────────────────────────────────────────────

function InputsSection() {
  return (
    <SectionWrap
      id="inputs" index="05" title="Inputs"
      description="Form controls. Text inputs and textareas are 32px tall at default size. Error states use aria-invalid for accessible validation feedback. All controls inherit the square geometry."
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        <Sub title="Text Input">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="input-normal">Username</FieldLabel>
              <Input id="input-normal" placeholder="Enter username" />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-error">Email</FieldLabel>
              <Input
                id="input-error"
                placeholder="your@email.com"
                aria-invalid="true"
                defaultValue="not-an-email"
              />
              <FieldDescription>Must be a valid email address.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="input-disabled">API Key</FieldLabel>
              <Input id="input-disabled" placeholder="sk-••••••••" disabled />
            </Field>
          </FieldGroup>
        </Sub>

        <Sub title="Textarea">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="ta-normal">Description</FieldLabel>
              <Textarea id="ta-normal" placeholder="Enter a description..." />
            </Field>
            <Field>
              <FieldLabel htmlFor="ta-error">Notes</FieldLabel>
              <Textarea
                id="ta-error"
                placeholder="Add notes..."
                aria-invalid="true"
              />
              <FieldDescription>This field is required.</FieldDescription>
            </Field>
          </FieldGroup>
        </Sub>

        <Sub title="Select">
          <FieldGroup>
            <Field>
              <FieldLabel>Plan</FieldLabel>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Region</FieldLabel>
              <Select defaultValue="us-east">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="us-east">US East</SelectItem>
                    <SelectItem value="us-west">US West</SelectItem>
                    <SelectItem value="eu-central">EU Central</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </Sub>
      </div>
    </SectionWrap>
  )
}

// ─── 06. Cards ────────────────────────────────────────────────────────────────

function CardsSection() {
  return (
    <SectionWrap
      id="cards" index="06" title="Cards"
      description="Container component using ring-1 ring-foreground/10 instead of a border. Supports header, content, footer, and action slots. Available in default and sm sizes."
    >
      <Sub title="Variants">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>Header and content slots only.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards use ring-1 ring-foreground/10 for a softer containment edge than a traditional border.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Footer</CardTitle>
              <CardDescription>Actions live in the footer slot.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The footer renders a top border and consistent padding automatically.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Confirm</Button>
              <Button variant="outline" size="sm">Cancel</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Action</CardTitle>
              <CardDescription>Top-right header action slot.</CardDescription>
              <CardAction>
                <Badge variant="secondary">Beta</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The action slot is positioned via a grid layout inside CardHeader.
              </p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Small Size</CardTitle>
              <CardDescription>Reduced padding via data-size=&quot;sm&quot;.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Compact variant for dense layouts.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Dialog</CardTitle>
              <CardDescription>Confirmation dialogs with media icon.</CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm">Open Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia>
                      <HugeiconsIcon icon={BluetoothIcon} strokeWidth={2} />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Confirm action</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Are you sure you want to continue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      </Sub>
    </SectionWrap>
  )
}

// ─── 07. Spacing ─────────────────────────────────────────────────────────────

const SPACING_SCALE = [
  { token: "1",  px: "4px",  cls: "w-1"  },
  { token: "2",  px: "8px",  cls: "w-2"  },
  { token: "3",  px: "12px", cls: "w-3"  },
  { token: "4",  px: "16px", cls: "w-4"  },
  { token: "5",  px: "20px", cls: "w-5"  },
  { token: "6",  px: "24px", cls: "w-6"  },
  { token: "8",  px: "32px", cls: "w-8"  },
  { token: "10", px: "40px", cls: "w-10" },
  { token: "12", px: "48px", cls: "w-12" },
  { token: "16", px: "64px", cls: "w-16" },
  { token: "20", px: "80px", cls: "w-20" },
  { token: "24", px: "96px", cls: "w-24" },
]

function SpacingSection() {
  return (
    <SectionWrap
      id="spacing" index="07" title="Spacing & Radius"
      description="4px base unit spacing scale. Border radius is globally 0 (rounded-none) — a deliberate design decision that defines the system's sharp, geometric character."
    >
      <Sub title="Spacing Scale">
        <div className="border border-border divide-y divide-border">
          {SPACING_SCALE.map(({ token, px, cls }) => (
            <div key={token} className="grid grid-cols-[72px_60px_1fr] items-center gap-4 px-4 py-2.5">
              <p className="font-mono text-sm text-muted-foreground">space-{token}</p>
              <p className="font-mono text-sm text-muted-foreground">{px}</p>
              <div className={`${cls} h-3 bg-primary shrink-0`} />
            </div>
          ))}
        </div>
      </Sub>

      <Sub title="Border Radius">
        <div className="flex items-end gap-8 flex-wrap">
          {[
            { label: "rounded-none", r: "rounded-none", value: "0px",       opacity: "" },
            { label: "rounded-sm",   r: "rounded-sm",   value: "2px",       opacity: "opacity-25" },
            { label: "rounded-md",   r: "rounded-md",   value: "6px",       opacity: "opacity-20" },
            { label: "rounded-xl",   r: "rounded-xl",   value: "12px",      opacity: "opacity-15" },
            { label: "rounded-full", r: "rounded-full", value: "∞",         opacity: "opacity-10" },
          ].map(({ label, r, value, opacity }) => (
            <div key={label} className={`flex flex-col items-center gap-2 ${opacity}`}>
              <div className={`size-12 bg-primary ${r}`} />
              <p className="font-mono text-sm text-muted-foreground">{label}</p>
              <p className="font-mono text-sm text-foreground font-medium">{value}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-sm text-muted-foreground mt-8 max-w-prose leading-relaxed">
          The --radius CSS variable is defined at 0.625rem but intentionally overridden everywhere
          with rounded-none. All components, inputs, cards, dialogs, and badges inherit this zero-radius
          geometry as a core identity decision.
        </p>
      </Sub>
    </SectionWrap>
  )
}

function MobileNav() {
  const active = useActiveSection()
  const itemRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({})

  React.useEffect(() => {
    const el = itemRefs.current[active]
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [active])

  return (
    <nav className="lg:hidden sticky top-0 z-20 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-6 px-6 py-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <div className="size-2.5 bg-primary" />
          <span className="font-pixel-square text-base">qella</span>
        </div>
        <div className="flex gap-1 pr-6">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              ref={(el) => { itemRefs.current[id] = el }}
              aria-current={active === id ? "true" : undefined}
              className={`font-mono text-sm px-3 py-1 whitespace-nowrap transition-colors ${
                active === id
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BrandingPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground flex-col lg:flex-row">
      <SideNav />
      <MobileNav />

      <main className="flex-1 lg:ml-52">
        <header className="border-b border-border px-6 py-10 md:px-12 lg:px-16 lg:py-12">
          <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-2">
            Qella · Design System
          </p>
          <h1 className="font-sans text-3xl md:text-4xl font-medium tracking-tight">Brand Reference</h1>
          <p className="text-muted-foreground text-sm/relaxed mt-3 max-w-lg">
            A comprehensive reference for colors, typography, components, and spatial decisions.
            Built on Tailwind v4, shadcn radix-lyra, Geist typefaces, and oklch color space.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <Badge variant="outline">Tailwind v4</Badge>
            <Badge variant="outline">shadcn radix-lyra</Badge>
            <Badge variant="outline">oklch</Badge>
            <Badge variant="outline">Geist</Badge>
            <Badge variant="outline">HugeIcons</Badge>
          </div>
        </header>

        <div className="px-6 md:px-12 lg:px-16">
          <ColorsSection />
          <TypographySection />
          <ButtonsSection />
          <BadgesSection />
          <InputsSection />
          <CardsSection />
          <SpacingSection />
        </div>
      </main>
    </div>
  )
}
