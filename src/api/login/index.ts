import type * as Login from './types'
import request from '@/service/axios'

/** 获取登录验证码 */
export function getLoginCode() {
  return request.get<Login.LoginCodeResData>({
    url: 'login/code',
  })
}

/** 登录并返回 Token */
export function login(data: Login.LoginRequestData) {
  return request.post<Login.LoginResData>({
    url: '/system/auth/login',
    data,
  })
}

export function login2(data: Login.LoginRequestData) {
  return request.post<ResData<Login.LoginResData>>({
    url: '/system/auth/login',
    data,
  }, {
    reduceResponse: false,
    ignoreEmptyParams: true,
    hidePreLoading: true,
    hidePostLoading: true,
  })
}

export function login3(data: Login.LoginRequestData) {
  return request.post<ResData<Login.LoginResData>>({
    url: '/system/auth/login',
    data,
  }, {
    retry: 2,
  })
}

/** 获取用户详情 */
export function getUserInfo() {
  return request.get<Login.UserInfoResData>({
    url: 'users/info',
  })
}
