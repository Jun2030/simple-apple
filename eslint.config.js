import jun from '@2030/eslint-config'

export default jun({
  vue: true,
  typescript: true,
  formatters: true,
  unocss: true,
  rules: {
    // 禁止使用尾随逗号
    // 'style/comma-dangle': [2, 'never'],
    // 允许使用consoles
    'no-console': 0,
  },
  ignores: ['**/dist/**', '**/node_modules/**'],
})
