import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NavProfileChip } from "./nav-profile-chip";

const NAV = [
  { href: "/briefing", label: "Briefing" },
  { href: "/bills", label: "Bills" },
  { href: "/politicians", label: "Politicians" },
  { href: "/issues", label: "Issues" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-parchment/85 backdrop-blur-xl">
      <div className="container-page flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Wordmark className="h-[18px] w-auto" />
          <span className="hidden md:inline text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
            Civic OS · Beta
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-[13.5px] text-ink-mid hover:text-ink rounded-[4px] hover:bg-parchment-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <NavProfileChip />
          <Link href="/briefing" className="btn-primary">
            Open PARTI
          </Link>
        </div>
      </div>
    </header>
  );
}
