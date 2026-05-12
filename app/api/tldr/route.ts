import { NextResponse } from "next/server";
import { getBill } from "@/lib/data/bills";

// Claude-ready stub. To wire this to a live model:
// 1. Set ANTHROPIC_API_KEY in .env.local
// 2. Replace the canned response below with an Anthropic Messages API call
//    using the bill.summaryPlain, bill.problem, intended, and unintended
//    fields as the input to a "produce a 2-3 sentence TL;DR in PARTI's
//    calm editorial voice" system prompt.

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

    const tldr = await generateTldr(bill);
    return NextResponse.json({ tldr });
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function generateTldr(bill: ReturnType<typeof getBill>) {
  if (!bill) return "";
  // Brief simulated latency to mimic model call.
  await new Promise((r) => setTimeout(r, 450));

  // Canned editorial TL;DRs, one per bill. When you wire Claude in, this
  // becomes the model output and the canned text becomes the fallback.
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

  return (
    CANNED[bill.id] ??
    `${bill.oneLiner} The bill is currently ${bill.status.toLowerCase()} in the ${bill.chamber}.`
  );
}
