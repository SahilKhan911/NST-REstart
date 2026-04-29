import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nst: {
          DEFAULT: "#0085FF",
          ink: "#000000",
          dark: "#0A0A0A",
          muted: "#1A1A1A",
          soft: "#F5F8FF",
          line: "#E6EDF7",
          blueDeep: "#0066CC",
          blueLight: "#3FA3FF",
        },
        wa: {
          bg: "#0B141A",
          panel: "#111B21",
          chat: "#0B141A",
          bubbleIn: "#202C33",
          bubbleOut: "#005C4B",
          text: "#E9EDEF",
          subtext: "#8696A0",
          accent: "#00A884",
          divider: "#222D34",
        },
      },
      fontFamily: {
        sans: [
          "Google Sans",
          "Google Sans Text",
          "Product Sans",
          "DM Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "blue-radial":
          "radial-gradient(circle at 20% 0%, rgba(0,133,255,0.18), transparent 55%), radial-gradient(circle at 80% 100%, rgba(0,133,255,0.10), transparent 55%)",
        "blue-grid":
          "linear-gradient(rgba(0,133,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,133,255,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(0,133,255,0.45)",
        soft: "0 4px 24px -8px rgba(0,0,0,0.08)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out",
        pulseDot: "pulseDot 1.4s ease-in-out infinite",
        floatY: "floatY 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
