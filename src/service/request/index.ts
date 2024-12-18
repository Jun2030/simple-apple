import type { AxiosRequestConfig } from 'axios'
import type { RequestConfig } from './types'
import { defaultAxiosConfig, defaultExtraConfig } from '@/config'
import { RequestEnum } from '@/enum'
import { Axios } from './axios'
import { businessCodeMap } from './error'

export function useRequest(requestConfig?: RequestConfig) {
  const REQUEST_EXTRA_CONFIG: ExtraConfig | undefined = requestConfig?.extraConfig
  REQUEST_EXTRA_CONFIG && delete requestConfig?.extraConfig
  const REQUEST_AXIOS_CONFIG: AxiosRequestConfig | undefined = requestConfig

  const asyncRequest = async <T>(axiosConfig: AxiosRequestConfig, extraConfig?: ExtraConfig): Promise<T> => {
    const mergedConfig: AxiosRequestConfig = Object.assign(defaultAxiosConfig(), REQUEST_AXIOS_CONFIG, axiosConfig)
    const mergedExtraConfig: ExtraConfig = Object.assign(defaultExtraConfig(businessCodeMap), REQUEST_EXTRA_CONFIG, extraConfig)

    const axiosInstance = new Axios(mergedConfig, mergedExtraConfig)
    return (await axiosInstance.request(mergedConfig))
  }

  const get = <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig): Promise<T> => {
    return asyncRequest<T>({ ...config, method: RequestEnum.GET }, extraConfig)
  }

  const post = <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig): Promise<T> => {
    return asyncRequest<T>({ ...config, method: RequestEnum.POST }, extraConfig)
  }

  const put = <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig): Promise<T> => {
    return asyncRequest<T>({ ...config, method: RequestEnum.PUT }, extraConfig)
  }

  const delete_ = <T>(config: AxiosRequestConfig, extraConfig?: ExtraConfig): Promise<T> => {
    return asyncRequest<T>({ ...config, method: RequestEnum.DELETE }, extraConfig)
  }

  return { get, post, put, delete: delete_ }
}

const request = useRequest()

export default request
