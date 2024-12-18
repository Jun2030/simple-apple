/**
 * 应用支持的语言环境枚举
 */
enum LocaleEnum {
  // 简体中文
  ZH_CN = 'zh-cn',
  // 英语（美国）
  EN_US = 'en',
}

export default class BrowserUtils {
  /**
   * @description 获取浏览器的语言
   * @returns {string} 浏览器的语言，若浏览器语言为cn、zh、zh-cn之一，则返回zh-cn，否则返回en
   */
  static getBrowserLang() {
    const browserLang = navigator.language.toLowerCase()
    return ['cn', 'zh', 'zh-cn'].includes(browserLang) ? LocaleEnum.ZH_CN : LocaleEnum.EN_US
  }
}

export const { getBrowserLang } = BrowserUtils
