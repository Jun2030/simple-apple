export interface LoginRequestData {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 其它参数 */
  [key: string]: unknown
}

export type LoginCodeResData = ResData<string>

export type LoginResData = ResData<{
  accessToken: string
  expiresTime: number
  refreshToken: string
  userId: number
}>

export type UserInfoResData = ResData<{ username: string, roles: string[] }>
