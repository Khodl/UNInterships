<template>
  <a :href="job.url" target="_blank" rel="noopener" class="job-card">
    <div class="card-top">
      <div class="org-badge" v-if="job.organization">
        {{ job.organization }}
      </div>
      <span class="duty-station" v-if="job.duty_station">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {{ job.duty_station }}
      </span>
    </div>
    <h3 class="job-title">{{ job.title }}</h3>
    <div class="card-meta">
      <span class="meta-item" v-if="job.department">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
        {{ job.department }}
      </span>
      <span class="meta-item" v-if="job.level">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        {{ job.level }}
      </span>
      <span class="meta-item deadline" v-if="job.deadline">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {{ formatDate(job.deadline) }}
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
interface Job {
  title: string
  url: string
  organization?: string
  department?: string
  duty_station?: string
  level?: string
  deadline?: string
  [key: string]: unknown
}

defineProps<{ job: Job }>()

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.job-card {
  display: block;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  border: 1px solid #e2e8f0;
  cursor: pointer;
}

.job-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
  border-color: #bee3f8;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.org-badge {
  display: inline-block;
  background: #ebf8ff;
  color: #2b6cb0;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.duty-station {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: #718096;
}

.job-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: #718096;
}

.deadline {
  color: #c05621;
}

@media (max-width: 640px) {
  .job-card {
    padding: 1.25rem;
  }

  .job-title {
    font-size: 1rem;
  }
}
</style>
