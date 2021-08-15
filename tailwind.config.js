module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "19/20": "95%",
      },
      height: {
        "19/20": "95%",
        "3/20": "15%",
        "17/20": "85%",
      },
      backgroundImage: (theme) => ({
        "koi-fish-pond": "url('/src/assets/KoiFishPond.png')",
        "knight-hacks-logo": "url('/src/assets/knightHacksLogo_WHITE.svg')",
      }),
      backgroundColor: (theme) => ({
        "landing-transparent": "rgba(191, 219, 254, 0.2)",
        "menu-transparent": "rgba(96, 165, 250, 0.6)",
      }),
      fontFamily: {
        sans: ["sans-serif"],
        regular: ["Avenir Next Regular", "sans-serif"],
        medium: ["Avenir Next Medium", "sans-serif"],
        mediumitalic: ["Avenir Next Medium Italic", "sans-serif"],
        light: ["Avenir Next Ultra Light", "sans-serif"],
        lightitalic: ["Avenir Next Ultra Light Italic", "sans-serif"],
        italic: ["Avenir Next Italic", "sans-serif"],
        heavy: ["Avenir Next Heavy", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      fontSize: ["hover", "focus"],
    },
  },
  plugins: [],
};
