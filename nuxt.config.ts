// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', 'nuxt-gtag'],

   gtag: {
    id: 'G-F311MP6MZG'
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      wordpressGraphql:
        'https://chirag.academy/graphql',
        
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000',
    },
    wordpressUrl:
    process.env.NUXT_WORDPRESS_URL
  }
})