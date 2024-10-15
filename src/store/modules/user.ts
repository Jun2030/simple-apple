import { getToken } from '@/service/auth'
import { piniaPersistConfig } from '@/store/helper'

export const useUserStore = defineStore('user', () => {
  // Token
  const token = ref<string>(getToken() || '')

  // TODO: 登录
  const login = async () => {
    token.value = '123'
  }

  // TODO: 登出
  const logout = async () => {
    token.value = ''
  }

  return { token, login, logout }
}, { persist: piniaPersistConfig('user') })

/**
 * 获取用户store，在 setup 外使用
 * @returns 用户store
 */
export function useUserStoreHook() {
  return useUserStore()
}
