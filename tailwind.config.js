module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    textColor: {
      darkblue: "#0B2D4F",
      purewhite: "#FFFFFF",
    },
    borderColor: (theme) => ({
      ...theme("textColor"),
    }),
    ringColor: (theme) => ({
      ...theme("textColor"),
    }),
    placeholderColor: (theme) => ({
      ...theme("textColor"),
    }),
    scale: {
      0: "0",
      25: ".25",
      30: ".30",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
      200: "2",
      205: "2.05",
      225: "2.25",
      250: "2.5",
      300: "3",
      325: "3.25",
      350: "3.5",
      400: "4",
    },
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
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
      },
      backgroundImage: (theme) => ({
        "koi-fish-pond": "url('/src/assets/KoiFishPond.png')",
        "koi-fish-pond-dark": "url('/src/assets/KoiFishPondDark.png')",
        "knight-hacks-logo": "url('/src/assets/KnightHacksLogo.svg')",
        "knight-hacks-dark-logo":
          "url('/src/assets/Navy_Gi_Logo_-_Transparent.png')",
        "anim-koi-fish-pond-light":
          "url('/src/assets/lotties/light_mode.json')",
      }),
      backgroundColor: (theme) => ({
        "landing-transparent": "rgba(191, 219, 254, 0.2)",
        "menu-transparent": "rgba(96, 165, 250, 0.6)",
        "menu-transparent-dark": "rgba(5, 64, 138, 0.6)",
        "opaque-blue": "rgba(159, 211, 233, 0.47)",
        ...theme("textColor"),
      }),
      fontFamily: {
        sansita: ["Sansita Black Italic", "sans-serif"],
        sansitaregular: ["Sansita Regular", "sans-serif"],
        sansitaitalic: ["Sansita Italic", "sans-serif"],
        palanquin: ["Palanquin Light", "sans-serif"],
        palanquinregular: ["Palanquin Regular", "sans-serif"],
        palanquinbold: ["Palanquin Bold", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover"],
      fontSize: ["hover", "focus"],
      backgroundColor: ["active", "checked"],
      textDecoration: ["focus-visible"],
      borderColor: ["checked"],
      backgroundImage: ["dark"],
      transitionDuration: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
