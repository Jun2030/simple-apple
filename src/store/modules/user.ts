import { removeToken, setToken } from '@/service/auth'
import { piniaPersistConfig } from '@/store/helper'

export interface UserState {
  loginUsePassword: (params: { username: string, password: string }) => Promise<void>
  loginUsePhone: (params: { mobile: string, captchaCode: string }) => Promise<void>
  logout: () => Promise<void>
  autoLogin: Ref<boolean>
  setAutoLogin: (value: boolean) => void
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const route = useRoute()
  const { btnLoading } = useAppStore()

  const handleAfterLogin = async (loginRes: Recordable<string>) => {
    try {
      await setToken(loginRes.accessToken)
      router.replace({ path: route.query.redirect as string || '/' })
    } finally {
      btnLoading.value = false
    }
  }

  /**
   * 账号密码登录
   */
  const loginUsePassword = async (_data: string) => {
    try {
      const loginRes = { token: '123' }
      handleAfterLogin(loginRes)
    } catch {
      btnLoading.value = false
    }
  }

  /**
   * 手机号登录
   */
  const loginUsePhone = async (_data: string) => {
    try {
      const loginRes = { token: '123' }
      handleAfterLogin(loginRes)
    } catch {
      btnLoading.value = false
    }
  }

  /**
   * 设置自动登录
   * @param value 是否自动登录
   */
  const autoLogin = ref(false)
  const setAutoLogin = (value: boolean) => {
    autoLogin.value = value
  }

  /**
   * 登出
   */
  const logout = async () => {
    await removeToken()
    await localStorage.removeItem('user')
    router.replace({ name: 'Login' })
  }

  return { loginUsePassword, loginUsePhone, logout, setAutoLogin, autoLogin }
}, { persist: piniaPersistConfig('user') })

/**
 * 获取用户store，在 setup 外使用
 * @returns 用户store
 */
export function useUserStoreHook() {
  return useUserStore()
}
