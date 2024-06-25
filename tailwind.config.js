/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9D41FF",
        secondary: "#15153E",
      },
      container: {
        center: true,
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
