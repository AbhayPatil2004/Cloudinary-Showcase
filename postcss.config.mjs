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
import daisyui from "daisyui";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // ✅ register DaisyUI
  daisyui: {
    themes: ["dark"], // ✅ configure themes here
  },
};

export default config;
