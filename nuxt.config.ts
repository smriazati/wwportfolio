export default defineNuxtConfig({
  target: 'static',
    app: {
      head: {
        charset: 'utf-16',
        // viewport: 'width=500, initial-scale=1', 
      }
    },
    build: {
      transpile: ['gsap'],
    },
    app: {
      layoutTransition: { name: 'layout', mode: 'out-in' },
      pageTransition: { name: 'layout', mode: 'out-in' }
    },
    css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],
    modules: ['@nuxtjs/sanity'],
    image: {
      // Options
      sanity: {
        projectId: 'qosr5ili'
      }
    },
    sanity: {
      projectId: 'qosr5ili'
    }})