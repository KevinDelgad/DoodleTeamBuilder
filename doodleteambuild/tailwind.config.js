/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "basic": "#83868e",
        "fire": "#d98045",
        "water": "#579adf",
        "plant": "#74b859",
        "spark": "#f8e276",
        "beast": "#604a41",
        "air": "#98a2a7",
        "insect": "#abc583",
        "earth": "#a58670",
        "mind": "#d2989b",
        "melee": "#c45241",
        "food": "#f0c9a1",
        "light": "#fbf4d6",
        "crystal": "#73c9e6",
        "metal": "#8b9ba8",
        "spirit": "#6d558e",
        "ice": "#d1e6f0",
        "dark": "#4f4e50",
        "poison": "#9585ab",
        "mythic": "#4b589a"
      },
    },
  },
  plugins: [require("daisyui")],
};
