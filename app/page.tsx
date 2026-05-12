import Link from "next/link";
import { BILLS } from "@/lib/data/bills";
import { POLITICIANS } from "@/lib/data/politicians";
import { ISSUES } from "@/lib/data/issues";
import { StatusBadge } from "@/components/status-badge";
import { PartyPill } from "@/components/party-pill";
import { Monogram } from "@/components/monogram";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PositioningStrip />
      <FeatureGrid />
      <LegislativePreview />
      <AthleteSection />
      <IssuesGrid />
      <TrustSection />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="container-page pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="eyebrow mb-8">Civic Operating System · Beta</div>
        <h1 className="editorial-h1 max-w-[18ch]">
          Politics, finally explained — and personalized to your life.
        </h1>
        <p className="mt-8 max-w-prose body text-[18px] md:text-[19px]">
          PARTI is a hybrid social platform and civic operating system. It
          contextualizes legislation, governance, and political behavior for the
          informed citizen — without outrage, without spin, and without
          asking you to pick a side.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/onboarding" className="btn-primary h-12 px-6 text-[14px]">
            Take Part
          </Link>
          <Link href="/briefing" className="btn-secondary h-12 px-5 text-[14px]">
            Open Daily Briefing
          </Link>
          <span className="ml-1 text-[12px] uppercase tracking-[0.16em] text-ink-muted">
            No account required for the preview
          </span>
        </div>

        <div className="mt-16 grid gap-px bg-rule border border-rule sm:grid-cols-3 rounded-[4px] overflow-hidden">
          <Stat kpi="2,847" label="Bills tracked across federal & state" />
          <Stat kpi="540" label="Politicians scored as civic athletes" />
          <Stat kpi="12" label="Interest lenses for personalization" />
        </div>
      </div>
    </section>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="bg-parchment p-6">
      <div className="font-serif text-[34px] tracking-editorial text-ink leading-none">
        {kpi}
      </div>
      <div className="mt-3 text-[12.5px] text-ink-muted leading-snug max-w-[28ch]">
        {label}
      </div>
    </div>
  );
}

function PositioningStrip() {
  return (
    <section className="border-b border-rule bg-white/40">
      <div className="container-page py-10 grid gap-6 md:grid-cols-4 items-baseline">
        <div className="eyebrow md:col-span-1">Positioning</div>
        <div className="md:col-span-3 grid gap-4 md:grid-cols-3">
          <Quote text="The Operating System for Civic Engagement." />
          <Quote text="Politics, Finally Explained." />
          <Quote text="Track Power. Take Part." />
        </div>
      </div>
    </section>
  );
}

function Quote({ text }: { text: string }) {
  return (
    <div className="font-serif text-[20px] leading-snug text-ink tracking-editorial">
      “{text}”
    </div>
  );
}

