<script setup>
const { data: articles } = await useAsyncData('faq-list', () =>
  queryCollection('faq').order('date', 'DESC').all()
)

const faqSchema = computed(() => {
  if (!articles.value) return []
  return [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: articles.value.map((a) => ({
        '@type': 'Question',
        name: a.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a.description || '',
        },
      })),
    }),
  }]
})

useHead({
  title: 'FAQ — UN Internships',
  meta: [
    { property: 'og:title', content: 'FAQ — UN Internships' },
    { name: 'description', content: 'Frequently asked questions about UN internships and job opportunities.' },
  ],
  script: faqSchema,
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-8 font-sans">
    <header class="mb-8 pb-6 border-b-2 border-gray-200">
      <h1 class="text-3xl font-bold text-[#009EDB]">FAQ</h1>
      <p class="mt-2 text-gray-600">Frequently asked questions about UN internships and opportunities.</p>
    </header>

    <ul class="list-none p-0">
      <li v-for="article in articles" :key="article.path" class="border border-gray-200 rounded-lg p-4 mb-3">
        <NuxtLink :to="article.path" class="block group">
          <h2 class="text-lg font-semibold text-[#009EDB] group-hover:underline">{{ article.title }}</h2>
          <p v-if="article.description" class="mt-1 text-sm text-gray-500">{{ article.description }}</p>
          <span v-if="article.date" class="text-xs text-gray-400 mt-1 inline-block">{{ article.date }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
