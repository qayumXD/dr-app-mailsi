import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pak: {
          green: "#0b5e36",
          dark: "#063d22",
          light: "#e8f5ee",
          gold: "#cda03f",
          cream: "#faf8f2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
