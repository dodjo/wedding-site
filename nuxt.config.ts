// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ui: {
    colorMode: false
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image'
  ],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Владимир и Виктория',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }

  // app: {
  //   baseURL: '/wedding-site/',
  // },
  // nitro: {
  //   preset: 'static',
  // }
})
