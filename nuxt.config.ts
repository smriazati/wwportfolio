export default defineNuxtConfig({
    app: {
      head: {
        charset: 'utf-16',
        // viewport: 'width=500, initial-scale=1', 
      }
    },
    modules: ['@nuxtjs/sanity'],
    sanity: {
      projectId: 'qosr5ili'
    }})