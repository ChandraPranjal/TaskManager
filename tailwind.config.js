/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "icon-sm": "1.5rem",
        "icon-md": "50",
        "icon-lg": "50",
      },
    },
  },
  plugins: [],
};
