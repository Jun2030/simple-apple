import jun from '@2030/eslint-config'

export default jun({
  vue: true,
  typescript: true,
  formatters: true,
  ignores: ['**/dist/**', '**/node_modules/**'],
})
