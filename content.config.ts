import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    faq: defineCollection({
      type: 'page',
      source: 'faq/**',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
      }),
    }),
  },
})
