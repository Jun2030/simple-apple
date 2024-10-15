import { StorageKeyEnum } from '@/enum'
import { localStg } from '@2030/utils'

const { setItem, getItem, removeItem } = localStg

/**
 * 设置用户令牌
 * @param token 用户令牌字符串
 */
export function setToken(token: string): void {
  setItem(StorageKeyEnum.USER_TOKEN, token)
}

/**
 * 获取用户令牌
 * @returns 用户令牌字符串,如果不存在则返回空字符串
 */
export function getToken(): string {
  return getItem<string>(StorageKeyEnum.USER_TOKEN) || ''
}

/**
 * 删除用户令牌
 */
export function removeToken(): void {
  removeItem(StorageKeyEnum.USER_TOKEN)
}

/**
 * 设置用户信息
 * @param userInfo 用户信息对象
 */
export function setUserInfo(userInfo: Auth.UserInfo): void {
  setItem(StorageKeyEnum.USER_INFO, userInfo)
}

/**
 * 获取用户信息
 * @returns 用户信息对象,如果不存在则返回默认用户信息
 */
export function getUserInfo(): Auth.UserInfo {
  return getItem<Auth.UserInfo>(StorageKeyEnum.USER_INFO) || ({} as Auth.UserInfo)
}

/**
 * 删除用户信息
 */
export function removeUserInfo(): void {
  removeItem(StorageKeyEnum.USER_INFO)
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
      prefix = 'Bearer '
      break
    default:
      break
  }
  return prefix
}
