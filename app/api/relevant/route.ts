import { NextResponse } from "next/server";
import { getBill } from "@/lib/data/bills";
import { callClaude, hasClaudeKey } from "@/lib/claude";

type Body = {
  billId?: string;
  zip?: string;
  profession?: string;
  scope?: "Neighborhood" | "Municipality" | "County" | "State" | "National";
};

type RelevanceResult = {
  headline: string;
  bullets: string[];
  scope: string;
  source: "claude" | "canned";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const billId = body.billId;
    const zip = (body.zip ?? "").trim();
    const profession = (body.profession ?? "").trim();
    const scope = body.scope ?? "Municipality";

    if (!billId) {
      return NextResponse.json({ error: "billId required" }, { status: 400 });
    }
    const bill = getBill(billId);
    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    if (hasClaudeKey()) {
      const live = await callClaudeRelevance(bill, { zip, profession, scope });
      if (live) return NextResponse.json(live);
    }

    return NextResponse.json(generateCanned(bill, { zip, profession, scope }));
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function callClaudeRelevance(
  bill: NonNullable<ReturnType<typeof getBill>>,
  ctx: { zip: string; profession: string; scope: string }
): Promise<RelevanceResult | null> {
  const text = await callClaude({
    system:
      'You translate legislation through a citizen\'s personal context for PARTI, a civic operating system. Voice: calm, editorial, plainspoken, non-partisan. Output strict JSON with this shape: {"headline": string, "bullets": string[]}. Provide 3-5 concrete, specific bullets. Each bullet under 35 words. No hedging filler. No partisan framing.',
    messages: [
      {
        role: "user",
        content: [
          `Bill: ${bill.number} — ${bill.title}`,
          `Plain summary: ${bill.summaryPlain}`,
          `Problem: ${bill.problem}`,
          `Intended: ${bill.intended.join("; ")}`,
          `Unintended: ${bill.unintended.join("; ")}`,
          `Economic impact: ${bill.economicImpact}`,
          `Community impact: ${bill.communityImpact}`,
          "",
          `Reader context:`,
          `ZIP: ${ctx.zip || "unspecified"}`,
          `Profession: ${ctx.profession || "unspecified"}`,
          `Civic scope: ${ctx.scope}`,
          "",
          "Return JSON only.",
        ].join("\n"),
      },
    ],
    maxTokens: 700,
  });

  if (!text) return null;
  try {
    const json = JSON.parse(extractJson(text)) as {
      headline?: string;
      bullets?: string[];
    };
    if (!json.headline || !Array.isArray(json.bullets)) return null;
    return {
      headline: json.headline,
      bullets: json.bullets.slice(0, 6),
      scope: ctx.scope,
      source: "claude",
    };
  } catch {
    return null;
  }
}

function extractJson(s: string) {
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start === -1 || end === -1) return s;
  return s.slice(start, end + 1);
}

function generateCanned(
  bill: NonNullable<ReturnType<typeof getBill>>,
  ctx: { zip: string; profession: string; scope: string }
): RelevanceResult {
  const where = ctx.zip ? `ZIP ${ctx.zip}` : "your area";
  const who = ctx.profession ? ` and people working as a ${ctx.profession.toLowerCase()}` : "";

  const HEADLINES: Record<string, string> = {
    "hr-2847": `What ${bill.number} could change for housing in ${where}.`,
    "s-1124": `What ${bill.number} could mean for households in ${where}${who}.`,
    "hr-3902": `What ${bill.number} could mean for technology workers and consumers in ${where}.`,
    "hr-4501": `Where ${bill.number} could touch infrastructure in ${where}.`,
    "s-887": `What ${bill.number} could change for small businesses in ${where}.`,
  };

  const BULLETS: Record<string, string[]> = {
    "hr-2847": [
      `If your municipality opts in, single-family-only zoning near transit would be relaxed — likely increasing the supply of duplexes, ADUs, and small multifamily housing.`,
      `Renters earning between 60% and 120% of area median income would be the most direct beneficiaries; legacy homeowners may see property-value changes.`,
      `Local planning departments would gain expanded federal funding tied to participation, with anti-displacement guardrails attached.`,
      `Watch your city council's response — adoption is municipality-by-municipality, not automatic.`,
    ],
    "s-1124": [
      `If your household earns under ~$250K and includes children under 13, your childcare costs would be capped at 7% of income.`,
      `Childcare workers in your region would see minimum wage floors and credentialing pathways funded by federal-state cost share.`,
      `Labor force participation among parents — especially mothers — is projected to rise, which can affect local labor markets.`,
      `Implementation quality varies by state; your governor and state legislature will shape how this lands locally.`,
    ],
    "hr-3902": [
      `Frontier AI systems deployed in healthcare, finance, or government in your region would face new audit and incident-reporting requirements.`,
      `Open-source AI work and most consumer applications fall below the regulated threshold and are largely unaffected.`,
      `If you work in a regulated industry deploying AI, expect new vendor diligence and procurement requirements.`,
      `Local universities and research labs would likely see new pathways for AI assurance and auditing work.`,
    ],
    "hr-4501": [
      `Federal cost-share would fund hardening of grid, water, and transportation infrastructure in your county.`,
      `Rural and tribal jurisdictions receive a 70% federal match — relevant to fire-, flood-, and storm-prone regions.`,
      `Construction labor markets in your region will tighten; trades workers may see meaningful wage growth.`,
      `Watch your utility regulator and county transportation agency for project announcements over the next 12–24 months.`,
    ],
    "s-887": [
      `If you operate a business with under 50 employees, expect reduced federal reporting requirements and a higher equipment-expensing ceiling.`,
      `SBA 7(a) lending modernization should make working-capital loans faster and more accessible in under-banked geographies.`,
      `Sole proprietors with significant capital expenses (vehicles, equipment) see the most direct tax benefit.`,
      `Critics note revenue offset is partial; watch state-level decisions on conforming to or decoupling from the federal change.`,
    ],
  };

  return {
    headline: HEADLINES[bill.id] ?? `What ${bill.number} could mean for ${where}.`,
    bullets:
      BULLETS[bill.id] ??
      [
        `Tracks one or more of the issues you've indicated matter most to you.`,
        `Affects regulatory or fiscal context in ${where}.`,
        `Implementation will depend on action from state and local officials.`,
      ],
    scope: ctx.scope,
    source: "canned",
  };
}
