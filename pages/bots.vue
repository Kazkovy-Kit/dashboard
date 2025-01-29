<script setup lang="ts">
import {LoaderCircleIcon, PlusIcon, PowerOffIcon} from "lucide-vue-next";

definePageMeta({
  middleware: ['auth', 'not-selected-bot']
})

const {bots, currentBot} = useBotsApi()
await bots.value.fetch()
const loading = ref(false)
const router = useRouter()
const {t} = useI18n({
  useScope: 'local'
})

const submitSelection = (id: number) => {
  currentBot.value.select(id);
  loading.value = true;
  router.push({
    name: 'index'
  })
};
</script>

<template>
  <div
      class="min-h-screen bg-background flex flex-col items-center justify-center p-4"
  >
    <div class="w-full max-w-4xl">
      <h1 class="text-3xl font-bold text-foreground mb-2 text-center">
        {{ t('welcome') }}
      </h1>
      <p class="text-xl text-muted-foreground mb-8 text-center">
        {{ t('description') }}.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button
            :disabled="loading || !bot.online"
            :class="{'hover:cursor-not-allowed': !bot.online}"
            v-for="(bot, index) in bots.data"
            :key="bot.id"
            @click="submitSelection(bot.id)"
            class="relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300"
        >
          <LoaderCircleIcon
              class="absolute z-20 inset-0 h-2/4 animate-spin self-center w-full object-cover text-gray-300 border-gray-700"
              v-if="loading"/>
          <img
              :src="bot.icon"
              :alt="bot.name"
              class="absolute inset-0 h-full w-full object-cover"
              :class="{'opacity-15': loading}"
          />

          <div v-if="!bot.online" class="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-primary-foreground/90 text-primary">
            <PowerOffIcon class="w-24 h-24"/>
            <span class="text-4xl">{{ t('offline') }}</span>
          </div>
          <div
              class="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-between"
              :class="{'opacity-15': loading}"
          >
            <div class="flex justify-between items-start">
              <h3 class="text-white text-xl font-semibold">
                {{ bot.name }}
              </h3>
            </div>
          </div>
        </button>

        <!-- Custom Bot Request Block -->
        <button
            disabled
            class="relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 bg-primary/10 hover:bg-primary/20 hover:cursor-not-allowed"
        >
          <div
              class="absolute inset-0 p-4 flex flex-col items-center justify-center opacity-15"
          >
            <PlusIcon class="h-12 w-12 text-primary mb-2"/>
            <h3
                class="text-primary text-xl font-semibold text-center"
            >
              {{ t('add_own_bot') }}
            </h3>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "welcome": "Welcome",
    "description": "Please choose your bot, or add a new one",
    "add_own_bot": "Add your own bot",
    "offline": "Offline"
  },
  "uk": {
    "welcome": "Вітаємо",
    "description": "Будь ласка оберіть бота або створіть свого",
    "add_own_bot": "Додайте власного бота",
    "offline": "Виключений"
  }
}
</i18n>