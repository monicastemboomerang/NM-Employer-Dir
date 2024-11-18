/** @type {import('tailwindcss').Config} */
export default {
  // eslint-disable-next-line no-undef -- It's fine
  presets: [require("@repo/tailwind-config")],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
