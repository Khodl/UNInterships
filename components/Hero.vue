<script setup>
defineProps({
  total: { type: Number, default: 0 },
  showIntro: { type: Boolean, default: false },
})
</script>

<template>
  <section v-if="showIntro" class="mb-8 pb-6 border-b-2 border-gray-200">
    <p class="text-gray-600 leading-relaxed">
      Browse the latest internship and job opportunities across United Nations agencies and international organizations.
      {{ total }} positions currently available worldwide.
    </p>
    <a
      href="https://untalent.org"
      target="_blank"
      rel="noopener"
      class="inline-block mt-4 px-5 py-2.5 bg-[#009EDB] text-white rounded-md text-sm hover:bg-[#0082b6] transition-colors"
    >
      View all opportunities on UNtalent.org
    </a>
  </section>
</template>
