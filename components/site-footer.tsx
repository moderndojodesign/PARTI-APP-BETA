import Link from "next/link";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-white/40">
      <div className="container-page py-14 grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Wordmark className="h-[20px] w-auto" />
          <p className="mt-4 max-w-sm body-sm">
            Take part. PARTI is an operating system for civic engagement —
            contextualizing legislation, governance, and political behavior for the
            informed citizen.
          </p>
        </div>
        <FooterCol
          title="Platform"
          links={[
            ["Daily Briefing", "/briefing"],
            ["Legislation", "/bills"],
            ["Politicians", "/politicians"],
            ["Issues", "/issues"],
            ["Civic Profile", "/profile"],
          ]}
        />
        <FooterCol
          title="Mission"
          links={[
            ["Civic Operating System", "/#operating-system"],
            ["Methodology", "/#methodology"],
            ["Transparency", "/#trust"],
            ["Take Part", "/onboarding"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["Editorial Standards", "/#editorial"],
            ["Press", "/#press"],
            ["Careers", "/#careers"],
            ["Contact", "/#contact"],
          ]}
        />
      </div>
      <div className="container-page py-6 border-t border-rule flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          © {new Date().getFullYear()} PARTI · Make civic engagement forever.
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
          Take Part.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="ui-label mb-3">{title}</div>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-[14px] text-ink-mid hover:text-ink transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
