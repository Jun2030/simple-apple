import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { pathResolve } from '../index'

export default [
  Vue(),
  VueJsx(),
  AutoImport({
    imports: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core', '@vueuse/head'],
    dirs: [pathResolve('src/**/hooks'), pathResolve('src/store/modules'), pathResolve('src/**/composables')],
    dts: 'src/auto-imports.d.ts',
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
    eslintrc: { enabled: true },
  }),
  Components({
    dts: true,
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
  }),
  VueI18nPlugin({
    runtimeOnly: true,
    compositionOnly: true,
    fullInstall: true,
    include: [pathResolve('src/locales/**')],
  }),
]
