"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";

export function NavProfileChip() {
  const { profile, hydrated } = useProfile();

  if (!hydrated) {
    return <span className="hidden md:inline-flex h-9 w-[120px] rounded-[4px] bg-parchment-100" />;
  }

  if (!profile) {
    return (
      <Link href="/onboarding" className="btn-secondary hidden md:inline-flex">
        Personalize
      </Link>
    );
  }

  return (
    <Link
      href="/profile"
      className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-[4px] border border-rule hover:border-ink-mid bg-white transition-colors"
    >
      <span className="inline-block size-1.5 rounded-full bg-civic-amber" />
      <span className="text-[12px] text-ink-mid">
        <span className="text-ink font-medium">ZIP {profile.zip}</span> · {profile.interests.length} interests
      </span>
    </Link>
  );
}
