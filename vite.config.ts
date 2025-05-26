import type { ConfigEnv, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'
import { __APP_INFO__, convertEnv, createPlugins, envDir, manualChunks, OPTIMIZE_DEPS, pathResolve } from './vite-build'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild: boolean = command === 'build'
  const viteEnv: ViteEnv = convertEnv(loadEnv(mode, envDir))
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = viteEnv

  /* Vite具体配置  */
  return {
    /** 定义全局常量 */
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    /** 配置路径别名 */
    resolve: {
      alias: {
        '@': pathResolve('./src'),
        '~': pathResolve('./'),
      },
    },
    /** 配置基础路径 */
    base: VITE_BASE_URL,
    /** 配置环境变量目录 */
    envDir,
    /** 配置是否清除屏幕 */
    clearScreen: false,
    /** 配置是否删除console */
    esbuild: {
      /** 配置删除console */
      pure: VITE_DROP_CONSOLE ? ['console.log'] : [],
      /** 打包删除debugger */
      drop: ['debugger'],
      /** 打包删除所有注释 */
      legalComments: 'none',
    },
    /** 配置开发服务器 */
    server: {
      port: 3456,
      open: false,
      /** 预热常用文件，提升热更新速度 */
      warmup: {
        clientFiles: ['./src/layout/**/*.vue'],
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    /** 配置打包 */
    build: {
      sourcemap: !isBuild,
      minify: 'esbuild',
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks,
        },
      },
    },
    /** 配置插件 */
    plugins: createPlugins(viteEnv, isBuild),
    /** 配置预构建依赖 */
    optimizeDeps: OPTIMIZE_DEPS,
  }
}
