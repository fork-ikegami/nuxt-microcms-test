import axios from 'axios'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: '/nuxt-microcms-test/',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'page',
      })
      routes.push({
        path: '/category/:categoryId/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'category',
      })
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-microcms-test',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/nuxt-microcms-test/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-microcms-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    async routes() {
      // ページング
      const limit = 10
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 一覧
      const pages = await axios
        .get(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=0`, {
          headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        )

      // カテゴリ
      // カテゴリ一覧を取得し、カテゴリIDの配列を生成
      const categories = await axios
          .get(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/categories?fields=id`, {
            headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
          })
          .then(({ data }) => {
            return data.contents.map((content) => content.id)
          });
      // カテゴリごとの記事一覧と件数を取得し、ルーティングを作成
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios.get(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=0&filters=category[equals]${category}`, {
            headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
          })
          .then((res) =>
            range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
              route: `/category/${category}/page/${p}`,
            }))
          )
        )
      )
      // 2次元配列をフラットにする
      const flattenCategoryPages = [].concat.apply([], categoryPages)
      return [...pages, ...flattenCategoryPages]
    }
  },

  // microCMS
  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
}
