"use client";

import { useState } from "react";

type Props = {
  billId: string;
  initial?: string;
};

export function TldrPanel({ billId, initial }: Props) {
  const [open, setOpen] = useState(!!initial);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string>(initial ?? "");

  async function fetchTldr() {
    setOpen(true);
    if (text) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tldr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billId }),
      });
      const data = await res.json();
      setText(data.tldr);
    } catch {
      setText(
        "Unable to generate a TL;DR right now. The bill text is available in the Plain English Summary below."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="ui-label">Quick Read</div>
          <div className="font-serif text-[20px] mt-1 text-ink">TL;DR</div>
        </div>
        {!open ? (
          <button onClick={fetchTldr} className="btn-primary">
            Show TL;DR
          </button>
        ) : (
          <span className="text-[11.5px] uppercase tracking-[0.16em] text-ink-muted">
            Generated · Plain English
          </span>
        )}
      </div>

      {open && (
        <div className="mt-4 max-w-prose">
          {loading ? (
            <SkeletonLines lines={3} />
          ) : (
            <p className="body">{text}</p>
          )}
        </div>
      )}
    </div>
  );
}

function SkeletonLines({ lines }: { lines: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-[10px] rounded-[2px] bg-parchment-200 animate-pulse"
          style={{ width: `${90 - i * 10}%` }}
        />
      ))}
    </div>
  );
}
