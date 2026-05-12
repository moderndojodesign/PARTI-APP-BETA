import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BILLS, getBill } from "@/lib/data/bills";
import { getPolitician } from "@/lib/data/politicians";
import { getIssue } from "@/lib/data/issues";
import { StatusBadge } from "@/components/status-badge";
import { PartyPill } from "@/components/party-pill";
import { Monogram } from "@/components/monogram";
import { TldrPanel } from "@/components/tldr-panel";
import { RelevancePanel } from "@/components/relevance-panel";

export function generateStaticParams() {
  return BILLS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const bill = getBill(id);
  if (!bill) return {};
  return {
    title: `${bill.number} · ${bill.title}`,
    description: bill.oneLiner,
  };
}

export default async function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bill = getBill(id);
  if (!bill) notFound();

  const sponsor = getPolitician(bill.sponsorId);

  return (
    <article>
      <header className="border-b border-rule">
        <div className="container-page pt-14 pb-10">
          <Link href="/bills" className="ui-label hover:text-ink">
            ← Legislative Intelligence
          </Link>
          <div className="mt-6 flex items-start justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="data-num text-ink-muted">{bill.number}</span>
                <span className="text-ink-muted">·</span>
                <span className="ui-label">{bill.chamber}</span>
                <span className="text-ink-muted">·</span>
                <StatusBadge status={bill.status} />
              </div>
              <h1 className="editorial-h1 mt-6">{bill.title}</h1>
              <p className="mt-6 body text-[17px] max-w-prose">{bill.oneLiner}</p>
            </div>
            <div className="card p-5 min-w-[260px]">
              <div className="ui-label mb-3">Public Sentiment</div>
              <SentimentBar sentiment={bill.sentiment} />
              <div className="mt-4 text-[11.5px] text-ink-muted leading-snug">
                Methodology: weighted across district polling, public comments,
                and verified survey panels.
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-page py-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <TldrPanel billId={bill.id} />
          <RelevancePanel billId={bill.id} />

          <Section title="Plain English Summary" eyebrow="Summary">
            <p className="body max-w-prose">{bill.summaryPlain}</p>
          </Section>

          <Section title="The Problem This Tries to Solve" eyebrow="Framing">
            <p className="body max-w-prose">{bill.problem}</p>
          </Section>

          <div className="grid gap-px bg-rule border border-rule rounded-[4px] md:grid-cols-2 overflow-hidden">
            <ConsequenceColumn
              eyebrow="Intended Consequences"
              tone="positive"
              items={bill.intended}
            />
            <ConsequenceColumn
              eyebrow="Potential Unintended Consequences"
              tone="caution"
              items={bill.unintended}
            />
          </div>

          <Section title="Economic Impact" eyebrow="Impact">
            <p className="body max-w-prose">{bill.economicImpact}</p>
          </Section>

          <Section title="Community Impact" eyebrow="Impact">
            <p className="body max-w-prose">{bill.communityImpact}</p>
          </Section>

          <Section title="Timeline" eyebrow="Tracking">
            <ol className="space-y-3 max-w-prose">
              {bill.timeline.map((t) => (
                <li key={t.event} className="flex gap-4 border-b border-rule pb-3 last:border-0">
                  <span className="ui-label w-[110px] shrink-0">{t.date}</span>
                  <span className="body-sm text-ink">{t.event}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Lobbying & Donor Influence" eyebrow="Power Mapping">
            <table className="w-full text-[14px]">
              <thead className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                <tr className="border-b border-rule">
                  <th className="py-2 text-left font-medium">Entity</th>
                  <th className="py-2 text-left font-medium">Amount</th>
                  <th className="py-2 text-left font-medium">Position</th>
                </tr>
              </thead>
              <tbody>
                {bill.lobbying.map((l) => (
                  <tr key={l.entity} className="border-b border-rule last:border-0">
                    <td className="py-3 text-ink">{l.entity}</td>
                    <td className="py-3 data-num">{l.amount}</td>
                    <td className="py-3">
                      <PositionPill position={l.position} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <div className="grid gap-px bg-rule border border-rule rounded-[4px] md:grid-cols-2 overflow-hidden">
            <Coalitions eyebrow="Supporting" items={bill.support} accent="#3F5D3C" />
            <Coalitions eyebrow="Opposing" items={bill.opposition} accent="#7A1F2B" />
          </div>

          {bill.constitutional && (
            <Section title="Constitutional Concerns" eyebrow="Legal">
              <p className="body max-w-prose">{bill.constitutional}</p>
            </Section>
          )}

          {bill.history && (
            <Section title="Historical Comparisons" eyebrow="Memory">
              <p className="body max-w-prose">{bill.history}</p>
            </Section>
          )}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-20 self-start">
          {sponsor && (
            <section>
              <div className="ui-label mb-4">Sponsor</div>
              <Link
                href={`/politicians/${sponsor.id}`}
                className="card p-4 flex items-center gap-4 hover:bg-white"
              >
                <Monogram name={sponsor.name} color={sponsor.monogramColor} size={44} />
                <div>
                  <div className="font-serif text-[16px] tracking-editorial text-ink leading-tight">
                    {sponsor.name}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <PartyPill party={sponsor.party} />
                    <span className="text-[11.5px] text-ink-muted">
                      {sponsor.role} · {sponsor.state}
                      {sponsor.district ? `-${sponsor.district}` : ""}
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          <section>
            <div className="ui-label mb-4">Issue Tags</div>
            <div className="flex flex-wrap gap-2">
              {bill.issues.map((slug) => {
                const i = getIssue(slug);
                if (!i) return null;
                return (
                  <Link key={slug} href={`/issues/${slug}`} className="chip hover:bg-parchment-100">
                    {i.name}
                  </Link>
                );
              })}
            </div>
          </section>

          {bill.related.length > 0 && (
            <section>
              <div className="ui-label mb-4">Related Legislation</div>
              <ul className="space-y-3">
                {bill.related.map((rid) => {
                  const r = getBill(rid);
                  if (!r) return null;
                  return (
                    <li key={rid}>
                      <Link
                        href={`/bills/${r.id}`}
                        className="block border-b border-rule pb-3 hover:text-ink"
                      >
                        <div className="data-num text-ink-muted">{r.number}</div>
                        <div className="mt-1 font-serif text-[15px] tracking-editorial text-ink leading-tight">
                          {r.title}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="border-t border-rule pt-6">
            <div className="ui-label mb-2">Transparency</div>
            <p className="body-sm max-w-prose">
              You're seeing this because it intersects with one or more of your
              tracked interests and your civic geography. Every score, source,
              and inclusion criterion on this page is methodologically explained.
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="ui-label">{eyebrow}</div>
      <h2 className="font-serif text-[26px] mt-1.5 tracking-editorial text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ConsequenceColumn({
  eyebrow,
  tone,
  items,
}: {
  eyebrow: string;
  tone: "positive" | "caution";
  items: string[];
}) {
  const dot = tone === "positive" ? "#3F5D3C" : "#C8772E";
  return (
    <div className="bg-parchment p-6">
      <div className="ui-label">{eyebrow}</div>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 body-sm">
            <span
              className="mt-2 inline-block size-1.5 rounded-full shrink-0"
              style={{ background: dot }}
            />
            <span className="text-ink-mid">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Coalitions({
  eyebrow,
  items,
  accent,
}: {
  eyebrow: string;
  items: string[];
  accent: string;
}) {
  return (
    <div className="bg-parchment p-6">
      <div className="ui-label flex items-center gap-2">
        <span
          className="inline-block size-1.5 rounded-full"
          style={{ background: accent }}
        />
        {eyebrow}
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li key={it} className="text-[14px] text-ink-mid border-b border-rule pb-2 last:border-0">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PositionPill({ position }: { position: "For" | "Against" }) {
  const color = position === "For" ? "#3F5D3C" : "#7A1F2B";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.14em]"
      style={{ color }}
    >
      <span className="inline-block size-1.5 rounded-full" style={{ background: color }} />
      {position}
    </span>
  );
}

function SentimentBar({
  sentiment,
}: {
  sentiment: { for: number; against: number; unsure: number };
}) {
  return (
    <div>
      <div className="h-2 w-full overflow-hidden rounded-full flex">
        <div style={{ width: `${sentiment.for}%`, background: "#3F5D3C" }} />
        <div style={{ width: `${sentiment.unsure}%`, background: "#CFC9B8" }} />
        <div style={{ width: `${sentiment.against}%`, background: "#7A1F2B" }} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11.5px] text-ink-muted">
        <Legend dot="#3F5D3C" label={`For · ${sentiment.for}%`} />
        <Legend dot="#CFC9B8" label={`Unsure · ${sentiment.unsure}%`} />
        <Legend dot="#7A1F2B" label={`Against · ${sentiment.against}%`} />
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block size-1.5 rounded-full" style={{ background: dot }} />
      <span>{label}</span>
    </span>
  );
}
