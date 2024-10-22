import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { pathResolve } from '../index'

export default [
  AutoImport({
    imports: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core', '@vueuse/head'],
    dirs: [pathResolve('src/**/hooks'), pathResolve('src/store/modules'), pathResolve('src/**/composables')],
    dts: 'src/auto-imports.d.ts',
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
    eslintrc: { enabled: true, globalsPropValue: true },
    vueTemplate: true,
  }),
  Icons({
    autoInstall: true,
    compiler: 'vue3',
    customCollections: {
      svg: FileSystemIconLoader('./src/assets/icons', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
    },
  }),
  Components({
    dts: true,
    resolvers: [
      IconsResolver({ enabledCollections: ['ep', 'svg'] }),
      ElementPlusResolver(),
      VueUseComponentsResolver(),
    ],
  }),
  VueI18nPlugin({
    runtimeOnly: true,
    compositionOnly: true,
    fullInstall: true,
    include: [pathResolve('src/locales/**')],
  }),
]
