import fs, { readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";

const SRC_POSTS_DIR = "./src/content/posts";
const REDIRECTS_PATH = "./redirects.json";

/**
 * Create a redirects.json file for our middleware with all external links.
 *
 * @param {Set<string>} externalPosts
 */
async function generateRedirectsFile(externalPosts) {
  const redirects = {};

  for (const slug of externalPosts) {
    const contentPath = path.join(SRC_POSTS_DIR, slug);
    const content = await fs.readFile(`${contentPath}.mdx`, {
      encoding: "utf8",
    });
    const frontmatter = matter(content).data;

    redirects[`/posts/${slug}`] = frontmatter.affiliateLink;
  }

  await fs.writeFile(REDIRECTS_PATH, JSON.stringify(redirects, null, 2));
}

/**
 * Create dynamic redirects for use by the middleware.
 */
(async () => {
  const posts = (await readdir(SRC_POSTS_DIR, { withFileTypes: true })).filter(
    (dirent) => dirent.isFile(),
  );

  const postContents = await Promise.all(
    posts.map((dirent) =>
      fs
        .readFile(path.join(SRC_POSTS_DIR, dirent.name), { encoding: "utf8" })
        .then((content) => ({ dirent, content })),
    ),
  );

  // Determine if a post is external by looking at its frontmatter.
  const externalPosts = new Set(
    postContents
      .filter(({ content }) => !!matter(content).data.affiliateLink)
      .map(({ dirent }) => dirent.name.slice(0, -4)),
  );

  await generateRedirectsFile(externalPosts);
})();
