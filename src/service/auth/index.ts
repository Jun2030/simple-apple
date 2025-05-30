import { StoreConfig } from '@/config'
import { StorageKeyEnum } from '@/enum'
import { useUserStoreHook } from '@/store/modules/user'
import { localStg, sessionStg } from '@2030/utils'

/**
 * 设置用户令牌
 * @param token 用户令牌字符串
 */
export function setToken(token: string): void {
  const { autoLogin } = useUserStoreHook()
  if (autoLogin) {
    localStg.setItem(StorageKeyEnum.USER_TOKEN, token, StoreConfig.DEFAULT_TOKEN_EXPIRE)
    sessionStg.removeItem(StorageKeyEnum.USER_TOKEN)
  } else {
    sessionStg.setItem(StorageKeyEnum.USER_TOKEN, token)
    localStg.removeItem(StorageKeyEnum.USER_TOKEN)
  }
}

/**
 * 获取用户令牌
 * @returns 用户令牌字符串,如果不存在则返回空字符串
 */
export function getToken(): string {
  const localToken = localStg.getItem<string>(StorageKeyEnum.USER_TOKEN)
  if (localToken)
    return localToken
  const sessionToken = sessionStg.getItem<string>(StorageKeyEnum.USER_TOKEN)
  return sessionToken || ''
}

/**
 * 删除用户令牌
 */
export function removeToken(): void {
  localStg.removeItem(StorageKeyEnum.USER_TOKEN)
  sessionStg.removeItem(StorageKeyEnum.USER_TOKEN)
}

/**
 * 设置用户信息
 * @param userInfo 用户信息对象
 */
export function setUserInfo(userInfo: Auth.UserInfo): void {
  localStg.setItem(StorageKeyEnum.USER_INFO, userInfo)
}

/**
 * 获取用户信息
 * @returns 用户信息对象,如果不存在则返回默认用户信息
 */
export function getUserInfo(): Auth.UserInfo {
  return localStg.getItem<Auth.UserInfo>(StorageKeyEnum.USER_INFO) || ({} as Auth.UserInfo)
}

/**
 * 删除用户信息
 */
export function removeUserInfo(): void {
  localStg.removeItem(StorageKeyEnum.USER_INFO)
}

/**
 * 清空所有用户相关的本地存储
 */
export function clearAuthStorage(): void {
  removeToken()
  removeUserInfo()
}

/**
 * 获取令牌前缀
 * @param tokenKey 令牌键名
 * @returns 令牌前缀字符串
 */
export function getTokenPrefix(tokenKey: string): string {
  let prefix = ''
  switch (tokenKey) {
    case 'Authorization':
      prefix = 'Bearer'
      break
    default:
      break
  }
  return prefix
}
