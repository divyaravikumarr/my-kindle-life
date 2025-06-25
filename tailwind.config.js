export default {
  darkMode: 'class', // 👈 important
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softPink: "#fff1f5",
        blush: "#f8bbd0",
        pastelWhite: "#fffafa",
        darkBg: "#d7b2cc",
        darkCard: "#5a354e"
      },
    },
  },
  plugins: [],
}
