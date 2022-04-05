export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,
  server: { host: "0.0.0.0" },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Merge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Merge' },
      { name: 'author', content: 'Tina Wang' },
      { name: 'twitter:creator', content: '@ItsTinaWang' },

      { name: 'twitter:site', content: 'https://merge.tina.cafe/' },
      { name: 'twitter:title', content: 'Merge' },
      { name: 'twitter:description', content: 'Metadata Dashboard' },
      { hid: 'og:title', property: 'og:title', content: 'Merge' },
      { hid: 'description', name: 'description', content: 'Metadata Dashboard' },
      { hid: 'og:description', property: 'og:description', content: 'Metadata Dashboard' },

      { hid: 'og:url', property: 'og:url', content: 'https://merge.tina.cafe/' },
      { hid: 'keywords', name: 'keywords', content: 'Merge NFT pak dashboard meta data' },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: '/preview.jpg' },
      { property: 'og:image', content: '/preview.jpg' },
      { property: 'og:image:width', content: '630' },
      { property: 'og:image:height', content: '630' },
    ],
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/css/base.postcss"
  ],

  http: {
    baseURL: process.env.REQ_API,
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/http',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true
      }
    },
    postcss: {
      preset: {
        features: {
          // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
          "focus-within-pseudo-class": false
        }
      }
    },
    // 🚨 Uncomment only if encounter layout style leaks
    // splitChunks: {
    //   layouts: true
    // }
    babel: {
      "presets": [
        [
          "@babel/preset-env",
          {
            targets: {
              esmodules: true
            },
            "loose": true,
            "shippedProposals": true
          }
        ]
      ]
    }
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'font') return /.woff2/.test(file)
        return ['script', 'style'].includes(type)
      }
    }
  }
}
