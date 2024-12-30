import fs from "fs";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";

const SRC_POSTS_DIR = "./src/pages/posts";
const DIST_POSTS_DIR = "./dist/posts";
const REDIRECTS_PATH = "./redirects.json";

/**
 * Remove the external posts from the filesystem.
 *
 * @param {Set<string>} externalPosts
 */
async function removeExternalPosts(externalPosts) {
  externalPosts.forEach((slug) => {
    const externalPostPath = path.join(DIST_POSTS_DIR, slug);
    if (fs.existsSync(externalPostPath)) {
      fs.rmSync(externalPostPath, { recursive: true, force: true });
    }
  });
}

/**
 * Create a redirects.json file for our middleware with all external links.
 *
 * @param {Set<string>} externalPosts
 */
async function generateRedirectsFile(externalPosts) {
  const redirects = {};

  externalPosts.forEach((slug) => {
    const contentPath = path.join(SRC_POSTS_DIR, slug);
    const content = fs.readFileSync(`${contentPath}.mdx`, { encoding: "utf8" });
    const frontmatter = matter(content).data;

    redirects[`/posts/${slug}`] = frontmatter.affiliateLink;
  });

  fs.writeFileSync(REDIRECTS_PATH, JSON.stringify(redirects, null, 2));
}

/**
 * Remove external posts from the build, create dynamic redirects for use by
 * the middleware, and modify the sitemap to hide external content.
 *
 * The reason why I do this instead of using 'getStaticPaths' is because I was
 * unable to find a way to conditionally render MDX files that are imported from
 * another path outside of 'pages'. I prefer to store external URLs in
 * frontmatter in stubbed posts alongside real posts, so this was the next best
 * solution that I could think of.
 */
(async () => {
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

  await removeExternalPosts(externalPosts);
  await generateRedirectsFile(externalPosts);
})();
