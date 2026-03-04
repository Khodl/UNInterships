<template>
  <div class="app-layout">
    <header class="header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">🇺🇳</span>
          <span class="logo-text">UN Internships</span>
        </NuxtLink>
        <p class="tagline">Discover internship opportunities across the United Nations system</p>
      </div>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <div class="footer-inner">
        <p>Powered by <a href="https://untalent.org" target="_blank" rel="noopener">UNTalent.org</a></p>
      </div>
    </footer>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f0f4f8;
  color: #1a202c;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #009edb 0%, #00558c 100%);
  color: white;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.logo-icon {
  font-size: 2rem;
}

.tagline {
  font-size: 1rem;
  opacity: 0.85;
  font-weight: 400;
}

.main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.footer {
  background: #1a202c;
  color: #a0aec0;
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
}

.footer a {
  color: #63b3ed;
  text-decoration: underline;
}

@media (max-width: 640px) {
  .header {
    padding: 1.5rem 1rem;
  }

  .logo {
    font-size: 1.35rem;
  }

  .tagline {
    font-size: 0.875rem;
  }

  .main {
    padding: 1rem;
  }
}
</style>
