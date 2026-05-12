import type { Metadata } from "next";
import Link from "next/link";
import { BRIEFING } from "@/lib/data/briefing";
import { getBill } from "@/lib/data/bills";
import { getPolitician } from "@/lib/data/politicians";
import { getIssue } from "@/lib/data/issues";
import { StatusBadge } from "@/components/status-badge";
import { PartyPill } from "@/components/party-pill";
import { Monogram } from "@/components/monogram";
import { WhyAmISeeingThis } from "@/components/why-am-i-seeing-this";

export const metadata: Metadata = {
  title: "Daily Briefing",
  description: "Your personalized civic briefing — calm, contextualized, useful.",
};

export default function BriefingPage() {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container-page py-14 md:py-20">
      <header className="border-b border-rule pb-8">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="eyebrow">Daily Briefing</div>
            <h1 className="editorial-h2 mt-2">Good morning. Here's what matters.</h1>
            <p className="mt-3 body-sm">{date} · Brooklyn, NY · National scope</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="ui-label">Pulse</span>
            <span className="inline-flex items-center gap-2 text-[12px] text-ink">
              <span className="size-1.5 rounded-full bg-civic-amber dot-pulse text-civic-amber" />
              Active session
            </span>
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-px bg-rule border border-rule rounded-[4px] overflow-hidden">
          {BRIEFING.map((item, i) => (
            <BriefingRow key={i} item={item} />
          ))}
        </div>
        <aside className="space-y-8 lg:sticky lg:top-20 self-start">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}

function BriefingRow({ item }: { item: (typeof BRIEFING)[number] }) {
  if (item.kind === "bill") {
    const bill = getBill(item.billId);
    if (!bill) return null;
    return (
      <Link href={`/bills/${bill.id}`} className="block bg-parchment hover:bg-white transition-colors">
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="ui-label">{item.tag}</span>
            <StatusBadge status={bill.status} />
          </div>
          <h2 className="font-serif text-[22px] md:text-[24px] mt-3 tracking-editorial text-ink leading-snug">
            {item.headline}
          </h2>
          <p className="mt-3 body max-w-prose">{bill.oneLiner}</p>
          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            <WhyAmISeeingThis reason={item.why} />
            <span className="text-[11.5px] uppercase tracking-[0.16em] text-ink-muted">
              {bill.number} · {bill.chamber}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (item.kind === "politician") {
    const pol = getPolitician(item.politicianId);
    if (!pol) return null;
    return (
      <Link href={`/politicians/${pol.id}`} className="block bg-parchment hover:bg-white transition-colors">
        <div className="p-6 md:p-7 flex gap-5">
          <Monogram name={pol.name} color={pol.monogramColor} size={56} />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <span className="ui-label">{item.tag}</span>
              <div className="flex items-center gap-2">
                <PartyPill party={pol.party} />
                <span className="text-[12px] text-ink-muted">
                  {pol.role} · {pol.state}
                  {pol.district ? `-${pol.district}` : ""}
                </span>
              </div>
            </div>
            <h2 className="font-serif text-[22px] md:text-[24px] mt-3 tracking-editorial text-ink leading-snug">
              {item.headline}
            </h2>
            <p className="mt-3 body-sm max-w-prose">{pol.bio}</p>
            <div className="mt-4">
              <WhyAmISeeingThis reason={item.why} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (item.kind === "issue") {
    const issue = getIssue(item.issueSlug);
    if (!issue) return null;
    return (
      <Link href={`/issues/${issue.slug}`} className="block bg-parchment hover:bg-white transition-colors">
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="ui-label">{item.tag}</span>
            <span className="ui-label">Pulse · {issue.pulse}</span>
          </div>
          <h2 className="font-serif text-[22px] md:text-[24px] mt-3 tracking-editorial text-ink leading-snug">
            {item.headline}
          </h2>
          <p className="mt-3 body-sm max-w-prose">{issue.description}</p>
          <div className="mt-4">
            <WhyAmISeeingThis reason={item.why} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-parchment">
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="ui-label">{item.tag}</span>
          <span className="ui-label">Global scope</span>
        </div>
        <h2 className="font-serif text-[22px] md:text-[24px] mt-3 tracking-editorial text-ink leading-snug">
          {item.headline}
        </h2>
        <p className="mt-3 body max-w-prose">{item.summary}</p>
        <div className="mt-4">
          <WhyAmISeeingThis reason={item.why} />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <>
      <section>
        <div className="ui-label mb-4">On Your Watchlist</div>
        <ul className="space-y-3">
          <WatchRow label="H.R. 2847" sub="Housing & Zoning" href="/bills/hr-2847" />
          <WatchRow label="S. 1124" sub="Childcare Access" href="/bills/s-1124" />
          <WatchRow label="H.R. 3902" sub="AI Accountability" href="/bills/hr-3902" />
        </ul>
      </section>
      <section className="border-t border-rule pt-6">
        <div className="ui-label mb-4">Following</div>
        <ul className="space-y-3">
          <FollowRow id="amara-okonkwo" />
          <FollowRow id="maya-chen" />
          <FollowRow id="priya-shah" />
        </ul>
      </section>
      <section className="border-t border-rule pt-6">
        <div className="ui-label mb-3">Civic GPS</div>
        <p className="body-sm max-w-prose">
          You're anchored at <span className="text-ink">ZIP 11211</span> · NY-07 ·
          Brooklyn Community Board 1 · State Senate District 18.
        </p>
        <Link href="/onboarding" className="mt-3 inline-block btn-ghost px-0">
          Update anchor →
        </Link>
      </section>
    </>
  );
}

function WatchRow({ label, sub, href }: { label: string; sub: string; href: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-baseline justify-between gap-3">
        <span className="data-num text-ink">{label}</span>
        <span className="text-[12.5px] text-ink-muted group-hover:text-ink">{sub}</span>
      </Link>
    </li>
  );
}

function FollowRow({ id }: { id: string }) {
  const p = getPolitician(id);
  if (!p) return null;
  return (
    <li>
      <Link href={`/politicians/${p.id}`} className="flex items-center gap-3 group">
        <Monogram name={p.name} color={p.monogramColor} size={28} />
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] text-ink truncate">{p.name}</div>
          <div className="text-[11.5px] text-ink-muted">
            {p.role} · {p.state}
            {p.district ? `-${p.district}` : ""}
          </div>
        </div>
        <PartyPill party={p.party} />
      </Link>
    </li>
  );
}
