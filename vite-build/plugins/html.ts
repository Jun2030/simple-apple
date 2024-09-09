import { createHtmlPlugin } from 'vite-plugin-html'
import type { PluginOption } from 'vite'
import pkg from '../../package.json'

export default (viteEnv: ViteEnv, isBuild: boolean): PluginOption[] => {
  const { VITE_APP_NAME, VITE_APP_DESC, VITE_BASE_URL } = viteEnv
  const PATH: string = VITE_BASE_URL.endsWith('/') ? VITE_BASE_URL : `${VITE_BASE_URL}/`
  const GLOBAL_JS = `${PATH || '/'}_global.js?v=${pkg.version}-${Date.now()}`

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        appName: VITE_APP_NAME,
        appDesc: VITE_APP_DESC,
        injectScript: `<script src="${GLOBAL_JS}"></script>`,
        loadingScript: !isBuild && `
          <div class="loading-container">
            <div class="loading-drop"></div>
            <div class="loading-drop"></div>
            <div class="loading-drop"></div>
            <div class="loading-collection"></div>
            <div class="loading-text">
              ${VITE_APP_NAME}
            </div>
          </div>
        `,
      },
    },
  })
}
