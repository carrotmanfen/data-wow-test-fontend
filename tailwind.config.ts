/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
       
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          kanit: ["Kanit", "sans-serif"],
          sarabun: ["Sarabun", "sans-serif"],
        },
        colors: {
          primary: "#3498DB",
          hoverPrimary:"#007DD0",
          lightBlue:"#E9F6FF",
          textPrimary:"#2B2B2B",
          primaryRed:"#EF2020",
          hoverRed:"#BB1A1A",
          primaryGreen:"#67CF8B",
          primaryOrange:"#F6A546",
          hlRed:"#FF8484",
          hlYellow:"#FFE144",
          borderNavbar:"#C9C9C9",
          textGray:"#777777",
          gray:"#C9C9C9",
          cleansing:"#008F7A",
          hoverCleansing:"#0C6A5C",
        },
        screens: {
          xs: "375px",
          sm: "744px",
          md: "1024px",
          lg: "1440px",
          xl: "1700px",
        },
        transformOrigin: {
          "0": "0%",
        },
        zIndex: {
          "-1": "-1",
        },
      },
    },
    plugins: [],
  }