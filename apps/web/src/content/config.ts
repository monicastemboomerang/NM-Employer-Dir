import { defineCollection, z } from "astro:content";

const pageCollection = defineCollection({
  type: "content",
  schema: z.object({
    slug: z.string(),
    title: z.string(),
  }),
});

export const collections = {
  page: pageCollection,
};
