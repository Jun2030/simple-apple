import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  /** 预设 */
  presets: [
    // 默认预设
    // @example: <div class="bg-red-500 text-white">Hello World</div>
    presetUno(),
    // 属性化模式
    // @example: <div bg-red-500 text-white>Hello World</div>
    // @example: <div bg="red-500" text="white">Hello World</div>
    presetAttributify(),
  ],
  /** 主题 */
  theme: {
    colors: {
      sa: {
        primary: {
          default: '#1890ff',
          light: '#40a9ff',
          dark: '#001529',
        },
        text: {
          default: '#333333',
          light: '#666666',
          lighter: '#999999',
        },
        bg: {
          default: '#f0f2f5',
          deep: '#f7f7f7',
          dark: '#263238',
          darker: '#031524',
        },
        border: {
          default: '#e4e7ed',
        },
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d',
      },
    },
  },
  /** 定义全局css变量 */
  preflights: [
    {
      getCSS: ({ theme }: { theme: any }) => `
        :root {
          /* 覆盖element-plus默认样式 */
          --el-color-primary: ${theme.colors.sa.primary.default};
          --el-color-success: ${theme.colors.sa.success};
          --el-color-warning: ${theme.colors.sa.warning};
          --el-color-error: ${theme.colors.sa.error};
          --el-color-border: ${theme.colors.sa.border.default};
          --el-text-color-regular: ${theme.colors.sa.text.default};

          /* 添加文本颜色变量 */
          --sa-primary-default: ${theme.colors.sa.primary};
          --sa-primary-light: ${theme.colors.sa.primary.light};
          --sa-primary-dark: ${theme.colors.sa.primary.dark};
          --sa-text-default: ${theme.colors.sa.text.default};
          --sa-text-light: ${theme.colors.sa.text.light};
          --sa-text-lighter: ${theme.colors.sa.text.lighter};
          --sa-bg-default: ${theme.colors.sa.bg.default};
          --sa-bg-deep: ${theme.colors.sa.bg.deep};
          --sa-bg-dark: ${theme.colors.sa.bg.dark};
          --sa-bg-darker: ${theme.colors.sa.bg.darker};
          --sa-border-default: ${theme.colors.sa.border.default};
          --sa-success: ${theme.colors.sa.success};
          --sa-warning: ${theme.colors.sa.warning};
          --sa-error: ${theme.colors.sa.error};
        }
      `,
    },
  ],
  /** 内容 */
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', 'public', 'build', 'uno.config.ts'],
    },
  },
  /** 自定义规则 */
  rules: [
    // 添加 wh-[xxx] 支持
    [/^wh-\[(.+)\]$/, ([, d]) => ({ width: d, height: d })],
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
  /** 自动完成 */
  autocomplete: {
    templates: [
      // 文本颜色提示
      'text-sa-<sa-color>',
      // 背景色提示
      'bg-sa-<sa-color>',
      // 边框颜色提示
      'border-sa-<sa-color>',
    ],
    shorthands: {
      'sa-color': '(primary-default|primary-light|primary-dark|text-default|text-light|text-lighter|bg-default|bg-deep|bg-dark|bg-darker|border-default|success|warning|error)',
    },
  },
})
