import { readdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export default defineEventHandler(async () => {
  const siteUrl = 'https://uninternships.org'

  // Try source content dir first (dev), then build output (prod)
  let faqSlugs: string[] = []
  const candidates = [
    resolve(process.cwd(), 'content/faq'),
    resolve(dirname(fileURLToPath(import.meta.url)), '../../public/__nuxt_content/faq'),
  ]

  for (const dir of candidates) {
    try {
      const files = await readdir(dir)
      faqSlugs = files
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''))
      if (faqSlugs.length) break
    } catch {}
  }

  // Fallback: query the content API
  if (!faqSlugs.length) {
    try {
      const articles = await $fetch<{ path: string }[]>('/api/_content/query/faq')
      faqSlugs = articles.map((a) => a.path.replace('/faq/', ''))
    } catch {}
  }

  const { untalentToken } = useRuntimeConfig()
  const result = await $fetch<{ total: number }>('https://untalent.org/api/v1/jobs', {
    query: { token: untalentToken, page: 1 },
  })
  const totalPages = Math.ceil((result?.total ?? 0) / 31)

  const urls: { loc: string; changefreq: string; priority: number }[] = []

  for (let i = 0; i < totalPages; i++) {
    urls.push({
      loc: i === 0 ? '/' : `/?page=${i + 1}`,
      changefreq: 'daily',
      priority: i === 0 ? 1.0 : 0.8,
    })
  }

  urls.push({ loc: '/faq', changefreq: 'weekly', priority: 0.8 })

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
