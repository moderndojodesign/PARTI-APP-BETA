import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <div className="eyebrow mb-4">404 · Not in this jurisdiction</div>
      <h1 className="editorial-h2">This page isn't on the ballot.</h1>
      <p className="mt-4 body max-w-prose mx-auto">
        The page you were looking for doesn't exist — or hasn't been written yet.
        Head back to the briefing.
      </p>
      <div className="mt-8 inline-flex gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/briefing" className="btn-secondary">
          Daily Briefing
        </Link>
      </div>
    </div>
  );
}
