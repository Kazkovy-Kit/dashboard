<script setup lang="ts">
import {Bot} from "lucide-vue-next";
import {range} from "@antfu/utils";

const {currentBot} = useBotsApi()
const {currentGuild} = useGuildsAPI()
const router = useRouter()
const {breadcrumbs} = useBreadcrumbs()
const {t} = useI18n({
  useScope: 'local'
})

function resetSelectedBot() {
  currentBot.value.reset()
  router.push({
    name: 'bots'
  })
  nextTick(() => {
    currentGuild.value.clear()
  })
}
</script>

<template>
  <SidebarProvider>

    <Sidebar collapsible="icon" variant="floating" active="a">
      <SidebarHeader>
        <SidebarMenuButton size="lg" as-child>
          <NuxtLink :to="{name: 'index'}">
            <div class="size-6">
              <Logo/>
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">KazkovyKit <small>v0.0.5</small></span>
              <span class="truncate text-xs">Bot Dashboard</span>
            </div>
          </NuxtLink>
        </SidebarMenuButton>
        <SidebarMenu>
          <SidebarMenuItem>
            <Suspense>
              <SidebarGuildChoose/>
              <template #fallback>
                <SidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Skeleton class="w-full h-6 rounded-lg"/>
                </SidebarMenuButton>
              </template>
            </Suspense>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{{ t('modules') }}</SidebarGroupLabel>
          <SidebarMenu>
            <Skeleton
                v-if="currentGuild.status.value === 'pending'"
                v-for="_ in range(5)"
                class="w-full h-8 rounded-lg"
            />
            <template v-else>
              <Alert
                  v-if="!currentGuild.id"
                  variant="info"
                  class="mt-4 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:hidden">
                <AlertTitle>{{ t('alerts.info') }}!</AlertTitle>
                <AlertDescription>{{ t('warning') }}.</AlertDescription>
              </Alert>


              <Suspense :timeout="0" v-else-if="currentGuild.status.value !== 'idle'">
                <ModulesList :key="currentGuild.id"/>
                <template #fallback>
                  <Skeleton
                      v-for="_ in range(5)"
                      class="w-full h-8 rounded-lg"
                  />
                </template>
              </Suspense>
            </template>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AuthButton/>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>

    <SidebarInset>
      <header
          class="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1"/>
          <Separator orientation="vertical" class="mr-2 h-4"/>
          <Breadcrumb>
            <BreadcrumbList>
              <template v-for="(breadcrumb, index) in breadcrumbs">

                <BreadcrumbItem class="hidden md:block">

                  <BreadcrumbPage v-if="index === breadcrumbs.length - 1">
                    {{ breadcrumb.title }}
                  </BreadcrumbPage>

                  <BreadcrumbLink v-else-if="breadcrumb.to" as-child>
                    <NuxtLink :to="breadcrumb.to">
                      {{ breadcrumb.title }}
                    </NuxtLink>
                  </BreadcrumbLink>

                  <BreadcrumbLink v-else href="#">
                    {{ breadcrumb.title }}
                  </BreadcrumbLink>

                </BreadcrumbItem>

                <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1"/>
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="absolute right-0 mr-4 mt-2 flex gap-2">
          <LanguageSelect/>
          <ThemeSelect/>
          <Button variant="outline" class="" @click="resetSelectedBot">
            <Bot class="h-[1.2rem] w-[1.2rem]"/>
            <span class="sr-only">Обрати бота</span>
          </Button>
        </div>
      </header>
      <div class="container">
        <Card class="p-4 mt-2 min-h-[90vh] relative">
          <slot/>
        </Card>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<i18n lang="json">
{
  "en": {
    "modules": "Modules",
    "warning": "To see all available modules, first select a guild from top list"
  },
  "uk": {
    "modules": "Модулі",
    "warning": "Для того щоб переглянути доступні модулі, спочатку оберіть сервер зі списку зверху"
  }
}
</i18n>
