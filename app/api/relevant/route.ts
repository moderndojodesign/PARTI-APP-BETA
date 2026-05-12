import { NextResponse } from "next/server";
import { getBill } from "@/lib/data/bills";

// Claude-ready stub. To wire this to a live model:
// 1. Set ANTHROPIC_API_KEY in .env.local
// 2. Replace generateRelevance() with an Anthropic Messages API call.
//    Pass: bill summary + framing, plus { zip, profession, scope } as user
//    context. Ask the model for { headline, bullets[], scope } JSON in PARTI's
//    calm editorial voice. Validate the schema before returning.

type Body = {
  billId?: string;
  zip?: string;
  profession?: string;
  scope?: "Neighborhood" | "Municipality" | "County" | "State" | "National";
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

    const result = await generateRelevance(bill, { zip, profession, scope });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function generateRelevance(
  bill: NonNullable<ReturnType<typeof getBill>>,
  ctx: { zip: string; profession: string; scope: string }
) {
  await new Promise((r) => setTimeout(r, 700));

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
  };
}
