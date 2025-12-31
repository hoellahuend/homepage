module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pri: "#000000",
        sec: "#cc0000",
        ter: "#cccccc",
        qua: "#1a1a1a",
        qui: "#fdfdfd",
      },
      fontFamily: {
        tifont: ["Rumpus", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        // hand: ["Patrick Hand", "cursive"],
        tefont: ["Exo2-Medium", "cursive"],
        // montserrat: ["Montserrat-Medium", "cursive"],
      },
      dropShadow: {
        "custom-lg": "0 3px 10px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
