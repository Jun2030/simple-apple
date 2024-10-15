import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig } from './types'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { clone } from 'xe-utils'
import { AxiosHooks } from './hooks'

const axiosHooks = new AxiosHooks()

export class Axios {
  private axios: AxiosInstance
  private config: RequestConfig

  constructor(config: RequestConfig) {
    this.config = config
    this.axios = axios.create(config)
    this.setupHooks()
  }

  private setupHooks(): void {
    /* axios原生拦截处理 */
    const { request, response } = this.axios.interceptors
    // axios原生请求拦截
    request.use(
      (config: InternalAxiosRequestConfig) => {
        if (axiosHooks.requestInterceptorHook) {
          return axiosHooks.requestInterceptorHook(config) as InternalAxiosRequestConfig
        } else {
          return config
        }
      },
      (error: Error) => {
        return Promise.reject(error)
      },
    )
    // axios原生相应拦截
    response.use(
      (res: AxiosResponse): AxiosResponse => {
        if (axiosHooks.responseInterceptorHook) {
          return axiosHooks.responseInterceptorHook(res)
        } else {
          return res
        }
      },
      (error: AxiosError) => {
        if (axiosHooks.responseCatchErrorHook) {
          return axiosHooks.responseCatchErrorHook(error)
        }
      },
    )
  }

  public request<T>(
    config: AxiosRequestConfig,
    extraConfig?: ExtraConfig,
  ): Promise<T> {
    const originalConfig = clone(this.config, true)
    const { extraConfig: defaultExtraConfig } = originalConfig
    delete originalConfig.extraConfig

    let mergeConfig: AxiosRequestConfig = originalConfig
    if (axiosHooks.beforeRequestHook) {
      mergeConfig = axiosHooks.beforeRequestHook(
        originalConfig,
        config,
        defaultExtraConfig as ExtraConfig,
        extraConfig,
      )
    }

    // 错误重试-网络错误或5xx 服务器错误
    const { retry } = Object.assign(defaultExtraConfig as ExtraConfig, extraConfig)
    if (retry) {
      axiosRetry(this.axios, {
        retries: retry,
        retryDelay: (retryCount) => {
          return retryCount * 3000
        },
        shouldResetTimeout: true,
      })
    }

    return new Promise<T>((resolve, reject) => {
      this.axios
        .request(mergeConfig)
        .then((res) => {
          resolve(res as T)
        })
        .catch((err: Error) => {
          reject(err)
        })
    })
  }
}
