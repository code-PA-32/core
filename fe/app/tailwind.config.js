import tailwindConfig from "@core/tailwind/tailwind.config.js";

/** @type {import('tailwindcss').Config} */

/* eslint-disable import/no-default-export */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [tailwindConfig],
};
