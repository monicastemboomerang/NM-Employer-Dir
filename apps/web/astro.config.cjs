// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import sentry from "@sentry/astro";
import { defineConfig } from "astro/config";
// https://astro.build/config
// @ts-ignore
export default defineConfig({
  site: "https://nm-stem-services-f5e2ca.gitlab.io/",
  // Enable React to support React JSX components.
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    sentry({
      dsn: "https://glet_5505ff315207bffd7af9d41152eee691@observe.gitlab.com:443/errortracking/api/v1/projects/62915309",
    }),
  ],
});
