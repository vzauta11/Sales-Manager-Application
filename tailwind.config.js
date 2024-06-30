/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-arrows": {
          // For Chrome, Safari, Edge, and Opera
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
          // For Firefox
          "&[type=number]": {
            "-moz-appearance": "textfield",
          },
        },
      });
    },
  ],
  corePlugins: { preflight: false },
};
