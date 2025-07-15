/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(243 100% 69%)',
        accent: 'hsl(348 97% 73%)',
        accent_light: 'hsl(348 97% 73%)',
        body: 'hsl(240 100% 98%)',
        dark_primary: 'hsl(245 17% 29%)'
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        ovo: ["Ovo", "serif"],
        autour: ["Autour One" , "system-ui"],   
        poppins: ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [],
}
