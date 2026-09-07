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
        // SkillBridge Core Color System Tokens
        forest: {
          DEFAULT: "#1B4332", // Deep forest green (primary brand moments, CTA fills, key headlines)
          dark: "#143326",
          light: "#245842",
        },
        moss: {
          DEFAULT: "#74A97E", // Soft moss green (secondary accent, supporting highlights)
          light: "#92be9a",
          dark: "#578c61",
        },
        gold: {
          DEFAULT: "#E8B84B", // Warm gold (verified/success accent, stat metrics)
          light: "#f0cb77",
          dark: "#c99a32",
        },
        parchment: {
          DEFAULT: "#F7F4EC", // Warm off-white (default page background)
          light: "#FAF8F2",
          dark: "#EDE7D9",
        },
        ink: {
          DEFAULT: "#1F2420", // Near-black warm charcoal (primary body text)
          light: "#38423a",
          muted: "#667268",
        },
        "cream-card": "#FFFFFF",
        "cream-border": "#E4DFD1",

        // Backward compatibility mappings
        brand: {
          50: "#F7F4EC",
          100: "#EDE7D9",
          200: "#c2dcbe",
          300: "#92be9a",
          400: "#74A97E",
          500: "#245842",
          600: "#1B4332",
          700: "#143326",
          800: "#0e241b",
          900: "#1B4332",
          950: "#091711",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#f0cb77",
          500: "#E8B84B",
          600: "#c99a32",
          700: "#a37a22",
          800: "#78350f",
          900: "#451a03",
        },
      },
    },
  },
  plugins: [],
};

export default config;
