import type { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import compress from './compress'
import html from './html'
import unplugin from './unplugin'

export function createPlugins(viteEnv: ViteEnv, isBuild: boolean): (PluginOption | PluginOption[])[] {
  const plugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    VueJsx(),
    !isBuild && viteEnv.VITE_DEVTOOLS && VueDevTools(),
    html(viteEnv, isBuild),
    ...unplugin,
    Unocss(),
    ...compress(viteEnv),
  ]
  return plugins
}
