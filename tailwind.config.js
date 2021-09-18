module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xxs: "300px",
        xs: "500px",
      },
      width: {
        "19/20": "95%",
      },
      maxWidth: {
        xswidth: "15rem",
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
        "opaque-blue": "rgba(159, 211, 233, 0.47)",
      }),
      fontFamily: {
        sansita: ["Sansita Black Italic", "sans-serif"],
        sansitaregular: ["Sansita Regular", "sans-serif"],
        palanquin: ["Palanquin Light", "sans-serif"],
        palanquinregular: ["Palanquin Regular"],
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover"],
      fontSize: ["hover", "focus"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
