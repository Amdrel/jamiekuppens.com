import { z } from "astro/zod";
import type { Thing, WithContext } from "schema-dts";

export type BaseLayoutProps = {
  site: string;
  url: string;
  frontmatter: {
    layout?: string;
    title: string;
    description: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
  headings?: {
    depth: number;
    text: string;
    slug: string;
  }[];
  schemas?: WithContext<Thing>[];
};

export type PostLayoutProps = BaseLayoutProps & {
  frontmatter: {
    pubDate: string;
    author: string;
    tags: string[];
    affiliateLink?: string;
  };
};

export const Post = z.object({
  title: z.string(),
  description: z.string(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional(),
  pubDate: z.date(),
  author: z.string(),
  tags: z.array(z.string()),
  affiliateLink: z.string().optional(),
});

export type Post = z.infer<typeof Post>;
