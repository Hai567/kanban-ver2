/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      dracula: {
        ...require("daisyui/src/theming/themes")["[data-theme=dracula]"],
        ".bg-item-color": { "background-color": "#18181880" }
      }
    }, {
      light: {
        ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        ".bg-item-color": { "background-color": "bg-slate-200" }
      }
    }],
    darkTheme: "night",
  },
};