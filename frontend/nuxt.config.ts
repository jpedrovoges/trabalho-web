export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseApiUrl: process.env.BASE_API_URL,
        },
    },

    modules: ['@nuxtjs/tailwindcss'],
})
