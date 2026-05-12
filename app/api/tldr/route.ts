import { NextResponse } from "next/server";
import { getBill } from "@/lib/data/bills";
import { callClaude, hasClaudeKey } from "@/lib/claude";

export async function POST(req: Request) {
  try {
    const { billId } = (await req.json()) as { billId?: string };
    if (!billId) {
      return NextResponse.json({ error: "billId required" }, { status: 400 });
    }
    const bill = getBill(billId);
    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    if (hasClaudeKey()) {
      const live = await callClaude({
        system:
          "You write TL;DR summaries for PARTI, a civic operating system. Voice: calm, editorial, plainspoken, non-partisan, never sensational. Write 2-3 sentences, max 60 words. Lead with what the bill actually does, not procedural status. No bullet points, no headers.",
        messages: [
          {
            role: "user",
            content: [
              `Bill: ${bill.number} — ${bill.title}`,
              `Status: ${bill.status} in the ${bill.chamber}`,
              `Plain summary: ${bill.summaryPlain}`,
              `Problem: ${bill.problem}`,
              `Intended consequences: ${bill.intended.join("; ")}`,
              "Write the TL;DR.",
            ].join("\n\n"),
          },
        ],
        maxTokens: 240,
      });
      if (live) return NextResponse.json({ tldr: live, source: "claude" });
    }

    const tldr = canned(bill.id) ?? fallback(bill);
    return NextResponse.json({ tldr, source: "canned" });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function canned(id: string): string | null {
  const CANNED: Record<string, string> = {
    "hr-2847":
      "If your city legalizes duplexes and small apartment buildings near transit, it qualifies for expanded federal housing funding. The bill aims to ease the housing shortage that drives rent and home prices — with tenant protections built in to limit displacement.",
    "s-1124":
      "Most families earning under $250,000 would pay no more than 7% of their income on childcare. The federal government and states would share the cost, raise pay for childcare workers, and fund the workforce expansion needed to make it real.",
    "hr-3902":
      "Frontier AI systems used in federal, financial, or healthcare contexts would face mandatory third-party audits, training data disclosures, and incident reporting. Smaller open-source models stay outside the regulated tier by design.",
    "hr-4501":
      "$180 billion over eight years to harden the grid, water systems, and transportation infrastructure against climate risk. Rural and tribal jurisdictions get a higher federal cost-share, recognizing that resilience is cheaper than recovery.",
    "s-887":
      "Small businesses get a permanently higher equipment-expensing limit, lighter federal reporting burdens, and a modernized SBA lending program. Designed to lower friction for firms under 50 employees.",
  };
  return CANNED[id] ?? null;
}

function fallback(bill: NonNullable<ReturnType<typeof getBill>>) {
  return `${bill.oneLiner} The bill is currently ${bill.status.toLowerCase()} in the ${bill.chamber}.`;
}
