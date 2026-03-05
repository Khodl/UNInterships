<script setup>
import { marked } from 'marked'

defineProps({
  job: { type: Object, required: true },
})

function mdToText(md) {
  return marked(md).replace(/<[^>]+>/g, '').trim()
}

function expiryLabel(expireAt) {
  if (!expireAt) return null
  const now = new Date()
  const diff = new Date(expireAt) - now
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return { text: 'Expired', cls: 'bg-gray-100 text-gray-400' }
  if (days === 0) return { text: 'Expires today', cls: 'bg-red-50 text-red-700' }
  if (days === 1) return { text: 'Expires tomorrow', cls: 'bg-orange-50 text-orange-700' }
  return { text: `${days} days remaining`, cls: 'bg-gray-100 text-gray-600' }
}
</script>

<template>
  <li class="border border-gray-200 rounded-lg p-4 mb-3">
    <div class="flex items-center gap-4 mb-2">
      <img
        v-if="job.logo_url"
        :src="job.logo_url"
        :alt="job.company?.name"
        class="w-12 h-12 object-contain rounded"
      />
      <div>
        <h2 class="text-lg font-semibold">
          <a :href="`/jobs/${job.slug}`" rel="nofollow noopener" target="_blank" class="text-[#009EDB] hover:underline">
            {{ job.title }}
          </a>
        </h2>
        <p class="mt-0.5 text-sm text-gray-500">
          {{ job.company?.name }}
          <span v-if="job.locations?.length"> &mdash; {{ job.locations.map(l => l.name).join(', ') }}</span>
        </p>
        <span
          v-if="expiryLabel(job.expire_at)"
          class="inline-block mt-1 px-2 py-0.5 rounded text-xs"
          :class="expiryLabel(job.expire_at).cls"
        >
          {{ expiryLabel(job.expire_at).text }}
        </span>
      </div>
    </div>
    <div v-if="job.areas?.length || job.levels?.length" class="flex flex-wrap gap-1.5 mt-2">
      <span
        v-for="area in job.areas"
        :key="area.name"
        class="px-2 py-0.5 bg-sky-50 text-[#009EDB] rounded text-xs"
      >
        {{ area.name }}
      </span>
      <span
        v-for="level in job.levels"
        :key="level.name"
        class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
      >
        {{ level.name }}
      </span>
    </div>
    <p v-if="job.description" class="mt-2 text-sm text-gray-500">
      {{ mdToText(job.description) }}
    </p>
  </li>
</template>
