export function WhyAmISeeingThis({ reason }: { reason: string }) {
  return (
    <details className="group">
      <summary className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted hover:text-ink cursor-pointer select-none list-none">
        <span className="inline-block size-1 rounded-full bg-ink-muted group-hover:bg-ink" />
        Why am I seeing this?
      </summary>
      <p className="mt-2 max-w-prose text-[12.5px] leading-[1.6] text-ink-mid">
        {reason}
      </p>
    </details>
  );
}
