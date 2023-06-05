/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        animfadeAbove: "fadeAbove 700ms ease-in-out",
        animfadeBelow: "fadeBelow 700ms ease-in-out",
        animfadeLeftSide: "fadeLeftSide 700ms ease-in-out",
        animfadeRightSide: "fadeRightSide 700ms ease-in-out",
      },
      keyframes: {
        fadeAbove: {
          "100%": { transform: "translateY(0px)", opacity: "1" },
          "0%": {
            transform: "translateY(-15px)",
            opacity: "0",
          },
        },
        fadeBelow: {
          "100%": { transform: "translateY(0px)", opacity: "1" },
          "0%": {
            transform: "translateY(15px)",
            opacity: "0",
          },
        },
        fadeLeftSide: {
          "100%": { transform: "translateX(0px)", opacity: "1" },
          "0%": {
            transform: "translateX(-15px)",
            opacity: "0",
          },
        },
        fadeRightSide: {
          "100%": { transform: "translateX(0px)", opacity: "1" },
          "0%": {
            transform: "translateX(15px)",
            opacity: "0",
          },
        },
      },
      boxShadow: {
        leftButtonShadow: "-5px 5px 0px 0px",
        rightButtonShadow: "5px 5px 0px 0px",
        leftLetterShadow: "-8px 8px 0px 0px",
        rightLetterShadow: "8px 8px 0px 0px",
      },
      width: {
        landingPageWidth: "700px",
        letterWidth: "200px",
        letterLandScapeWidth: "300px",
        buttonContainerWidth: "200px",
        buttonWidth: "100px",
      },
      height: {
        letterPageHeight: "300px",
        letterLandScapeHeight: "200px",
      },
      maxWidth: {
        svgWidth: "400px",
      },
      rotate: {
        360: "360deg",
      },
      gridTemplateColumns: {
        myGridTemplate: "repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "639px" },

      xsm: { max: "600px" },
    },
    colors: {
      primary: "#22293C",
      secondary: "#FFFFFF",
      accent: "#364261",
    },
  },
  plugins: [],
  darkMode: "class",
};
