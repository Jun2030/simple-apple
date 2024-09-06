import type { PluginOption } from 'vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import html from './html'
import unplugin from './unplugin'
import compress from './compress'

export function createPlugins(viteEnv: ViteEnv, isBuild: boolean): (PluginOption | PluginOption[])[] {
  const plugins: (PluginOption | PluginOption[])[] = [
    !isBuild && VueDevTools(),
    html(viteEnv, isBuild),
    Unocss(),
    ...unplugin,
    ...compress(viteEnv),
  ]
  return plugins
}
