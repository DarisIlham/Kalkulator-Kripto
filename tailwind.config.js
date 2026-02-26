/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf8ec",
          100: "#f8edcc",
          200: "#f0d880",
          300: "#e8c750",
          400: "#d4a94e",
          500: "#c9a84c",
          600: "#a8842a",
          700: "#8b6914",
          800: "#6b4f0e",
          900: "#4a3508",
        },
        obsidian: {
          50: "#f5f3ee",
          100: "#e8e2d4",
          200: "#c9bfa8",
          300: "#a89870",
          400: "#7a6640",
          500: "#4a3d20",
          600: "#2e2610",
          700: "#1a1508",
          800: "#100e06",
          900: "#0b0905",
          950: "#070603",
        },
      },
      fontFamily: {
        cinzel: ['"Spectral"', "serif"], // ganti Cinzel
        "cinzel-deco": ['"Spectral"', "serif"], // ganti Cinzel Decorative
        cormorant: ['"Cormorant Garamond"', "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #A8842A, #D4A94E, #E8C750, #D4A94E, #A8842A)",
        "gold-shine":
          "linear-gradient(180deg, #F0D080 0%, #C9A84C 50%, #8B6914 100%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 8px rgba(201,168,76,0.25)",
        "gold-md": "0 4px 20px rgba(201,168,76,0.35)",
        "gold-lg": "0 8px 40px rgba(201,168,76,0.4)",
        "gold-glow":
          "0 0 20px rgba(201,168,76,0.5), 0 0 40px rgba(201,168,76,0.2)",
        "inset-gold": "inset 0 1px 0 rgba(201,168,76,0.3)",
      },
      animation: {
        shimmer: "shimmer 2.5s infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
