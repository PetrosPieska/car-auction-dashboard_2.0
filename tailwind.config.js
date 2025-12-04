/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "#050816",
        "bg-card": "#0B1020",
        "accent": "#F97316",
        "accent-alt": "#22D3EE",
      },
    },
  },
  plugins: [],
};
