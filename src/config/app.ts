import { LocaleEnum } from '@/enum'

const { VITE_APP_NAME } = import.meta.env

export class AppConfig {
  // ElementPlus全局按钮配置
  static GLOBAL_CONFIG_BUTTON = {
    autoInsertSpace: true,
  }

  // 默认语言
  static DEFAULT_LOCAL = LocaleEnum.ZH_CN

  // KeepAlive组件缓存最大数量
  static KEEP_ALIVE_MAX = 5

  // 默认项目名
  static DEFAULT_APP_NAME = VITE_APP_NAME || 'Simple Apple'
}
