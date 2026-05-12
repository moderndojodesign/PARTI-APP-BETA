import type { Party } from "@/lib/types";
import { partyColor } from "@/lib/utils";

export function PartyPill({ party }: { party: Party }) {
  const label = party === "D" ? "D" : party === "R" ? "R" : "I";
  return (
    <span
      className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-[3px] text-[10.5px] font-semibold tracking-wider text-white"
      style={{ background: partyColor(party) }}
    >
      {label}
    </span>
  );
}
