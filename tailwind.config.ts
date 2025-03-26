import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminalBg: "#0d0d0d", // almost black background
        terminalPanel: "#1a1a1a", // slightly lighter panel background
        neonGreen: "#39ff14", // electric neon green for text
        neonBlue: "#00e7ff", // bright cyan-blue highlights
        neonYellow: "#faff00", // vivid yellow highlights
        neonRed: "#ff3131", // bright red for errors/fail
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      boxShadow: {
        // A soft glow shadow (green) for the "terminal" container
        neon: "0 0 10px rgba(57, 255, 20, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
