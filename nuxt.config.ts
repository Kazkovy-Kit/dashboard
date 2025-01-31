// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: [
        '@kazkovy-kit/ui',
        '@kazkovy-kit/auth',
        '@kazkovy-kit/modules',
        ["github:Kazkovy-Kit/temporary_voice", {install: true}],
    ],
    modules: ["@prisma/nuxt"],
    devtools: {enabled: true},
    compatibilityDate: '2025-01-29',
    ssr: false,
    prisma: {
        installStudio: false,
    },
})