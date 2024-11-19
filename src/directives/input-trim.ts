/**
 * 输入框失焦去除空格
 * 当inputTrim === TrimTypeEnum.NONE时，不执行失焦事件
 * 当inputTrim === TrimTypeEnum.TRIM时，执行去除前后空格(默认)
 * 当inputTrim === TrimTypeEnum.ALL时，执行去除所有空格
 * @example
 * <el-input v-trim />
 * <el-input v-trim="TrimTypeEnum.TRIM" />
 */
import type { Directive, DirectiveBinding } from 'vue'
import { TrimTypeEnum } from '@/enum'

interface ExtendedHTMLElement extends HTMLElement {
  _trimValue?: () => void
}

const vTrim: Directive = {
  mounted(el: ExtendedHTMLElement, binding: DirectiveBinding) {
    const trimType = binding.value || TrimTypeEnum.ALL
    if (trimType === TrimTypeEnum.NONE)
      return
    const inputEl = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea')
    if (!inputEl)
      return

    const trimValue = () => {
      const value = (inputEl as HTMLInputElement | HTMLTextAreaElement).value
      const trimmedValue = trimType === TrimTypeEnum.ALL ? value.replace(/\s+/g, '') : value.trim()
      if (value !== trimmedValue) {
        (inputEl as HTMLInputElement | HTMLTextAreaElement).value = trimmedValue
        inputEl.dispatchEvent(new Event('input'))
      }
    }

    inputEl.addEventListener('blur', trimValue)

    // 将事件处理函数存储在元素上，以便在 unmounted 中访问
    el._trimValue = trimValue
  },
  unmounted(el: ExtendedHTMLElement) {
    const inputEl = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? el : el.querySelector('input, textarea')
    if (inputEl && el._trimValue) {
      inputEl.removeEventListener('blur', el._trimValue)
      // 触发 input 事件
      inputEl.dispatchEvent(new Event('input'))
    }
  },
}

export default vTrim
