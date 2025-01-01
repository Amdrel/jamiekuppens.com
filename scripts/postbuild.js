// @ts-check
import fs, { readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";

const SRC_POSTS_DIR = "./src/content/posts";
const REDIRECTS_PATH = "./redirects.json";

/**
 * Create a redirects.json file for the middleware with all external links.
 */
async function generateRedirectsFile() {
  /** @type {Record<string, string>} */
  const redirects = {};

  const posts = (await readdir(SRC_POSTS_DIR, { withFileTypes: true })).filter(
    (dirent) => dirent.isFile(),
  );

  for (const post of posts) {
    const contentPath = path.join(post.path, post.name);
    const content = await fs.readFile(contentPath, { encoding: "utf8" });
    const frontmatter = matter(content).data;

    if (frontmatter.affiliateLink) {
      const slug = post.name.slice(0, -4);
      redirects[`/posts/${slug}`] = frontmatter.affiliateLink;
    }
  }

  await fs.writeFile(REDIRECTS_PATH, JSON.stringify(redirects, null, 2));
}

await generateRedirectsFile();
