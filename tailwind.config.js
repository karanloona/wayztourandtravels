/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        marqueeReverse: "marqueeReverse 60s linear infinite",
      },
    },
  },
  plugins: [],
};
