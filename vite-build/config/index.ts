import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { pathResolve } from '../index'
import pkg from '../../package.json'

/** env 路径 */
export const envDir: string = pathResolve('vite-build/env')

/** 获取 build 时间 */
export function getBuildTime() {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  return dayjs.tz(Date.now(), 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
}

/** App信息 */
export const { dependencies, devDependencies, name, version } = pkg
export const __APP_INFO__ = {
  appName: name,
  appVersion: version,
  buildTime: getBuildTime,
}

/** Chunk 拆包名 */
export const VENDOR_LIBS: { match: string[], output: string }[] = [
  {
    match: ['element-plus', '@element-plus/icons-vue'],
    output: 'element-plus',
  },
  {
    match: ['@vue', 'vue', 'pinia', 'vue-router', 'vue-i18n', '@vueuse/core'],
    output: 'vue',
  },
  {
    match: ['axios'],
    output: 'axios',
  },
  {
    match: ['lodash-es', 'crypto-js', 'xlsx'],
    output: 'utils',
  },
  {
    match: ['vxe-table', 'xe-utils'],
    output: 'vxe',
  },
]

/** 手动拆包优化配置 */
export function manualChunks(id: string): string | undefined {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = VENDOR_LIBS.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'gi')
      return reg.test(id)
    })
    return matchItem ? matchItem.output : 'vendors'
  }
}
