import type { Metadata } from "next";
import Link from "next/link";
import { BILLS } from "@/lib/data/bills";
import { getPolitician } from "@/lib/data/politicians";
import { StatusBadge } from "@/components/status-badge";
import { PartyPill } from "@/components/party-pill";

export const metadata: Metadata = {
  title: "Legislative Intelligence",
  description: "Every bill, translated into the language of consequence.",
};

export default function BillsPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <header className="border-b border-rule pb-8">
        <div className="eyebrow mb-3">Legislative Intelligence</div>
        <h1 className="editorial-h2 max-w-[28ch]">
          Every bill, translated into the language of consequence.
        </h1>
        <p className="mt-4 body max-w-prose">
          Plain-English summaries, problem framing, intended and unintended
          consequences, sponsor history, donor influence, and public sentiment.
          For every bill PARTI tracks.
        </p>
      </header>

      <div className="mt-10">
        <div className="grid grid-cols-12 gap-4 px-2 pb-3 border-b border-rule text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          <div className="col-span-2">Number</div>
          <div className="col-span-5">Bill</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Sponsor</div>
          <div className="col-span-1 text-right">Cosponsors</div>
        </div>
        <ul>
          {BILLS.map((b) => {
            const sponsor = getPolitician(b.sponsorId);
            return (
              <li key={b.id} className="rule-row hover:bg-white transition-colors">
                <Link
                  href={`/bills/${b.id}`}
                  className="grid grid-cols-12 gap-4 items-center px-2 py-5"
                >
                  <div className="col-span-2 data-num">{b.number}</div>
                  <div className="col-span-5">
                    <div className="font-serif text-[18px] md:text-[19px] tracking-editorial text-ink leading-tight">
                      {b.title}
                    </div>
                    <div className="mt-1.5 text-[12.5px] text-ink-muted max-w-prose line-clamp-2">
                      {b.oneLiner}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="col-span-2">
                    {sponsor && (
                      <div className="flex items-center gap-2">
                        <PartyPill party={sponsor.party} />
                        <span className="text-[12.5px] text-ink-mid truncate">
                          {sponsor.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 text-right data-num">{b.cosponsors}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
