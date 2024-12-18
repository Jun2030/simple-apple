import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { AxiosHooks } from './hooks'

const axiosHooks = new AxiosHooks()

export class Axios {
  private axios: AxiosInstance
  private axiosConfig: AxiosRequestConfig
  private extraConfig: ExtraConfig

  constructor(axiosConfig: AxiosRequestConfig, extraConfig: ExtraConfig) {
    this.axiosConfig = axiosConfig
    this.extraConfig = extraConfig
    this.axios = axios.create(axiosConfig)
    this.setupHooks()
  }

  private setupHooks(): void {
    /* axios原生拦截处理 */
    const { request, response } = this.axios.interceptors
    // axios原生请求拦截
    request.use(
      (config: InternalAxiosRequestConfig) => {
        if (axiosHooks.requestInterceptorHook) {
          return axiosHooks.requestInterceptorHook(config, this.extraConfig) as InternalAxiosRequestConfig
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
          return axiosHooks.responseInterceptorHook(res, this.extraConfig)
        } else {
          return res
        }
      },
      (error: AxiosError) => {
        if (axiosHooks.responseCatchErrorHook) {
          return axiosHooks.responseCatchErrorHook(error, this.axiosConfig, this.extraConfig)
        }
      },
    )
  }

  public request<T>(
    config: AxiosRequestConfig,
  ): Promise<T> {
    let axiosConfig: AxiosRequestConfig = config
    if (axiosHooks.beforeRequestHook) {
      axiosConfig = axiosHooks.beforeRequestHook(config)
    }

    // 错误重试-网络错误或5xx 服务器错误
    if (this.extraConfig.retry) {
      axiosRetry(this.axios, {
        retries: this.extraConfig.retry,
        retryDelay: (retryCount) => {
          return retryCount * 3000
        },
        // 只对网络错误和5xx错误进行重试
        retryCondition: (error) => {
          console.log('ERROR', error)
          // 如果是取消的请求，不进行重试
          if (axios.isCancel(error)) {
            return false
          }
          // 网络错误或服务器错误时重试
          return axiosRetry.isNetworkOrIdempotentRequestError(error)
        },
        shouldResetTimeout: true,
      })
    }

    return new Promise<T>((resolve, reject) => {
      this.axios
        .request(axiosConfig)
        .then((res) => {
          resolve(res as T)
        })
        .catch((err: Error) => {
          reject(err)
        })
    })
  }
}
