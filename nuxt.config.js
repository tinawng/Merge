// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL
        }
    },

    modules: [
        ['@nuxtjs/tailwindcss'],
        ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]
    ],

    imports: {
        dirs: ['stores'],
    },

    css: [
        "@/assets/css/base.postcss"
    ],

    app: {
        head: {
            title: 'Merge',
            htmlAttrs: { lang: 'en' },
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
            ],
            meta: [
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
            ]
        }
    }
})
