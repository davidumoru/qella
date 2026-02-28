import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Alibaba from "@lobehub/icons/es/Alibaba";
import Anthropic from "@lobehub/icons/es/Anthropic";
import Cohere from "@lobehub/icons/es/Cohere";
import DeepSeek from "@lobehub/icons/es/DeepSeek";
import Google from "@lobehub/icons/es/Google";
import Mistral from "@lobehub/icons/es/Mistral";
import Moonshot from "@lobehub/icons/es/Moonshot";
import OpenAI from "@lobehub/icons/es/OpenAI";
import Vercel from "@lobehub/icons/es/Vercel";
import XAI from "@lobehub/icons/es/XAI";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PROVIDER_ICON: Record<string, React.ComponentType<any>> = {
  xAI: XAI,
  Vercel: Vercel,
  OpenAI: OpenAI,
  Anthropic: Anthropic,
  Google: Google.Color,
  Mistral: Mistral.Color,
  Cohere: Cohere.Color,
  DeepSeek: DeepSeek.Color,
  "Moonshot AI": Moonshot,
  Alibaba: Alibaba.Color,
};

export const metadata: Metadata = { title: "Models — Qella Beta" };

interface Model {
  id: string;
  name: string;
  provider: string;
  vision: boolean;
  tools: boolean;
  streaming: boolean;
}

const MODELS: Model[] = [
  // xAI
  {
    id: "grok-4-fast-reasoning",
    name: "Grok 4 Fast Reasoning",
    provider: "xAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "grok-4",
    name: "Grok 4",
    provider: "xAI",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "grok-3",
    name: "Grok 3",
    provider: "xAI",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "grok-3-fast",
    name: "Grok 3 Fast",
    provider: "xAI",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "grok-3-mini",
    name: "Grok 3 Mini",
    provider: "xAI",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "grok-2-vision",
    name: "Grok 2 Vision",
    provider: "xAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  // Vercel
  {
    id: "v0-1-0-md",
    name: "v0-1.0-md",
    provider: "Vercel",
    vision: true,
    tools: true,
    streaming: true,
  },
  // OpenAI
  {
    id: "gpt-5-2-pro",
    name: "GPT-5.2 Pro",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-5-2",
    name: "GPT-5.2",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-5-1",
    name: "GPT-5.1",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-5-1-codex",
    name: "GPT-5.1 Codex",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-4-1",
    name: "GPT-4.1",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-4-1-mini",
    name: "GPT-4.1 Mini",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    vision: true,
    tools: true,
    streaming: true,
  },
  // Anthropic
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-opus-4-5",
    name: "Claude Opus 4.5",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-opus-4-1",
    name: "Claude Opus 4.1",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-sonnet-4-0",
    name: "Claude Sonnet 4.0",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    vision: true,
    tools: true,
    streaming: true,
  },
  // Google
  {
    id: "gemini-3-1-pro-preview",
    name: "Gemini 3.1 Pro Preview",
    provider: "Google",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gemini-3-pro-preview",
    name: "Gemini 3 Pro Preview",
    provider: "Google",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    vision: true,
    tools: true,
    streaming: true,
  },
  // Mistral
  {
    id: "pixtral-large",
    name: "Pixtral Large",
    provider: "Mistral",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "magistral-medium",
    name: "Magistral Medium",
    provider: "Mistral",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "magistral-small",
    name: "Magistral Small",
    provider: "Mistral",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "mistral-small",
    name: "Mistral Small",
    provider: "Mistral",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "ministral-8b",
    name: "Ministral 8B",
    provider: "Mistral",
    vision: false,
    tools: true,
    streaming: true,
  },
  // Cohere
  {
    id: "command-a",
    name: "Command A",
    provider: "Cohere",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "command-a-reasoning",
    name: "Command A Reasoning",
    provider: "Cohere",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "command-r",
    name: "Command R",
    provider: "Cohere",
    vision: false,
    tools: true,
    streaming: true,
  },
  // DeepSeek
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    provider: "DeepSeek",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "deepseek-reasoner",
    name: "DeepSeek Reasoner",
    provider: "DeepSeek",
    vision: false,
    tools: true,
    streaming: true,
  },
  // Moonshot AI
  {
    id: "kimi-k2-5",
    name: "Kimi K2.5",
    provider: "Moonshot AI",
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    provider: "Moonshot AI",
    vision: false,
    tools: true,
    streaming: true,
  },
  // Alibaba
  {
    id: "qwen3-max",
    name: "Qwen3 Max",
    provider: "Alibaba",
    vision: false,
    tools: true,
    streaming: true,
  },
  {
    id: "qwen-plus",
    name: "Qwen Plus",
    provider: "Alibaba",
    vision: false,
    tools: true,
    streaming: true,
  },
];

function toSlug(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

const PROVIDERS = Array.from(new Set(MODELS.map((m) => m.provider)));

export default async function ModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string }>;
}) {
  const { provider } = await searchParams;
  const active = provider ?? null;
  const filtered = active
    ? MODELS.filter((m) => toSlug(m.provider) === active)
    : MODELS;

  return (
    <div>
      <div className="border-b border-border px-8 py-6">
        <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground mb-1.5">
          Roster
        </p>
        <h1 className="font-sans text-2xl font-medium tracking-tight">
          Models
        </h1>
        <p className="text-muted-foreground text-sm/relaxed mt-2 max-w-lg">
          All models accessible through the arena. Each plays under the same
          rules with no human intervention.
        </p>
      </div>

      <div className="px-8 py-6">
        <nav
          aria-label="Filter by provider"
          className="flex gap-px mb-6 border-b border-border pb-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <Link
            href="/beta/models"
            className={cn(
              "px-3 py-1.5 font-mono text-sm transition-colors whitespace-nowrap shrink-0",
              !active
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All
            <span className="ml-1.5 text-xs opacity-50">{MODELS.length}</span>
          </Link>
          {PROVIDERS.map((p) => {
            const slug = toSlug(p);
            const isActive = active === slug;
            const count = MODELS.filter((m) => m.provider === p).length;
            return (
              <Link
                key={p}
                href={`/beta/models?provider=${slug}`}
                className={cn(
                  "px-3 py-1.5 font-mono text-sm transition-colors whitespace-nowrap shrink-0",
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
                <span className="ml-1.5 text-xs opacity-50">{count}</span>
              </Link>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((model) => (
            <div key={model.id} className="border border-border p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-sans text-base font-medium">
                    {model.name}
                  </p>
                  <p className="font-mono text-sm text-muted-foreground">
                    {model.provider}
                  </p>
                </div>
                {(() => {
                  const Icon = PROVIDER_ICON[model.provider];
                  return Icon ? (
                    <Icon size={20} className="shrink-0 mt-0.5" />
                  ) : null;
                })()}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {model.vision && <Badge variant="outline">Vision</Badge>}
                {model.tools && <Badge variant="outline">Tools</Badge>}
                {model.streaming && <Badge variant="outline">Streaming</Badge>}
                {!model.vision && !model.tools && !model.streaming && (
                  <span className="font-mono text-xs text-muted-foreground">
                    —
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
