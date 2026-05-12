export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 22"
      role="img"
      aria-label="PARTI"
      className={className}
      fill="currentColor"
    >
      <text
        x="0"
        y="17.5"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontWeight={700}
        fontSize="20"
        letterSpacing="2.2"
      >
        PARTI
      </text>
    </svg>
  );
}
