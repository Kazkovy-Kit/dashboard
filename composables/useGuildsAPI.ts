export type GuildInfo = {
    id: number,
    logo: string,
    name: string,
}

export const useGuildsAPI = function () {
    const guilds = useAsyncData<GuildInfo[]>('guilds', () => $fetch('/api/guilds'), {immediate: false})
    const currentGuildId = useCookie<number | undefined>("selected:guild")
    const currentGuild = useAsyncData<GuildInfo | null>('guild', () => currentGuildId.value ? $fetch('/api/guild') : Promise.resolve(null), {
        dedupe: 'defer',
        deep: false,
        watch: [currentGuildId],
    });

    return {
        guilds: {
            data: guilds.data,
            status: guilds.status,
            fetch: guilds.execute
        },
        currentGuild: computed(() => ({
            ...currentGuild.data.value,
            status: currentGuild.status,
            fetch: currentGuild.execute,
            select: (id: number) => {
                currentGuildId.value = id
            },
            clear: () => {
                currentGuildId.value = undefined
            }
        }))
    }
}