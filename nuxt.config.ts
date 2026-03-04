export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  app: {
    head: {
      title: 'UN Internships',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Browse United Nations internship opportunities worldwide' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      ],
    },
  },
  runtimeConfig: {
    apiToken: '0ba18830-5826-11ec-ad59-0604c6d10472:939edab6ff8fc3a19ac406a6d56dbfe4',
  },
})
