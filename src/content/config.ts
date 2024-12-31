import { defineCollection } from "astro:content";

import { Post } from "../types";

export const collections = {
  posts: defineCollection({ type: "content", schema: Post }),
};
