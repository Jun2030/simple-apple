import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { piniaPersistConfig } from '@/store/helper'
import localStg from '@/utils/storage/local'
import i18n from '@/plugins/i18n'
import { LocaleEnum } from '@/enum'
import { getBrowserLang } from '@/utils'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    locale: localStg.getItem('locale') ?? getBrowserLang(),
  }),
  getters: {
    getLocale: (state) => {
      return state.locale === LocaleEnum.ZH_CN ? zhCn : en
    },
  },
  actions: {
    SET_APPS_STATE(key: keyof AppState, value: AppState[keyof AppState]) {
      this.$patch((state) => {
        state[key] = value
      })
    },
    SET_LOCALE(locale: LocaleEnum) {
      this.locale = locale
      localStg.setItem('locale', locale)
      i18n.global.locale.value = locale
    },
  },
  persist: piniaPersistConfig('app'),
})
