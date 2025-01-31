<script setup lang="ts">
const {currentGuild} = useGuildsAPI()
const router = useRouter()
const {breadcrumbs} = useBreadcrumbs()
const {t} = useI18n({
  useScope: 'local'
})

function onBotReset() {

  router.push({
    name: 'bots'
  })

  nextTick(() => {
    currentGuild.value.clear()
  })
}
</script>

<template>
  <DashboardLayout>
    <template #name>Kazkovy Dashboard</template>
    <template #version> v0.1</template>
    <template #slogan>{{ t('slogan') }}</template>

    <template #guilds>
      <Suspense>
        <SidebarGuildChoose/>
        <template #fallback>
          <Skeleton class="w-full h-6 rounded-lg"/>
        </template>
      </Suspense>
    </template>

    <template #top-buttons>
      <LanguageSelect/>
      <ThemeSelect/>
      <BotSelectButton @reset="onBotReset"/>
    </template>

    <template #modules>
      <ModulesList/>
    </template>

    <template #auth>
      <AuthButton/>
    </template>

    <NuxtPage/>

  </DashboardLayout>
</template>

<i18n lang="json">
{
  "en": {
    "slogan": "Craft your super-bot"
  },
  "uk": {
    "slogan": "Побудуйте свого супер-бота"
  }
}
</i18n>
