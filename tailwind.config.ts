import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#FAFAF7",
          50: "#FCFCFA",
          100: "#F5F3EC",
          200: "#EBE7DC",
          300: "#D9D3C2",
        },
        ink: {
          DEFAULT: "#0B0B0D",
          soft: "#1A1A1F",
          mid: "#3B3B42",
          muted: "#6B6960",
          subtle: "#9A968B",
        },
        rule: {
          DEFAULT: "#E5E1D6",
          strong: "#CFC9B8",
        },
        civic: {
          midnight: "#1E2A44",
          deep: "#152037",
          ember: "#C8772E",
          amber: "#D4A24B",
          moss: "#3F5D3C",
          claret: "#7A1F2B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        editorial: "-0.02em",
      },
      maxWidth: {
        prose: "68ch",
        page: "1200px",
      },
      boxShadow: {
        editorial: "0 1px 0 0 rgba(11,11,13,0.04), 0 0 0 1px rgba(11,11,13,0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
