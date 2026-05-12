import type { Metadata } from "next";
import Link from "next/link";
import { ISSUES } from "@/lib/data/issues";

export const metadata: Metadata = {
  title: "Issues",
  description: "What matters most to you — the issue lenses of PARTI.",
};

const PULSE_COLOR: Record<string, string> = {
  Cooling: "#3F5D3C",
  Steady: "#1E2A44",
  Heating: "#C8772E",
  Critical: "#7A1F2B",
};

export default function IssuesPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <header className="border-b border-rule pb-8">
        <div className="eyebrow mb-3">Issues</div>
        <h1 className="editorial-h2 max-w-[22ch]">
          What matters most to you?
        </h1>
        <p className="mt-4 body max-w-prose">
          PARTI does not ask which party you belong to. It asks what you
          actually care about — then organizes legislation, politicians, and
          civic context around those answers.
        </p>
      </header>

      <div className="mt-10 grid gap-px bg-rule border border-rule rounded-[4px] overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {ISSUES.map((i) => (
          <Link
            key={i.slug}
            href={`/issues/${i.slug}`}
            className="bg-parchment p-6 hover:bg-white transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="ui-label flex items-center gap-2">
                <span
                  className="inline-block size-1.5 rounded-full"
                  style={{ background: PULSE_COLOR[i.pulse] }}
                />
                {i.pulse}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
                #{i.slug}
              </span>
            </div>
            <h2 className="font-serif text-[24px] mt-4 tracking-editorial text-ink leading-tight">
              {i.name}
            </h2>
            <p className="mt-2 body-sm max-w-prose">{i.short}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
