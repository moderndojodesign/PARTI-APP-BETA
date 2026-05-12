import { initials } from "@/lib/utils";

export function Monogram({
  name,
  color,
  size = 48,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="grid place-items-center rounded-full text-white font-serif font-medium select-none"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.38,
        letterSpacing: "0.02em",
      }}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
