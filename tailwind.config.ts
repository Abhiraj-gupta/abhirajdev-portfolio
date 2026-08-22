import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* --- redesign palette -------------------------------------------
           Space-separated RGB channels so Tailwind's opacity modifiers
           (text-mute/60) still work, and so light/dark swap by overriding
           the custom properties rather than duplicating every utility. */
        bone: "rgb(var(--bone) / <alpha-value>)",
        "bone-2": "rgb(var(--bone-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        body: "rgb(var(--body) / <alpha-value>)",
        mute: "rgb(var(--mute) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        live: "rgb(var(--live) / <alpha-value>)",

        /* --- shadcn tokens (retained) ------------------------------------
           src/components/ui/* and globals.css @apply rules reference these.
           Removing them would break the build, so they are kept and
           retuned to the light palette instead. */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        /* Inter Tight at 900 is the closest free match to the reference's
           Helvetica-Now-Display-Black headlines. */
        display: ["var(--font-display)", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        /* Display scale. Fluid so the huge type never overflows on the way
           down to mobile — the reference relies on very large sizes that
           cannot simply be scaled by breakpoint. */
        "display-xl": [
          "clamp(3.25rem, 11.5vw, 11rem)",
          { lineHeight: "0.85", letterSpacing: "-0.045em", fontWeight: "900" },
        ],
        "display-lg": [
          "clamp(2.5rem, 7.5vw, 6.75rem)",
          { lineHeight: "0.88", letterSpacing: "-0.04em", fontWeight: "900" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.4vw, 3rem)",
          { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "900" },
        ],
        /* Utility/label scale — small, wide-tracked, uppercase mono. */
        label: [
          "0.6875rem",
          { lineHeight: "1.45", letterSpacing: "0.2em", fontWeight: "400" },
        ],
        "label-sm": [
          "0.625rem",
          { lineHeight: "1.4", letterSpacing: "0.22em", fontWeight: "400" },
        ],
      },
      maxWidth: {
        shell: "1800px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
