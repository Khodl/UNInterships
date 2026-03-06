<script setup>
const route = useRoute()
const slug = computed(() => [route.params.slug].flat().join('/'))

const { data: article } = await useAsyncData(`faq-${slug.value}`, () =>
  queryCollection('faq').path(`/faq/${slug.value}`).first()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useHead({
  title: `${article.value.title} — FAQ — UN Internships`,
  meta: [
    { property: 'og:title', content: article.value.title },
    { name: 'description', content: article.value.description || '' },
  ],
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-8 font-sans">
    <header class="mb-8 pb-6 border-b-2 border-gray-200">
      <NuxtLink to="/faq" class="text-[#009EDB] text-sm hover:underline">&larr; Back to FAQ</NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900 mt-4">{{ article.title }}</h1>
      <span v-if="article.date" class="text-sm text-gray-400">{{ article.date }}</span>
    </header>

    <ContentRenderer :value="article" class="prose prose-gray max-w-none" />
  </div>
</template>
