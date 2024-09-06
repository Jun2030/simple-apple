import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import { StoreConfig } from '@/config'

const { DEFAULT_PERSIST_STORE } = StoreConfig

/**
 * @description 定义持久化配置
 * @param key - 存储的键名
 * @returns 返回一个包含键名、存储方式和路径列表的PersistedStateOptions对象
 */
function piniaPersistConfig(key: string): PersistenceOptions {
  return {
    key,
    storage: DEFAULT_PERSIST_STORE,
  }
}

export { piniaPersistConfig }
