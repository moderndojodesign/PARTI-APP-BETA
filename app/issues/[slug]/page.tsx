import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ISSUES, getIssue } from "@/lib/data/issues";
import { BILLS } from "@/lib/data/bills";
import { POLITICIANS } from "@/lib/data/politicians";
import { StatusBadge } from "@/components/status-badge";
import { PartyPill } from "@/components/party-pill";
import { Monogram } from "@/components/monogram";

export function generateStaticParams() {
  return ISSUES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getIssue(slug);
  if (!i) return {};
  return { title: i.name, description: i.short };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

  const relatedBills = BILLS.filter((b) => b.issues.includes(issue.slug));
  const relatedPoliticians = POLITICIANS.filter((p) =>
    p.topIssues.includes(issue.slug)
  );

  return (
    <article>
      <header className="border-b border-rule">
        <div className="container-page pt-14 pb-12">
          <Link href="/issues" className="ui-label hover:text-ink">
            ← All Issues
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="ui-label">Issue lens</span>
            <span className="text-ink-muted">·</span>
            <span className="ui-label">Pulse · {issue.pulse}</span>
          </div>
          <h1 className="editorial-h1 mt-6">{issue.name}</h1>
          <p className="mt-6 body text-[18px] max-w-prose">{issue.description}</p>
        </div>
      </header>

      <div className="container-page py-14 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section>
            <div className="ui-label">Active Legislation</div>
            <h2 className="font-serif text-[26px] mt-1.5 tracking-editorial text-ink">
              Bills tracked under this lens.
            </h2>
            {relatedBills.length === 0 ? (
              <p className="mt-5 body-sm">No active legislation tracked yet.</p>
            ) : (
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {relatedBills.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/bills/${b.id}`}
                      className="card p-5 block hover:bg-white hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="data-num text-ink-muted">{b.number}</span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="font-serif text-[19px] mt-3 tracking-editorial text-ink leading-snug">
                        {b.title}
                      </div>
                      <p className="mt-2 body-sm max-w-prose line-clamp-2">
                        {b.oneLiner}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="ui-label">Politicians on this issue</div>
            <h2 className="font-serif text-[26px] mt-1.5 tracking-editorial text-ink">
              Who is shaping the conversation.
            </h2>
            {relatedPoliticians.length === 0 ? (
              <p className="mt-5 body-sm">No politicians actively tracked yet.</p>
            ) : (
              <ul className="mt-6 grid gap-px bg-rule border border-rule rounded-[4px] overflow-hidden sm:grid-cols-2">
                {relatedPoliticians.map((p) => (
                  <li key={p.id} className="bg-parchment">
                    <Link
                      href={`/politicians/${p.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-white"
                    >
                      <Monogram name={p.name} color={p.monogramColor} size={40} />
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-[17px] tracking-editorial text-ink leading-tight">
                          {p.name}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <PartyPill party={p.party} />
                          <span className="text-[12px] text-ink-muted">
                            {p.role} · {p.state}
                            {p.district ? `-${p.district}` : ""}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-20 self-start">
          <section>
            <div className="ui-label mb-2">Why this matters</div>
            <p className="body-sm max-w-prose">
              {issue.name} is one of the twelve interest lenses PARTI uses to
              personalize legislation, briefings, and politician coverage. Add
              this lens to your profile to see related items prioritized in your
              daily briefing.
            </p>
            <Link href="/onboarding" className="mt-4 inline-block btn-primary">
              Add to my interests
            </Link>
          </section>
        </aside>
      </div>
    </article>
  );
}
