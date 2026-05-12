import type { Metadata } from "next";
import Link from "next/link";
import { POLITICIANS } from "@/lib/data/politicians";
import { PartyPill } from "@/components/party-pill";
import { Monogram } from "@/components/monogram";

export const metadata: Metadata = {
  title: "Political Athletes",
  description: "The scoreboard of power — politicians, scored transparently.",
};

export default function PoliticiansPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <header className="border-b border-rule pb-8">
        <div className="eyebrow mb-3">Political Athletes</div>
        <h1 className="editorial-h2 max-w-[24ch]">
          The scoreboard of power.
        </h1>
        <p className="mt-4 body max-w-prose">
          PARTI grades politicians the way we grade athletes: promise
          fulfillment, bipartisan cooperation, constituent approval, attendance,
          bill success, and responsiveness. Every score is methodologically
          explained and sourced.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-12 gap-4 px-2 pb-3 border-b border-rule text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        <div className="col-span-4">Politician</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-1 text-right">Promises</div>
        <div className="col-span-1 text-right">Bipartisan</div>
        <div className="col-span-1 text-right">Approval</div>
        <div className="col-span-1 text-right">Attendance</div>
        <div className="col-span-1 text-right">Success</div>
        <div className="col-span-1 text-right">Response</div>
      </div>
      <ul>
        {POLITICIANS.map((p) => (
          <li key={p.id} className="rule-row hover:bg-white">
            <Link
              href={`/politicians/${p.id}`}
              className="grid grid-cols-12 gap-4 items-center px-2 py-5"
            >
              <div className="col-span-4 flex items-center gap-4 min-w-0">
                <Monogram name={p.name} color={p.monogramColor} size={40} />
                <div className="min-w-0">
                  <div className="font-serif text-[18px] tracking-editorial text-ink leading-tight truncate">
                    {p.name}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <PartyPill party={p.party} />
                    <span className="text-[12px] text-ink-muted">
                      {p.state}
                      {p.district ? `-${p.district}` : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-[13.5px] text-ink-mid">{p.role}</div>
              <ScoreCell value={p.scores.promiseFulfillment} />
              <ScoreCell value={p.scores.bipartisanship} />
              <ScoreCell value={p.scores.constituentApproval} />
              <ScoreCell value={p.scores.attendance} />
              <ScoreCell value={p.scores.billSuccess} />
              <ScoreCell value={p.scores.responsiveness} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScoreCell({ value }: { value: number }) {
  return (
    <div className="col-span-1 text-right">
      <span className="data-num text-ink">{value}</span>
    </div>
  );
}
