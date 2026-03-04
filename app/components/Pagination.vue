<template>
  <nav class="pagination" v-if="totalPages > 1">
    <button class="page-btn" :disabled="currentPage <= 1" @click="$emit('changePage', currentPage - 1)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      Previous
    </button>

    <div class="page-numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="page-num"
        :class="{ active: page === currentPage, ellipsis: page === -1 }"
        :disabled="page === -1"
        @click="page !== -1 && $emit('changePage', page)"
      >
        {{ page === -1 ? '...' : page }}
      </button>
    </div>

    <button class="page-btn" :disabled="currentPage >= totalPages" @click="$emit('changePage', currentPage + 1)">
      Next
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  changePage: [page: number]
}>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) {
    pages.push(-1) // ellipsis
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push(-1) // ellipsis
  }

  pages.push(total)

  return pages
})
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.page-btn:hover:not(:disabled) {
  background: #ebf8ff;
  border-color: #bee3f8;
  color: #2b6cb0;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-num {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.page-num:hover:not(:disabled):not(.active) {
  background: #ebf8ff;
  border-color: #bee3f8;
}

.page-num.active {
  background: #009edb;
  color: white;
  border-color: #009edb;
}

.page-num.ellipsis {
  border: none;
  background: none;
  cursor: default;
}

@media (max-width: 480px) {
  .page-btn span {
    display: none;
  }
}
</style>
