import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async () => {
  const siteUrl = 'https://uninternships.org'

  // Read FAQ slugs from content directory
  const faqDir = resolve(process.cwd(), 'content/faq')
  const files = await readdir(faqDir)
  const faqSlugs = files
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))

  const { untalentToken } = useRuntimeConfig()
  const result = await $fetch<{ total: number }>('https://untalent.org/api/v1/jobs', {
    query: { token: untalentToken, page: 1 },
  })
  const totalPages = Math.ceil((result?.total ?? 0) / 31)

  const urls: { loc: string; changefreq: string; priority: number }[] = []

  // Index pages
  for (let i = 0; i < totalPages; i++) {
    urls.push({
      loc: i === 0 ? '/' : `/?page=${i + 1}`,
      changefreq: 'daily',
      priority: i === 0 ? 1.0 : 0.8,
    })
  }

  // FAQ index
  urls.push({ loc: '/faq', changefreq: 'weekly', priority: 0.8 })

  // FAQ articles
  for (const slug of faqSlugs) {
    urls.push({ loc: `/faq/${slug}`, changefreq: 'monthly', priority: 0.7 })
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${siteUrl}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
})
