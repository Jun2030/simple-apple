/**
 * utils变量导入
 * @example import { encrypt, getBrowserLang, LocalStg } from '@/utils'
 * encrypt()
 * const localStg = new LocalStg()
 *
 * utils默认导入
 * @example import * as stg from '@/utils'
 * const forageStg = new stg.ForageStg({})
 */

export * from './browser'
export * from './crypto'
export * from './storage'
export * from './files'
