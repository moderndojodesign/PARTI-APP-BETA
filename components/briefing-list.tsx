"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BRIEFING } from "@/lib/data/briefing";
import { getBill } from "@/lib/data/bills";
import { getPolitician } from "@/lib/data/politicians";
import { getIssue } from "@/lib/data/issues";
import { StatusBadge } from "@/components/status-badge";
import { PartyPill } from "@/components/party-pill";
import { Monogram } from "@/components/monogram";
import { WhyAmISeeingThis } from "@/components/why-am-i-seeing-this";
import { useProfile } from "@/lib/profile";
import type { IssueTag } from "@/lib/types";

export function BriefingList() {
  const { profile } = useProfile();

  const items = useMemo(() => {
    if (!profile || profile.interests.length === 0) return BRIEFING;
    const interests = new Set<IssueTag>(profile.interests);
    return [...BRIEFING].sort((a, b) => score(b, interests) - score(a, interests));
  }, [profile]);

  return (
    <div className="space-y-px bg-rule border border-rule rounded-[4px] overflow-hidden">
      {items.map((item, i) => (
        <BriefingRow key={i} item={item} />
      ))}
    </div>
  );
}

function score(item: (typeof BRIEFING)[number], interests: Set<IssueTag>): number {
  if (item.kind === "bill") {
    const b = getBill(item.billId);
    if (!b) return 0;
    return b.issues.filter((x) => interests.has(x)).length * 10;
  }
  if (item.kind === "politician") {
    const p = getPolitician(item.politicianId);
    if (!p) return 0;
    return p.topIssues.filter((x) => interests.has(x)).length * 8;
  }
  if (item.kind === "issue") {
    return interests.has(item.issueSlug) ? 12 : 0;
  }
  return 1;
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

