// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap()],
  site: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:4321",
});

