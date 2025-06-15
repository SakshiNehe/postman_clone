/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#020B17', // Adjusted to an even darker blue, closer to black
        'accent-blue': '#4FC3F7',  // A vibrant light blue for accents
        // Add more colors if needed from your main website's palette
      },
    },
  },
  plugins: [],
}; 