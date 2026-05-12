"use client";

import Link from "next/link";
import { useState } from "react";
import { ISSUES } from "@/lib/data/issues";
import { cx } from "@/lib/utils";
import { saveProfile, type CivicScope } from "@/lib/profile";
import type { IssueTag } from "@/lib/types";

type Scope = CivicScope;
const SCOPES: Scope[] = ["Neighborhood", "Municipality", "County", "State", "National", "Global"];

export function OnboardingFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [zip, setZip] = useState("");
  const [scope, setScope] = useState<Scope>("Municipality");

  const canAdvance =
    (step === 1 && interests.size >= 3) ||
    (step === 2 && /^\d{5}$/.test(zip)) ||
    step === 3 ||
    step === 4;

  function toggle(slug: string) {
    const next = new Set(interests);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setInterests(next);
  }

  return (
    <div>
      <Stepper step={step} />

      {step === 1 && (
        <Step
          eyebrow="Step 01 · What matters to you?"
          title="Pick at least three interests."
          subtitle="These shape your daily briefing, bill personalization, and the politicians PARTI surfaces. You can change them anytime."
        >
          <div className="mt-8 grid gap-2.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                      "font-serif text-[18px] tracking-editorial leading-tight",
                      active ? "text-parchment" : "text-ink"
                    )}
                  >
                    {i.name}
                  </div>
                  <div
                    className={cx(
                      "mt-1.5 text-[12px] leading-snug",
                      active ? "text-parchment-200" : "text-ink-muted"
                    )}
                  >
                    {i.short}
                  </div>
                </button>
              );
            })}
          </div>
          <SelectionMeta count={interests.size} min={3} label="interests selected" />
        </Step>
      )}

      {step === 2 && (
        <Step
          eyebrow="Step 02 · Civic GPS"
          title="What ZIP code anchors your civic life?"
          subtitle="PARTI uses this to map you to your representatives, district, polling place, and local jurisdictions. Five digits, U.S. only in the preview."
        >
          <div className="mt-8 max-w-md">
            <input
              value={zip}
              maxLength={5}
              inputMode="numeric"
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
              placeholder="00000"
              className="w-full h-16 px-5 rounded-[4px] border border-rule bg-white text-ink font-serif text-[32px] tracking-[0.18em] focus:outline-none focus:border-ink"
            />
            <p className="mt-3 body-sm">
              {/^\d{5}$/.test(zip)
                ? "✓ Looks good. PARTI will map this to your representatives and ballot."
                : "Enter five digits to continue."}
            </p>
          </div>
        </Step>
      )}

      {step === 3 && (
        <Step
          eyebrow="Step 03 · Scope"
          title="How wide do you want your civic lens?"
          subtitle="PARTI can zoom from your neighborhood to the geopolitical. Start where you want — you can adjust at any time."
        >
          <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3 max-w-3xl">
            {SCOPES.map((s) => {
              const active = scope === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  className={cx(
                    "p-5 rounded-[4px] border text-left transition-colors",
                    active
                      ? "bg-ink text-parchment border-ink"
                      : "bg-white border-rule hover:border-ink-mid"
                  )}
                >
                  <div className="font-serif text-[20px] tracking-editorial">{s}</div>
                  <div
                    className={cx(
                      "mt-1.5 text-[12px]",
                      active ? "text-parchment-200" : "text-ink-muted"
                    )}
                  >
                    {DESCRIBE_SCOPE[s]}
                  </div>
                </button>
              );
            })}
          </div>
        </Step>
      )}

      {step === 4 && (
        <Step
          eyebrow="Step 04 · You're in"
          title="Welcome to PARTI."
          subtitle="Here's the snapshot we'll use to personalize your civic experience. Open your daily briefing whenever you're ready."
        >
          <div className="mt-8 grid gap-px bg-rule border border-rule sm:grid-cols-3 rounded-[4px] overflow-hidden max-w-3xl">
            <SummaryTile
              label="ZIP"
              value={zip}
              hint="Civic GPS anchor"
            />
            <SummaryTile
              label="Scope"
              value={scope}
              hint="Default lens"
            />
            <SummaryTile
              label="Interests"
              value={`${interests.size}`}
              hint="Tracked"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2 max-w-3xl">
            {Array.from(interests).map((s) => {
              const issue = ISSUES.find((i) => i.slug === s);
              return (
                <span key={s} className="chip">
                  {issue?.name ?? s}
                </span>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/briefing" className="btn-primary h-11 px-5">
              Open Daily Briefing →
            </Link>
            <Link href="/bills" className="btn-secondary h-11 px-5">
              Explore legislation
            </Link>
          </div>
        </Step>
      )}

      {step < 4 && (
        <div className="mt-12 flex items-center justify-between border-t border-rule pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
            className="btn-ghost"
            disabled={step === 1}
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (!canAdvance) return;
              const next = (step + 1) as 2 | 3 | 4;
              if (next === 4) {
                saveProfile({
                  interests: Array.from(interests) as IssueTag[],
                  zip,
                  scope,
                });
              }
              setStep(next);
            }}
            className="btn-primary disabled:opacity-40"
            disabled={!canAdvance}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

const DESCRIBE_SCOPE: Record<Scope, string> = {
  Neighborhood: "Block-level civic context, including HOAs and precincts.",
  Municipality: "Town and city councils, mayors, local agencies.",
  County: "County boards, sheriffs, local courts, regional planning.",
  State: "Legislature, governor, statewide agencies, courts.",
  National: "Congress, presidency, federal agencies, Supreme Court.",
  Global: "Treaties, alliances, trade, geopolitical context.",
};

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2">
      {[1, 2, 3, 4].map((n) => (
        <li
          key={n}
          className={cx(
            "h-[3px] flex-1 max-w-[80px] rounded-full",
            step >= n ? "bg-ink" : "bg-rule"
          )}
        />
      ))}
      <li className="text-[11px] uppercase tracking-[0.16em] text-ink-muted ml-3">
        Step {step} of 4
      </li>
    </ol>
  );
}

function Step({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <div className="ui-label">{eyebrow}</div>
      <h2 className="editorial-h3 mt-2 max-w-[28ch]">{title}</h2>
      <p className="mt-3 body-sm max-w-prose">{subtitle}</p>
      {children}
    </div>
  );
}

function SelectionMeta({
  count,
  min,
  label,
}: {
  count: number;
  min: number;
  label: string;
}) {
  return (
    <div className="mt-6 inline-flex items-center gap-3 text-[12px] text-ink-muted">
      <span className="data-num text-ink">
        {count}/{min}+
      </span>
      <span>{label}</span>
    </div>
  );
}

function SummaryTile({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="bg-parchment p-5">
      <div className="ui-label">{label}</div>
      <div className="font-serif text-[24px] mt-1 tracking-editorial text-ink">
        {value}
      </div>
      <div className="mt-1 text-[11.5px] text-ink-muted">{hint}</div>
    </div>
  );
}
