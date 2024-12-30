// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import fs from "fs";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";

const SRC_POSTS_DIR = "./src/pages/posts";

const INTERNAL_POST_LINK_RE = /^https?:\/\/.+\/posts\/([a-zA-Z0-9\-]+)\/?/;

const externalPosts = new Set(
  (await readdir(SRC_POSTS_DIR, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .filter((dirent) => {
      const contentPath = path.join(SRC_POSTS_DIR, dirent.name);
      const content = fs.readFileSync(contentPath, { encoding: "utf8" });
      const frontmatter = matter(content).data;

      return !!frontmatter.affiliateLink;
    })
    .map((dirent) => dirent.name.slice(0, -4)),
);

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        // Filter out external posts from the sitemap as they just redirect.
        const match = page.match(INTERNAL_POST_LINK_RE);
        return !match || !externalPosts.has(match[1]);
      },
    }),
    ,
    tailwind(),
  ],

  site: process.env.PRODUCTION_URL
    ? `https://${process.env.PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:4321",

  // Prefetch everything by default since every page is lightweight.
  prefetch: {
    prefetchAll: true,
  },
});
