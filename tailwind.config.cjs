/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        lumen: "#FFFFEB",
        "lumen-dark": "#E4E4D0",
        vast: "#1A1A1A",
        fathom: "#034F46",
        glow: "#FFA946",
        flare: "#FF6C4C",
        dawn: "#F0D7FF",
        signal: "#FFBCF2",
        pulse: "#7F1C34",
      },
      fontFamily: {
        serif: ['"EB Garamond"', "Georgia", "serif"],
        sans: ['"Figtree"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      maxWidth: {
        nav: "57rem",
        content: "51rem",
        wide: "75rem",
        full: "120rem",
      },
      borderRadius: {
        section: "1.5rem",
        "section-lg": "2.5rem",
        "section-xl": "5rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
