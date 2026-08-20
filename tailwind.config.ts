import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        pixel: ["var(--font-pixel)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyan: {
          glow: "#3DD5F3",
        },
        green: {
          neon: "#00FF00",
        }
      },
    },
  },
  plugins: [],
};
export default config;
