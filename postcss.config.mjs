// import daisyui from "daisyui";
// import themes from "daisyui/theme/object";

// const config = {
//   plugins: ["@tailwindcss/postcss" , require("daisyui")],
//   daisyui:[
//     themes:["dark"] 
//   ]
// };

// export default config;

// tailwind.config.mjs
// import daisyui from "daisyui";

// const config = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [daisyui], 
//   daisyui: {
//     themes: ["dark"], 
//   },
// };

// export default config;


// tailwind.config.mjs
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"], // ✅ correct way
  },
};

export default config;
