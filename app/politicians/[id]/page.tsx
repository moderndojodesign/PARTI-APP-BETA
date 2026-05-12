import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POLITICIANS, getPolitician, partyLabel } from "@/lib/data/politicians";
import { getBill } from "@/lib/data/bills";
import { getIssue } from "@/lib/data/issues";
import { Monogram } from "@/components/monogram";
import { PartyPill } from "@/components/party-pill";
import { ScoreBar } from "@/components/score-bar";

export function generateStaticParams() {
  return POLITICIANS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getPolitician(id);
  if (!p) return {};
  return {
    title: `${p.name} · Political Athlete`,
    description: p.bio,
  };
}

export default async function PoliticianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getPolitician(id);
  if (!p) notFound();

  return (
    <article>
      <header className="border-b border-rule" style={{ background: `${p.monogramColor}08` }}>
        <div className="container-page pt-14 pb-12">
          <Link href="/politicians" className="ui-label hover:text-ink">
            ← Political Athletes
          </Link>
          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8">
            <Monogram name={p.name} color={p.monogramColor} size={112} />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <PartyPill party={p.party} />
                <span className="ui-label">{partyLabel(p.party)}</span>
                <span className="text-ink-muted">·</span>
                <span className="ui-label">
                  {p.role} · {p.state}
                  {p.district ? `-${p.district}` : ""}
                </span>
                <span className="text-ink-muted">·</span>
                <span className="ui-label">{p.yearsInOffice} years in office</span>
              </div>
              <h1 className="editorial-h1 mt-4">{p.name}</h1>
              <p className="mt-5 body text-[17px] max-w-prose">{p.bio}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.topIssues.map((slug) => {
                  const i = getIssue(slug);
                  if (!i) return null;
                  return (
                    <Link key={slug} href={`/issues/${slug}`} className="chip">
                      {i.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="md:self-start flex gap-2">
              <button className="btn-primary">Follow</button>
              <button className="btn-secondary">Share</button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-page py-14 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <section>
            <div className="ui-label">Athlete Scorecard</div>
            <h2 className="font-serif text-[26px] mt-1.5 tracking-editorial text-ink">
              Six dimensions of civic performance.
            </h2>
            <p className="mt-3 body-sm max-w-prose">
              Each score is a 0–100 composite, weighted across primary sources.
              Click any dimension on the public methodology page to inspect the
              weighting model and underlying data.
            </p>
            <div className="mt-6 card p-5 md:p-6">
              <ScoreBar
                label="Promise Fulfillment"
                value={p.scores.promiseFulfillment}
                hint="Kept, partial, broken, and pending campaign and floor-statement commitments."
              />
              <ScoreBar
                label="Bipartisan Cooperation"
                value={p.scores.bipartisanship}
                hint="Cross-aisle cosponsorship rate and bipartisan bill participation."
              />
              <ScoreBar
                label="Constituent Approval"
                value={p.scores.constituentApproval}
                hint="Rolling 90-day weighted average of district polling."
              />
              <ScoreBar
                label="Attendance"
                value={p.scores.attendance}
                hint="Recorded votes attended over the current session."
              />
              <ScoreBar
                label="Bill Success Rate"
                value={p.scores.billSuccess}
                hint="Sponsored or lead-cosponsored legislation that progressed past committee."
              />
              <ScoreBar
                label="Responsiveness"
                value={p.scores.responsiveness}
                hint="Constituent correspondence and public availability metrics."
              />
            </div>
          </section>

          <section>
            <div className="ui-label">Promises Tracker</div>
            <h2 className="font-serif text-[26px] mt-1.5 tracking-editorial text-ink">
              Words versus record.
            </h2>
            <ul className="mt-5 divide-y divide-rule border border-rule rounded-[4px] overflow-hidden bg-parchment">
              {p.promises.map((pr) => (
                <li key={pr.label} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4 items-center">
                  <span className="text-[14.5px] text-ink">{pr.label}</span>
                  <PromiseTag status={pr.status} />
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="ui-label">Top Donors & Funding</div>
            <h2 className="font-serif text-[26px] mt-1.5 tracking-editorial text-ink">
              Where the money comes from.
            </h2>
            <table className="mt-5 w-full text-[14px]">
              <thead className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                <tr className="border-b border-rule">
                  <th className="py-2 text-left font-medium">Donor</th>
                  <th className="py-2 text-left font-medium">Sector</th>
                  <th className="py-2 text-right font-medium">Cycle Total</th>
                </tr>
              </thead>
              <tbody>
                {p.topDonors.map((d) => (
                  <tr key={d.name} className="border-b border-rule last:border-0">
                    <td className="py-3 text-ink">{d.name}</td>
                    <td className="py-3 text-ink-mid">{d.sector}</td>
                    <td className="py-3 text-right data-num">{d.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {p.recentVotes.length > 0 && (
            <section>
              <div className="ui-label">Recent Votes</div>
              <h2 className="font-serif text-[26px] mt-1.5 tracking-editorial text-ink">
                Last five recorded votes.
              </h2>
              <ul className="mt-5 grid gap-px bg-rule border border-rule rounded-[4px] overflow-hidden sm:grid-cols-2">
                {p.recentVotes.map((v) => {
                  const bill = getBill(v.bill.toLowerCase());
                  return (
                    <li key={v.bill} className="bg-parchment p-4 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="data-num text-ink-muted">{v.bill}</div>
                        <div className="text-[13.5px] text-ink truncate">
                          {bill ? (
                            <Link href={`/bills/${bill.id}`} className="hover:underline">
                              {bill.title}
                            </Link>
                          ) : (
                            "—"
                          )}
                        </div>
                      </div>
                      <VoteTag vote={v.vote} />
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-20 self-start">
          <section>
            <div className="ui-label mb-3">Committees</div>
            <ul className="space-y-2">
              {p.committees.length === 0 ? (
                <li className="body-sm">Executive office — no committee assignments.</li>
              ) : (
                p.committees.map((c) => (
                  <li key={c} className="border-b border-rule pb-2 text-[14px] text-ink">
                    {c}
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="border-t border-rule pt-6">
            <div className="ui-label mb-2">Methodology</div>
            <p className="body-sm max-w-prose">
              PARTI scores are designed for emotional neutrality, not partisan
              alignment. Every dimension can be inspected, reweighted by the
              reader, and traced back to its source.
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}

function PromiseTag({
  status,
}: {
  status: "Kept" | "Broken" | "Partial" | "Pending";
}) {
  const color =
    status === "Kept"
      ? "#3F5D3C"
      : status === "Broken"
      ? "#7A1F2B"
      : status === "Partial"
      ? "#C8772E"
      : "#6B6960";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.14em]"
      style={{ color }}
    >
      <span className="inline-block size-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

function VoteTag({ vote }: { vote: "Yea" | "Nay" | "Present" | "No Vote" }) {
  const color =
    vote === "Yea"
      ? "#3F5D3C"
      : vote === "Nay"
      ? "#7A1F2B"
      : vote === "Present"
      ? "#C8772E"
      : "#6B6960";
  return (
    <span
      className="text-[11.5px] uppercase tracking-[0.14em] font-medium"
      style={{ color }}
    >
      {vote}
    </span>
  );
}
