/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "641px",   // tablet
      md: "1025px",  // desktop
      lg: "1441px",  // wide desktop
    },
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-elevated": "var(--color-bg-elevated)",
        "bg-inverse": "var(--color-bg-inverse)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-faint": "var(--color-text-faint)",
        "text-on-navy": "var(--color-text-on-navy)",
        "text-on-amber": "var(--color-text-on-amber)",
        navy: "var(--color-navy)",
        "navy-dark": "var(--color-navy-dark)",
        "navy-tint": "var(--color-navy-tint)",
        amber: "var(--color-amber)",
        "amber-dark": "var(--color-amber-dark)",
        "amber-tint": "var(--color-amber-tint)",
        hairline: "var(--color-hairline)",
        "hairline-strong": "var(--color-hairline-strong)",
        error: "var(--color-error)",
        success: "var(--color-success)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
      maxWidth: {
        container: "var(--container-max)",
        narrow: "var(--container-narrow)",
        wide: "var(--container-wide)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "220ms",
        slow: "360ms",
      },
    },
  },
  plugins: [],
}

