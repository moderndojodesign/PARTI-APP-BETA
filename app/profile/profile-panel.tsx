"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useProfile, type CivicScope } from "@/lib/profile";
import { ISSUES } from "@/lib/data/issues";
import { cx } from "@/lib/utils";
import type { IssueTag } from "@/lib/types";

const SCOPES: CivicScope[] = [
  "Neighborhood",
  "Municipality",
  "County",
  "State",
  "National",
  "Global",
];

export function ProfilePanel() {
  const { profile, hydrated, update, remove } = useProfile();
  const [interests, setInterests] = useState<Set<IssueTag>>(new Set());
  const [zip, setZip] = useState("");
  const [scope, setScope] = useState<CivicScope>("Municipality");
  const [profession, setProfession] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (profile) {
      setInterests(new Set(profile.interests));
      setZip(profile.zip);
      setScope(profile.scope);
      setProfession(profile.profession ?? "");
    }
  }, [hydrated, profile]);

  if (!hydrated) {
    return <div className="card p-6 body-sm">Loading civic profile…</div>;
  }

  if (!profile) {
    return (
      <div className="card p-8 md:p-10">
        <div className="ui-label mb-3">No profile yet</div>
        <h2 className="font-serif text-[26px] tracking-editorial text-ink">
          Build your civic profile in under a minute.
        </h2>
        <p className="mt-4 body max-w-prose">
          Three short questions — what matters to you, your ZIP, and how wide
          your civic lens should be. PARTI personalizes the rest.
        </p>
        <Link href="/onboarding" className="mt-6 inline-block btn-primary">
          Start onboarding →
        </Link>
      </div>
    );
  }

  function toggle(slug: IssueTag) {
    const next = new Set(interests);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setInterests(next);
  }

  const zipValid = /^\d{5}$/.test(zip);
  const interestsValid = interests.size >= 3;
  const canSave = zipValid && interestsValid;

  function handleSave() {
    if (!canSave) return;
    update({
      interests: Array.from(interests),
      zip,
      scope,
      profession: profession.trim() || undefined,
    });
    setSavedAt(new Date().toLocaleTimeString());
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-10">
        <Section eyebrow="Interests" title="What matters most to you?">
          <div className="grid gap-2.5 grid-cols-2 md:grid-cols-3">
            {ISSUES.map((i) => {
              const active = interests.has(i.slug);
              return (
                <button
                  key={i.slug}
                  type="button"
                  onClick={() => toggle(i.slug)}
                  className={cx(
                    "text-left p-4 rounded-[4px] border transition-colors",
                    active
                      ? "bg-ink text-parchment border-ink"
                      : "bg-white border-rule hover:border-ink-mid"
                  )}
                >
                  <div
                    className={cx(
                      "font-serif text-[17px] tracking-editorial leading-tight",
                      active ? "text-parchment" : "text-ink"
                    )}
                  >
                    {i.name}
                  </div>
                  <div
                    className={cx(
                      "mt-1 text-[11.5px] leading-snug",
                      active ? "text-parchment-200" : "text-ink-muted"
                    )}
                  >
                    {i.short}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-4 body-sm">{interests.size} selected · at least 3 required</p>
        </Section>

        <Section eyebrow="Civic GPS" title="ZIP code anchor">
          <input
            value={zip}
            maxLength={5}
            inputMode="numeric"
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            placeholder="00000"
            className="w-full max-w-xs h-14 px-5 rounded-[4px] border border-rule bg-white text-ink font-serif text-[24px] tracking-[0.18em] focus:outline-none focus:border-ink"
          />
          <p className="mt-2 body-sm">{zipValid ? "✓ Valid five-digit ZIP" : "Enter five digits."}</p>
        </Section>

        <Section eyebrow="Lens" title="Civic scope">
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {SCOPES.map((s) => {
              const active = scope === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  className={cx(
                    "p-4 rounded-[4px] border text-left transition-colors",
                    active
                      ? "bg-ink text-parchment border-ink"
                      : "bg-white border-rule hover:border-ink-mid"
                  )}
                >
                  <div className="font-serif text-[18px] tracking-editorial">{s}</div>
                </button>
              );
            })}
          </div>
        </Section>

        <Section eyebrow="Optional" title="Profession">
          <input
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="e.g. nurse, teacher, founder"
            className="w-full max-w-md h-12 px-4 rounded-[4px] border border-rule bg-white text-[14px] text-ink focus:outline-none focus:border-ink"
          />
          <p className="mt-2 body-sm">
            Used by "Make This Relevant to Me" to translate legislation through your professional lens.
          </p>
        </Section>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-20 self-start">
        <div className="card p-5">
          <div className="ui-label">Profile snapshot</div>
          <dl className="mt-4 space-y-3 text-[13.5px]">
            <Row k="ZIP" v={profile.zip} />
            <Row k="Scope" v={profile.scope} />
            <Row k="Interests" v={`${profile.interests.length}`} />
            {profile.profession && <Row k="Profession" v={profile.profession} />}
            <Row k="Created" v={new Date(profile.createdAt).toLocaleDateString()} />
          </dl>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="btn-primary disabled:opacity-40"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Clear your civic profile? This cannot be undone.")) remove();
            }}
            className="btn-ghost text-[13px] text-ink-muted hover:text-civic-claret"
          >
            Clear profile
          </button>
          {savedAt && (
            <p className="text-[11.5px] text-ink-muted mt-1">
              Saved locally at {savedAt}.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="ui-label">{eyebrow}</div>
      <h2 className="font-serif text-[24px] mt-1.5 tracking-editorial text-ink">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule pb-2 last:border-0">
      <dt className="ui-label">{k}</dt>
      <dd className="text-ink">{v}</dd>
    </div>
  );
}
