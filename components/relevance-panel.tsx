"use client";

import { useEffect, useState } from "react";
import { useProfile, type CivicScope } from "@/lib/profile";

type RelevanceResponse = {
  headline: string;
  bullets: string[];
  scope: string;
};

const FORM_SCOPES: CivicScope[] = [
  "Neighborhood",
  "Municipality",
  "County",
  "State",
  "National",
];

export function RelevancePanel({ billId }: { billId: string }) {
  const { profile, hydrated } = useProfile();
  const [zip, setZip] = useState("");
  const [profession, setProfession] = useState("");
  const [scope, setScope] = useState<CivicScope>("Municipality");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RelevanceResponse | null>(null);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    if (!hydrated || prefilled) return;
    if (profile) {
      setZip(profile.zip);
      if (profile.profession) setProfession(profile.profession);
      if (profile.scope !== "Global") setScope(profile.scope);
    }
    setPrefilled(true);
  }, [hydrated, profile, prefilled]);

  async function makeRelevant(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/relevant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billId, zip, profession, scope }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        headline: "Couldn't generate personalization just now.",
        bullets: ["Try again in a moment, or read the Plain English Summary."],
        scope,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="ui-label">Context as a Service</div>
          <div className="font-serif text-[20px] mt-1 text-ink">
            Make This Relevant to Me
          </div>
          <p className="mt-1.5 body-sm max-w-prose">
            PARTI translates this legislation through the lens of your geography
            and profession.
          </p>
        </div>
        {hydrated && profile && (
          <span className="ui-label hidden md:inline">
            Prefilled from your profile
          </span>
        )}
      </div>

      <form
        onSubmit={makeRelevant}
        className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <LabeledInput
          label="ZIP code"
          value={zip}
          onChange={setZip}
          placeholder="e.g. 11211"
          maxLength={5}
        />
        <LabeledInput
          label="Profession"
          value={profession}
          onChange={setProfession}
          placeholder="e.g. nurse, founder"
        />
        <LabeledSelect
          label="Civic scope"
          value={scope}
          onChange={(v) => setScope(v as CivicScope)}
          options={FORM_SCOPES}
        />
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full md:w-auto" disabled={loading}>
            {loading ? "Contextualizing…" : "Contextualize"}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 border-t border-rule pt-5">
          <div className="ui-label">For {result.scope.toLowerCase()} scope</div>
          <h4 className="font-serif text-[22px] mt-1 text-ink leading-snug">
            {result.headline}
          </h4>
          <ul className="mt-4 space-y-3 max-w-prose">
            {result.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 body">
                <span className="mt-2 inline-block size-1 rounded-full bg-civic-amber shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <div className="ui-label mb-1.5">{label}</div>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 rounded-[4px] border border-rule bg-white text-[14px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink"
      />
    </label>
  );
}

function LabeledSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <div className="ui-label mb-1.5">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 rounded-[4px] border border-rule bg-white text-[14px] text-ink focus:outline-none focus:border-ink"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