function FeatureGrid() {
  const features = [
    {
      eyebrow: "Legislative Intelligence",
      title: "Every bill, translated.",
      body: "Plain English summaries. Problem framing. Intended and unintended consequences. Sponsor history, donor relationships, supporting and opposing coalitions, public sentiment, and constitutional concerns — for every bill PARTI tracks.",
    },
    {
      eyebrow: "Context as a Service",
      title: "Make this relevant to me.",
      body: "PARTI's contextualization engine translates legislation through your ZIP, district, profession, and stated interests — so the question stops being 'why should I care?' and becomes 'what do I want to do about it?'",
    },
    {
      eyebrow: "Political Athletes",
      title: "Power, scored transparently.",
      body: "Politicians are graded on promise fulfillment, bipartisan cooperation, constituent approval, ethical record, bill success, attendance, and responsiveness. Every score is explained and sourced — no black boxes.",
    },
    {
      eyebrow: "Civic GPS",
      title: "Local, but never parochial.",
      body: "Toggle scope across neighborhood, municipality, county, state, national, and global. The world doesn't stop at your border — and PARTI maps the connections between them.",
    },
  ];

  return (
    <section id="operating-system" className="border-b border-rule">
      <div className="container-page py-20">
        <div className="eyebrow mb-4">Operating System</div>
        <h2 className="editorial-h2 max-w-[20ch]">
          A civic utility, designed like premium software.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="border-t border-rule pt-6">
              <div className="ui-label">{f.eyebrow}</div>
              <h3 className="editorial-h3 mt-3">{f.title}</h3>
              <p className="mt-3 body max-w-prose">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegislativePreview() {
  const featured = BILLS.slice(0, 3);
  return (
    <section className="border-b border-rule">
      <div className="container-page py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">Legislative Intelligence</div>
            <h2 className="editorial-h2 max-w-[22ch]">
              Bills, translated into the language of consequence.
            </h2>
          </div>
          <Link href="/bills" className="btn-ghost">
            See all legislation →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((b) => (
            <Link
              key={b.id}
              href={`/bills/${b.id}`}
              className="card p-6 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center justify-between">
                <span className="data-num text-ink-muted">{b.number}</span>
                <StatusBadge status={b.status} />
              </div>
              <h3 className="font-serif text-[22px] mt-4 leading-snug tracking-editorial text-ink">
                {b.title}
              </h3>
              <p className="mt-3 body-sm max-w-prose">{b.oneLiner}</p>
              <div className="mt-6 flex items-center justify-between text-[11.5px] uppercase tracking-[0.14em] text-ink-muted">
                <span>{b.chamber}</span>
                <span>{b.cosponsors} cosponsors</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AthleteSection() {
  const featured = POLITICIANS.slice(0, 4);
  return (
    <section className="border-b border-rule bg-white/40">
      <div className="container-page py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">Political Athletes</div>
            <h2 className="editorial-h2 max-w-[22ch]">
              The scoreboard of power.
            </h2>
            <p className="mt-4 body max-w-prose">
              We are political athletes. PARTI follows politicians the way you
              follow careers — by performance, consistency, integrity, and
              outcome. No tribalism. No hagiography. Just the record.
            </p>
          </div>
          <Link href="/politicians" className="btn-ghost">
            Open the scoreboard →
          </Link>
        </div>
        <div className="mt-12 grid gap-px bg-rule border border-rule sm:grid-cols-2 lg:grid-cols-4 rounded-[4px] overflow-hidden">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/politicians/${p.id}`}
              className="bg-parchment p-6 hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-4">
                <Monogram name={p.name} color={p.monogramColor} size={44} />
                <div>
                  <div className="font-serif text-[18px] text-ink tracking-editorial leading-tight">
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
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <MiniStat label="Promises" value={p.scores.promiseFulfillment} />
                <MiniStat label="Bipartisan" value={p.scores.bipartisanship} />
                <MiniStat label="Approval" value={p.scores.constituentApproval} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="ui-label">{label}</div>
      <div className="mt-1 font-serif text-[22px] tracking-editorial text-ink leading-none">
        {value}
      </div>
    </div>
  );
}

function IssuesGrid() {
  const featured = ISSUES.slice(0, 8);
  return (
    <section className="border-b border-rule">
      <div className="container-page py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">Issues</div>
            <h2 className="editorial-h2 max-w-[22ch]">
              What matters most to you?
            </h2>
            <p className="mt-4 body max-w-prose">
              PARTI doesn't ask which party you belong to. It asks what you
              actually care about — and builds a personalized civic environment
              around those answers.
            </p>
          </div>
          <Link href="/issues" className="btn-ghost">
            Explore all issues →
          </Link>
        </div>
        <div className="mt-12 grid gap-px bg-rule border border-rule sm:grid-cols-2 lg:grid-cols-4 rounded-[4px] overflow-hidden">
          {featured.map((i) => (
            <Link
              key={i.slug}
              href={`/issues/${i.slug}`}
              className="bg-parchment p-6 hover:bg-white transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="ui-label">{i.pulse}</span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
                  #{i.slug}
                </span>
              </div>
              <h3 className="font-serif text-[22px] mt-4 tracking-editorial text-ink leading-tight">
                {i.name}
              </h3>
              <p className="mt-2 body-sm">{i.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section id="trust" className="border-b border-rule bg-white/40">
      <div className="container-page py-20 grid gap-12 md:grid-cols-2 items-start">
        <div>
          <div className="eyebrow mb-4">Trust Infrastructure</div>
          <h2 className="editorial-h2">Transparency is the product.</h2>
          <p className="mt-5 body max-w-prose">
            PARTI is engineered for emotional neutrality and methodological
            openness. Every score is explained. Every source is visible. Every
            piece of content on your feed answers a single question — “Why am I
            seeing this?” — before you ever have to ask.
          </p>
        </div>
        <ul className="space-y-5">
          {[
            ["Methodological transparency", "Scoring formulas, weights, and sources are public."],
            ["Explainable feed", "Every item discloses geographic, topical, and behavioral relevance."],
            ["Bipartisan accessibility", "Designed to serve informed citizens across the political spectrum."],
            ["No outrage optimization", "Algorithms reward civic literacy — not engagement-as-a-vice."],
          ].map(([t, b]) => (
            <li key={t} className="flex gap-4 border-b border-rule pb-5">
              <span className="mt-2 size-1.5 rounded-full bg-civic-amber shrink-0" />
              <div>
                <div className="font-serif text-[18px] text-ink tracking-editorial">{t}</div>
                <div className="mt-1 body-sm max-w-prose">{b}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section>
      <div className="container-page py-24 text-center">
        <div className="eyebrow mb-6">Make Civic Engagement Forever</div>
        <h2 className="editorial-h1 max-w-[22ch] mx-auto">
          Democracy was never meant to be consumed passively.
        </h2>
        <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3">
          <Link href="/onboarding" className="btn-primary h-12 px-6 text-[14px]">
            Take Part
          </Link>
          <Link href="/briefing" className="btn-secondary h-12 px-5 text-[14px]">
            See today's briefing
          </Link>
        </div>
      </div>
    </section>
  );
}
