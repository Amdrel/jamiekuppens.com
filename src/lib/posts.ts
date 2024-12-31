import { getCollection } from "astro:content";

/**
 * Return a collection of all blog posts on the site with no filters.
 */
export async function getPosts() {
  return getCollection("posts");
}

/**
 * Return a collection of internal blog posts only.
 */
export async function getInternalPosts() {
  return (await getCollection("posts")).filter(
    (post) => !post.data.affiliateLink,
  );
}
