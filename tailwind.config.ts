import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bone: "#FAF8F5",
        creme: "#F1ECE3",
        ink: "#171717",
        // Primary accent: warm amber, matching the Süppchen logo's soup-bowl tone.
        wald: {
          50: "#FBF3E5",
          100: "#F4E1B8",
          200: "#E7C683",
          300: "#D9A957",
          400: "#C58F35",
          500: "#A87425",
          600: "#8A5C1D",
          700: "#6C4717",
          800: "#4F3311",
          900: "#33200A"
        },
        // Brass / cream-gold — already lifted from the logo wordmark.
        messing: {
          50: "#FBF6ED",
          100: "#F3E8D0",
          200: "#E5CFA0",
          300: "#D5B46E",
          400: "#C49E56",
          500: "#B08A4A",
          600: "#93723C",
          700: "#735930",
          800: "#564324",
          900: "#3C2F19"
        },
        // Deep cocoa accent (badge background colour from the logo).
        weinrot: {
          50: "#F4ECE3",
          100: "#DEC9B0",
          200: "#BFA07F",
          300: "#9D7956",
          400: "#7A5837",
          500: "#583E25",
          600: "#46311D",
          700: "#352416",
          800: "#23180E",
          900: "#140D07"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      }
    }
  },
  plugins: []
};

export default config;
