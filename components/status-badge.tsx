import type { Bill } from "@/lib/types";

const COLOR: Record<Bill["status"], string> = {
  Introduced: "#6B6960",
  "In Committee": "#1E2A44",
  "Floor Vote Pending": "#C8772E",
  "Passed Chamber": "#3F5D3C",
  Conference: "#1E2A44",
  "Awaiting Signature": "#C8772E",
  Enacted: "#3F5D3C",
  Stalled: "#7A1F2B",
};

export function StatusBadge({ status }: { status: Bill["status"] }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-mid">
      <span
        className="inline-block size-[7px] rounded-full"
        style={{ background: COLOR[status] }}
      />
      {status}
    </span>
  );
}
