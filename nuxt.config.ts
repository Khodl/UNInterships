// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌍</text></svg>' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'UN Internships',
            url: 'https://uninternships.org',
            description: 'Browse the latest UN internship and job opportunities across United Nations agencies and international organizations.',
          }),
        },
      ],
      meta: [
        { name: 'description', content: 'Browse the latest UN internship and job opportunities across United Nations agencies and international organizations.' },
        { name: 'theme-color', content: '#009EDB' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'UN Internships' },
        { property: 'og:image', content: 'https://untalent.org/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },

  runtimeConfig: {
    untalentToken: '',
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
})