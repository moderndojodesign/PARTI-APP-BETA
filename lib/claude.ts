type Message = { role: "user" | "assistant"; content: string };

type AnthropicResponse = {
  content: { type: string; text?: string }[];
};

const API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-4-6";

export function hasClaudeKey() {
  return !!process.env.ANTHROPIC_API_KEY;
}

export async function callClaude(opts: {
  system: string;
  messages: Message[];
  maxTokens?: number;
  model?: string;
}): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: opts.model ?? DEFAULT_MODEL,
        max_tokens: opts.maxTokens ?? 600,
        system: opts.system,
        messages: opts.messages,
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as AnthropicResponse;
    const text = data.content?.map((c) => c.text).filter(Boolean).join("\n").trim();
    return text || null;
  } catch {
    return null;
  }
}
