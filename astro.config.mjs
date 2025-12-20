// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap()],

  site: process.env.PRODUCTION_URL
    ? `https://${process.env.PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:4321",

  // Prefetch everything by default since every page is lightweight.
  prefetch: {
    prefetchAll: true,
  },

  vite: {
    plugins: [
      tailwindcss({
        // We apply base styles in global.css, so we don't need to do it again.
        // This will break overridden base styles for headers and other
        // semantic elements used in content if this is turned on.
        applyBaseStyles: true,
      }),
    ],
  },
});

