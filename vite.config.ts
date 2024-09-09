import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { __APP_INFO__, convertEnv, createPlugins, envDir, envPrefix, manualChunks, pathResolve } from './vite-build'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild: boolean = command === 'build'
  const viteEnv: ViteEnv = convertEnv(loadEnv(mode, envDir, envPrefix))
  const { V_BASE_URL } = viteEnv

  /* Vite具体配置  */
  return {
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.vue', '.json', 'css', '.scss', '.yaml'],
      alias: {
        '@': pathResolve('./src'),
        '~': pathResolve('./'),
      },
    },
    base: V_BASE_URL,
    envDir,
    envPrefix,
    clearScreen: false,
    esbuild: { pure: viteEnv.V_DROP_CONSOLE ? ['console.log', 'debugger'] : [] },
    build: {
      sourcemap: !isBuild,
      minify: 'esbuild',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks,
        },
      },
    },
    plugins: createPlugins(viteEnv, isBuild),
  }
})
