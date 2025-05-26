import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: true,
  unocss: true,
  rules: {
    // 禁止使用尾随逗号
    // 'style/comma-dangle': [2, 'never'],
    // 允许使用consoles
    // 'no-console': 0,
    // 允许顶层使用箭头函数
    // 'jun/top-level-function': ['off'],
    'antfu/if-newline': 'error',
  },
  ignores: ['**/dist/**', '**/node_modules/**', '**/.vitepress/**'],
})
