<script lang="ts" setup>
import {ChevronsUpDown, Plus} from "lucide-vue-next";
import {range} from "@antfu/utils";

const {currentBot} = useBotsApi()
const {currentGuild, guilds} = useGuildsAPI()
const {t} = useI18n({
  useScope: 'local'
})

const notSelectedGuilds = computed(() => guilds.data.value?.filter(guild => currentGuild.value ? guild.id !== currentGuild.value.id : true) ?? [])

async function onOpen(v: boolean) {
  if (v) {
    await guilds.fetch()
  }
}

async function onSelect(guildId: number) {
  currentGuild.value.select(guildId)
}

async function openInstall() {
  window.open(
      `https://discord.com/api/oauth2/authorize?client_id=${currentBot.data.value.discord_id}&permissions=281600&scope=bot%20applications.commands`,
      "_blank",
  );
}
</script>

<template>
  <DropdownMenu @update:open="onOpen">

    <DropdownMenuTrigger as-child>
      <SidebarMenuButton size="lg"
                         class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:mt-2"
      >
        <div
            class="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:ml-1">
          <Avatar class="h-6 w-6 rounded-lg">
            <AvatarImage
                v-if="currentGuild"
                :src="currentGuild.logo ?? ''"
                :alt="currentGuild.name"
            />
          </Avatar>
        </div>

        <div class="grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold">{{ currentGuild?.name ?? t('choose_server') }}</span>
        </div>

        <ChevronsUpDown class="ml-auto"/>

      </SidebarMenuButton>
    </DropdownMenuTrigger>


    <DropdownMenuContent
        class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side="bottom"
        :side-offset="4"
    >
      <DropdownMenuLabel class="text-xs text-muted-foreground">
        {{ t('servers') }}
      </DropdownMenuLabel>

      <Alert v-if="guilds.status.value === 'error'" variant="destructive"
             class="my-2 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:hidden">
        <AlertTitle>{{ t('alerts.error') }}.</AlertTitle>
        <AlertDescription>
          {{ t('error') }}.
        </AlertDescription>
      </Alert>

      <DropdownMenuItem
          v-if="guilds.status.value === 'pending'"
          v-for="(_, index) in range(3)"
          :key="index"
          class="gap-2 p-2"
      >
        <div class="flex size-6 items-center justify-center rounded-sm">
          <Skeleton class="size-6 rounded-lg"/>
        </div>
        <Skeleton class="w-full h-6 rounded-lg"/>
      </DropdownMenuItem>


      <DropdownMenuItem
          v-else-if="notSelectedGuilds.length"
          v-for="guild in notSelectedGuilds"
          :key="guild.name"
          class="gap-2 p-2 hover:cursor-pointer"
          @click="onSelect(guild.id)"
      >
        <div
            class="flex size-6 items-center justify-center rounded-sm border"
        >
          <Avatar class="h-6 w-6 rounded-lg">
            <AvatarImage :src="guild.logo" :alt="guild.name"/>
          </Avatar>
        </div>
        {{ guild.name }}
      </DropdownMenuItem>

      <DropdownMenuItem v-else disabled>
        {{ t("all_guilds_selected") }}
      </DropdownMenuItem>

      <DropdownMenuSeparator/>

      <DropdownMenuItem class="gap-2 p-2" @click="openInstall">
        <div
            class="flex size-6 items-center justify-center rounded-md border bg-background"
        >
          <Plus class="size-4"/>
        </div>
        <div
            class="font-medium text-muted-foreground hover:cursor-pointer"
        >
          {{ t('add_to_server') }}
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>


<i18n lang="json">
{
  "en": {
    "error": "There was a problem getting info about guilds",
    "servers": "Guilds",
    "add_to_server": "Add to guild",
    "choose_server": "Please choose a guild",
    "all_guilds_selected": "All available guilds selected"
  },
  "uk": {
    "error": "Ми не змогли отримати інформацію про сервери на яких встановлений бот",
    "servers": "Сервери",
    "add_to_server": "Додати на сервер",
    "choose_server": "Будь ласка оберіть сервер",
    "all_guilds_selected": "Усі доступні сервери обрані"
  }
}
</i18n>