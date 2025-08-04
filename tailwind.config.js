module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  plugins: [
    require('@tailwindcss/forms'),
    //require('preline/plugin'),
  ],
};