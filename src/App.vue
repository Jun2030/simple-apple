<script setup lang="ts">
import { AppConfig } from '@/config'

defineOptions({ name: 'App' })

const appStore = useAppStore()
</script>

<template>
  <el-config-provider :locale="appStore.getLocale">
    <router-view v-slot="{ Component, route }">
      <keep-alive :max="AppConfig.KEEP_ALIVE_MAX">
        <component :is="Component" v-if="$route.meta.isKeepAlive" :key="route" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.isKeepAlive" :key="route" />
    </router-view>
  </el-config-provider>
</template>
