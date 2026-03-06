<template>
  <footer class="border-t border-gray-200 bg-gray-50 mt-16">
    <div class="max-w-3xl mx-auto px-8 py-8 text-sm text-gray-500">
      <p class="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-3 text-yellow-800 text-xs leading-relaxed mb-6">
        This website is not an official document of the United Nations. It is not affiliated with, endorsed by, or sponsored by the United Nations or any of its agencies.
      </p>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p>&copy; {{ new Date().getFullYear() }} UN Internships. Powered by
            <a href="https://untalent.org" target="_blank" rel="noopener" class="text-[#009EDB] hover:underline">UNtalent.org</a>
          </p>
        </div>
        <div class="flex gap-4">
          <a href="https://untalent.org/terms" target="_blank" rel="noopener" class="hover:text-[#009EDB] transition-colors">Terms & Conditions</a>
          <a href="https://untalent.org/privacy" target="_blank" rel="noopener" class="hover:text-[#009EDB] transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>
