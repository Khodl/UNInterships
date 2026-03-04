<template>
  <div class="jobs-page">
    <div class="stats-bar" v-if="data?.total">
      <p class="results-count">
        <strong>{{ data.total.toLocaleString() }}</strong> internships available
      </p>
      <p class="page-info">Page {{ currentPage }} of {{ totalPages }}</p>
    </div>

    <div v-if="status === 'pending'" class="loading">
      <div class="spinner" />
      <p>Loading internships...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p class="error-title">Failed to load internships</p>
      <p class="error-msg">{{ error.message }}</p>
      <button class="retry-btn" @click="refresh()">Try Again</button>
    </div>

    <template v-else-if="data?.data?.length">
      <div class="jobs-grid">
        <JobCard v-for="job in data.data" :key="job.id || job.url" :job="job" />
      </div>
      <Pagination :current-page="currentPage" :total-pages="totalPages" @change-page="goToPage" />
    </template>

    <div v-else class="empty-state">
      <p>No internships found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const currentPage = computed(() => Number(route.query.page) || 1)

const { data, status, error, refresh } = await useFetch('/api/jobs', {
  query: { page: currentPage },
  watch: [currentPage],
})

const totalPages = computed(() => {
  if (!data.value) return 1
  const response = data.value as Record<string, unknown>
  if (response.last_page) return Number(response.last_page)
  if (response.total_pages) return Number(response.total_pages)
  if (response.total && response.per_page) {
    return Math.ceil(Number(response.total) / Number(response.per_page))
  }
  // Fallback: if current page has full results, assume there's at least one more page
  const items = (response.data as unknown[]) || []
  if (items.length >= 20) return currentPage.value + 1
  return currentPage.value
})

function goToPage(page: number) {
  router.push({ query: { page } })
}

useHead({
  title: currentPage.value === 1 ? 'UN Internships' : `UN Internships - Page ${currentPage.value}`,
})
</script>

<style scoped>
.stats-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.results-count {
  font-size: 1rem;
  color: #4a5568;
}

.page-info {
  font-size: 0.875rem;
  color: #a0aec0;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  color: #718096;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #009edb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 4rem 1rem;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e53e3e;
  margin-bottom: 0.5rem;
}

.error-msg {
  color: #718096;
  margin-bottom: 1.5rem;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #009edb;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.retry-btn:hover {
  background: #0084b8;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: #718096;
  font-size: 1.1rem;
}

@media (max-width: 640px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .stats-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
