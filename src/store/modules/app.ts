import { LocaleEnum } from '@/enum'
import i18n from '@/plugins/i18n'
import { piniaPersistConfig } from '@/store/helper'
import { getBrowserLang, localStg } from '@2030/utils'
import { ElLoading } from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    locale: localStg.getItem('locale') ?? getBrowserLang(),
    loadingInstance: null,
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
    SET_LOADING(loading: boolean, loadingText?: string) {
      if (loading) {
        this.loadingInstance = ElLoading.service({
          lock: true,
          fullscreen: true,
          text: loadingText ?? '',
        })
      } else {
        this.loadingInstance?.close()
      }
    },
  },
  persist: piniaPersistConfig('app'),
})

/**
 * 获取应用store，在 setup 外使用
 * @returns 应用store
 */
export function useAppStoreHook() {
  return useAppStore()
}
