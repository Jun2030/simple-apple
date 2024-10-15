import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  /** 预设 */
  presets: [
    // 默认预设
    // @example: <div class="bg-red-500 text-white">Hello World</div>
    presetUno(),
    // 属性化模式
    // @example: <div bg-red-500 text-white>Hello World</div>
    presetAttributify(),
  ],
  /** 内容 */
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', 'public', 'build', 'uno.config.ts'],
    },
  },
  /** 自定义规则 */
  rules: [
    // @example: 将 padding-15 转换为 padding: 15px
    ['padding-15', { padding: '15px' }],
  ],
  /** 自定义快捷方式 */
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
})
