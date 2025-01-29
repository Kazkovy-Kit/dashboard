// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: [
        ['github:Kazkovy-Kit/ui', {install: true}],
        ['github:Kazkovy-Kit/auth', {install: true}],
        ['github:Kazkovy-Kit/modules', {install: true}],
    ],
    modules: ["@prisma/nuxt"],
    ssr: false,
    devtools: {enabled: true},
    compatibilityDate: "2025-01-28",
    prisma: {
        installStudio: false,
    },
})