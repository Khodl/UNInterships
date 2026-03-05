<script setup>
const route = useRoute()
const page = computed(() => Number(route.query.page) || 1)

const PER_PAGE = 31

const { data: result, status } = await useFetch('/api/jobs', {
  key: computed(() => `jobs-page-${page.value}`),
  query: computed(() => ({ page: page.value })),
  watch: [page],
})

const totalPages = computed(() => Math.ceil((result.value?.total ?? 0) / PER_PAGE))

const title = computed(() =>
  page.value === 1
    ? 'UN Internships — Latest UN Job Opportunities'
    : `UN Internships — Page ${page.value}`
)

useHead({
  title,
  meta: [
    { property: 'og:title', content: title },
    { property: 'og:description', content: `Browse ${result.value?.total ?? 0} UN internship and job opportunities worldwide.` },
  ],
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-8 font-sans">
    <Hero :total="result?.total ?? 0" :show-intro="page === 1" />

    <p v-if="status === 'pending'" class="text-gray-500">Chargement...</p>
    <p v-else-if="status === 'error'" class="text-red-600">Erreur lors du chargement des offres.</p>

    <ul v-else class="list-none p-0">
      <JobCard v-for="job in result?.jobs" :key="job.slug" :job="job" />
    </ul>

    <nav v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
      <NuxtLink
        :to="page > 1 ? { query: { page: page - 1 } } : undefined"
        class="px-4 py-2 border border-gray-300 rounded text-gray-700 no-underline hover:bg-gray-50 transition-colors"
        :class="{ 'pointer-events-none opacity-40': page <= 1 }"
      >
        &larr; Précédent
      </NuxtLink>

      <span class="text-gray-500">Page {{ page }} / {{ totalPages }}</span>

      <NuxtLink
        :to="page < totalPages ? { query: { page: page + 1 } } : undefined"
        class="px-4 py-2 border border-gray-300 rounded text-gray-700 no-underline hover:bg-gray-50 transition-colors"
        :class="{ 'pointer-events-none opacity-40': page >= totalPages }"
      >
        Suivant &rarr;
      </NuxtLink>
    </nav>
  </div>
</template>
