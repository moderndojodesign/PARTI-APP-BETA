"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { ISSUES } from "@/lib/data/issues";

export function BriefingHeader() {
  const { profile, hydrated } = useProfile();

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const greeting = profile
    ? `Good morning. Here's what matters in ${profile.zip}.`
    : "Good morning. Here's what matters.";

  const scopeLine = profile
    ? `${date} · ZIP ${profile.zip} · ${profile.scope} scope`
    : `${date} · No anchor set · National scope`;

  return (
    <header className="border-b border-rule pb-8">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div>
          <div className="eyebrow">Daily Briefing</div>
          <h1 className="editorial-h2 mt-2">{greeting}</h1>
          <p className="mt-3 body-sm">{scopeLine}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="ui-label">Pulse</span>
          <span className="inline-flex items-center gap-2 text-[12px] text-ink">
            <span className="size-1.5 rounded-full bg-civic-amber dot-pulse text-civic-amber" />
            Active session
          </span>
        </div>
      </div>

      {hydrated && profile && profile.interests.length > 0 && (
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <span className="ui-label">Tracked interests</span>
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((slug) => {
              const i = ISSUES.find((x) => x.slug === slug);
              if (!i) return null;
              return (
                <Link key={slug} href={`/issues/${slug}`} className="chip">
                  {i.name}
                </Link>
              );
            })}
          </div>
          <Link href="/profile" className="ml-auto btn-ghost px-0 text-[12.5px]">
            Edit civic profile →
          </Link>
        </div>
      )}

      {hydrated && !profile && (
        <div className="mt-6 card p-4 flex items-center justify-between gap-4 flex-wrap">
          <p className="body-sm max-w-prose">
            You're viewing PARTI's default briefing. Set your interests and ZIP to personalize the feed.
          </p>
          <Link href="/onboarding" className="btn-primary">
            Take Part
          </Link>
        </div>
      )}
    </header>
  );
}
