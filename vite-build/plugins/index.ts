import type { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import html from './html'
import unplugin from './unplugin'
import compress from './compress'

export function createPlugins(viteEnv: ViteEnv, isBuild: boolean): (PluginOption | PluginOption[])[] {
  const plugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    VueJsx(),
    !isBuild && VueDevTools(),
    html(viteEnv, isBuild),
    ...unplugin,
    Unocss(),
    ...compress(viteEnv),
  ]
  return plugins
}
