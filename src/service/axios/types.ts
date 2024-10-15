import type { AxiosRequestConfig, AxiosResponse } from 'axios'

/* 自定义创建Axios的参数 */
export interface RequestConfig extends AxiosRequestConfig {
  // 请求额外参数
  extraConfig?: ExtraConfig
}

export interface IAxiosHooks {
  // 额外的配置参数
  mergedExtraConfig: ExtraConfig
  // 请求之前，请求参数拦截
  beforeRequestHook?: (
    defaultConfig: AxiosRequestConfig,
    config: AxiosRequestConfig,
    defaultExtraConfig: ExtraConfig,
    extraConfig?: ExtraConfig
  ) => AxiosRequestConfig
  // 请求成功后，数据拦截
  requestInterceptorHook?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 响应成功后，数据拦截
  responseInterceptorHook?: (res: AxiosResponse) => any
  // 响应错误，错误拦截
  responseCatchErrorHook?: (err: Error) => void
}
