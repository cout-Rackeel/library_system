/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(243 100% 69%)',
        accent: 'hsl(348 97% 73%)',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        ovo: ["Ovo", "serif"],
        autour: ["Autour One" , "system-ui"]
      },
    },
  },
  plugins: [],
}
