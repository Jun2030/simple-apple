import { AppConfig } from '@/config'
import { getBrowserLang, getDirContent } from '@2030/utils'
import enEl from 'element-plus/es/locale/lang/en'
import zhCnEl from 'element-plus/es/locale/lang/zh-cn'
import { createI18n } from 'vue-i18n'
import enVxe from 'vxe-table/es/locale/lang/en-US'
import zhCnVxe from 'vxe-table/es/locale/lang/zh-CN'

// 自定义的语言配置
const zhCnLocale = getDirContent(import.meta.glob(`@/locales/zh-cn/*.yaml`, { eager: true, import: 'default' }))
const enLocale = getDirContent(import.meta.glob(`@/locales/en/*.yaml`, { eager: true, import: 'default' }))

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLang(),
  fallbackLocale: AppConfig.DEFAULT_LOCAL,
  globalInjection: true,
  messages: {
    [zhCnEl.name]: {
      ...zhCnEl,
      ...zhCnVxe,
      ...zhCnLocale,
    },
    [enEl.name]: {
      ...enEl,
      ...enVxe,
      ...enLocale,
    },
  },
})

export const $t = i18n.global.t
export default i18n
