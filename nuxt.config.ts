export default defineNuxtConfig({
  target: 'static',
  app: {
    head: {
      charset: 'utf-16',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
      // viewport: 'width=500, initial-scale=1', 
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'layout', mode: 'out-in' }
  },
  build: {
    transpile: ['gsap'],
  },
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css', '~/assets/css/blurs.css'],
  modules: ['@nuxtjs/sanity', '@pinia/nuxt'],
  image: {
    // Options
    sanity: {
      projectId: 'qosr5ili'
    }
  },
  sanity: {
    projectId: 'qosr5ili'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_vars.scss" as *;'
        }
      }
    }
  },
  routeRules: {
    '/**': { prerender: true }, // Ensures Netlify can serve all pages
  },
  nitro: {
    prerender: {
      routes: ['/404'], // Ensures Netlify recognizes the 404 page
    },
  },
  generate: {
    fallback: "404.html", // Helps Netlify use the right file
  }
})