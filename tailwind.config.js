export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        clarendon: ["Clarendon", "serif"],
       helvetica: ["HelveticaNow", "Arial", "sans-serif"],
         poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};