"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { getPolitician } from "@/lib/data/politicians";
import { Monogram } from "@/components/monogram";
import { PartyPill } from "@/components/party-pill";

export function BriefingSidebar() {
  const { profile, hydrated } = useProfile();

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
        {hydrated && profile ? (
          <p className="body-sm max-w-prose">
            You're anchored at <span className="text-ink">ZIP {profile.zip}</span> ·{" "}
            <span className="text-ink">{profile.scope}</span> scope ·{" "}
            <span className="text-ink">{profile.interests.length}</span> tracked interests.
          </p>
        ) : (
          <p className="body-sm max-w-prose">
            You have not set a civic anchor yet. Add a ZIP code to map you to your
            representatives, district, and ballot.
          </p>
        )}
        <Link href="/profile" className="mt-3 inline-block btn-ghost px-0">
          {profile ? "Edit civic profile →" : "Set up profile →"}
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
