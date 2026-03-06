<template>
  <nav class="border-b border-gray-200 bg-white">
    <div class="max-w-3xl mx-auto px-8 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold text-[#009EDB] no-underline">🌍 UN Internships</NuxtLink>
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-sm text-gray-600 hover:text-[#009EDB] transition-colors">Jobs</NuxtLink>
        <NuxtLink to="/faq" class="text-sm text-gray-600 hover:text-[#009EDB] transition-colors">FAQ</NuxtLink>
        <a
          href="https://untalent.org"
          target="_blank"
          rel="noopener"
          class="px-4 py-2 bg-[#009EDB] text-white rounded-md text-sm hover:bg-[#0082b6] transition-colors"
        >
          UNtalent.org
        </a>
      </div>
    </div>
  </nav>
</template>
