import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { defaultAxiosConfig, defaultExtraConfig } from '@/config'
import { RequestEnum } from '@/enum'
import { Axios } from './axios'
import { businessCodeMap } from './error'

const { baseURL, headers, timeout } = defaultAxiosConfig()

/**
 * 内部请求方法，并默认设置，一般不对外暴露
 * 如果有需要，可自行创建实例
 */
const fetchAxios = new Axios({
  baseURL,
  headers: headers as AxiosRequestHeaders,
  timeout,
  withCredentials: false,
  extraConfig: defaultExtraConfig(businessCodeMap),
})

/**
 * 对外暴露的请求方法-基于fetchAxios实例
 * @example
 * ```typescript
 * import { request } from '@/service/axios'
 *
 * function loginApi(data: Login.LoginRequestData) {
    return request<Login.LoginResData>({
      url: 'users/login',
      method: 'post',
      data,
    })
 * }
 * ```
 */
export const request = fetchAxios.request

/**
 * 对外暴露的单独的请求方法-基于fetchAxios实例
 * @example
 * ```typescript
 * import request from '@/service/axios'
 *
 * function getLoginCodeApi() {
    return request.get<Login.LoginCodeResData>({
      url: 'login/code',
    })
 * }
 * ```
 */
export default {
  get: <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig) => fetchAxios.request<T>(
    { ...config, method: RequestEnum.GET },
    extraConfig,
  ),

  post: <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig) => fetchAxios.request<T>(
    { ...config, method: RequestEnum.POST },
    extraConfig,
  ),

  delete: <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig) => fetchAxios.request<T>(
    { ...config, method: RequestEnum.DELETE },
    extraConfig,
  ),

  put: <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig) => fetchAxios.request<T>(
    { ...config, method: RequestEnum.PUT },
    extraConfig,
  ),
}
