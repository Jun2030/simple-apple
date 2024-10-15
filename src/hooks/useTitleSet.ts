import { AppConfig } from '@/config'

/**
 * 获取应用名称,优先使用环境变量中的配置,否则使用默认值
 */
const VITE_APP_TITLE = import.meta.env.VITE_APP_NAME ?? AppConfig.DEFAULT_APP_NAME

/**
 * 动态标题
 */
const dynamicTitle = ref<string>('')

/**
 * 设置页面标题
 * @param title 可选的子标题
 */
function setTitle(title?: string) {
  dynamicTitle.value = title ? `${VITE_APP_TITLE} | ${title}` : VITE_APP_TITLE
}

/**
 * 监听动态标题的变化,并更新文档标题
 */
watch(dynamicTitle, (value, oldValue) => {
  if (document && value !== oldValue) {
    document.title = value
  }
})

export function useTitleSet() {
  return { setTitle }
}
