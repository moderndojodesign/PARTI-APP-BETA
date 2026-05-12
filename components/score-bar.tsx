export function ScoreBar({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  const color =
    value >= 75 ? "#3F5D3C" : value >= 55 ? "#1E2A44" : value >= 40 ? "#C8772E" : "#7A1F2B";
  return (
    <div className="py-3 border-b border-rule last:border-0">
      <div className="flex items-baseline justify-between gap-4">
        <div className="ui-label">{label}</div>
        <div className="data-num text-[13px]">{value}</div>
      </div>
      <div className="mt-2 h-[3px] w-full bg-parchment-100 overflow-hidden">
        <div
          className="h-full"
          style={{ width: `${value}%`, background: color, transition: "width .6s ease" }}
        />
      </div>
      {hint && <div className="mt-1.5 text-[11.5px] text-ink-muted">{hint}</div>}
    </div>
  );
}
