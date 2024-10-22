import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { IAxiosHooks } from './types'
import { AUTH_KEY, DEFAULT_EXTRA_CONFIG } from '@/config/request'
import { RequestEnum } from '@/enum'
import { getToken, getTokenPrefix } from '@/service/auth'
import { useAppStoreHook } from '@/store/modules/app'
import axios from 'axios'
import { AxiosCanceler } from './cancel'
import { handleBusinessCode, handleHttpCodeError, handleNetworkError, IGNORE_CODE } from './error'

export const axiosCanceler = new AxiosCanceler()
/**
 * 自动去除对象中值为空的字段
 * @param {Record<string, unknown> | undefined | null} data - 需要处理的对象
 * @returns {void}
 * 说明:
 * 1. 如果输入为 undefined 或 null，则返回空对象
 * 2. 遍历对象的所有键值对，过滤掉值为 null、undefined 或空字符串的项
 */
function removeEmptyParams(data: Record<string, unknown> | undefined | null): void {
  if (!data)
    return
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      delete data[key]
    }
  })
}

export class AxiosHooks implements IAxiosHooks {
  // 额外配置参数(已合并)
  mergedExtraConfig: ExtraConfig = {}

  /**
   * 请求之前，请求参数拦截
   * @param { AxiosRequestConfig } defaultConfig 自定义默认的请求配置项
   * @param { AxiosRequestConfig } config 单个API传入的请求配置项
   * @param { ExtraConfig } defaultExtraConfig 单个API传入的额外配置项
   * @param { ExtraConfig } extraConfig 自定义默认的额外配置项
   * @return { AxiosRequestConfig } 合并的axios请求配置项
   */
  beforeRequestHook(
    defaultConfig: AxiosRequestConfig,
    config: AxiosRequestConfig,
    defaultExtraConfig: ExtraConfig,
    extraConfig?: ExtraConfig,
  ): AxiosRequestConfig {
    // 合并请求配置
    const mergeConfig = Object.assign(defaultConfig, config)
    this.mergedExtraConfig = Object.assign(defaultExtraConfig, extraConfig)
    return mergeConfig
  }

  /**
   * 请求拦截
   * @param {AxiosRequestConfig} config 请求配置
   */
  requestInterceptorHook(config: AxiosRequestConfig): AxiosRequestConfig {
    const { ignoreRepeat, retry, hidePreLoading, loadingText, ignoreEmptyParams } = this.mergedExtraConfig

    // 请求防抖处理
    if (!ignoreRepeat && !retry) {
      axiosCanceler.addPending(config)
    }

    // 获取Token并设置
    const token = getToken()
    if (token) {
      config.headers![AUTH_KEY] = `${getTokenPrefix('Authorization')} ${token}`
    }

    // NOTE - 临时测试
    config.headers!['Tenant-Id'] = 1

    // 请求前加载动画, 并设置加载文案
    if (!hidePreLoading) {
      useAppStoreHook().SET_LOADING(true, typeof loadingText === 'function' ? loadingText() : loadingText)
    }

    // GET/POST请求 params/data 兼容书写处理
    if (config.method && config.method.toLocaleLowerCase() === RequestEnum.GET) {
      config.params = config.params ?? config.data
      // 忽略空参数(null, undefined, '')处理
      !ignoreEmptyParams && removeEmptyParams(config.params)
      delete config.data
    } else if (config.method && config.method.toLocaleLowerCase() === RequestEnum.POST) {
      config.data = config.data ?? config.params
      // 忽略空参数(null, undefined, '')处理
      !ignoreEmptyParams && removeEmptyParams(config.data)
      delete config.params
    }
    return config
  }

  /**
   * @description: 响应成功后，数据拦截
   * @param {AxiosResponse} res 响应数据
   * @return {*}
   */
  responseInterceptorHook(res: AxiosResponse) {
    const { reduceResponse, hidePostLoading, showError } = this.mergedExtraConfig
    // 请求防抖处理
    const { config } = res
    config && axiosCanceler.removePending(config)

    // 请求后加载动画
    if (!hidePostLoading) {
      useAppStoreHook().SET_LOADING(false)
    }

    const { codeKey, dataKey, msgKey, successCode } = DEFAULT_EXTRA_CONFIG.backendConfig!
    if (res.data) {
      // 响应数据结构处理
      if (reduceResponse) {
        // status为200,返回数据处理,以下为针对性数据处理
        const [data, code, msg] = [res.data[dataKey], res.data[codeKey], res.data[msgKey]]
        if (code === null || code === undefined || code === '')
          return res.data
        if (successCode.includes(code) || IGNORE_CODE.includes(code)) {
          return data
        } else {
        // 业务层错误码处理
          return handleBusinessCode(code, msg, showError!, data)
        }
      } else {
        return res.data
      }
    } else {
      return res
    }
  }

  /**
   * 自定义响应错误处理钩子
   * 该钩子用于统一处理所有响应错误，包括协议层错误和网络错误
   * @param error 错误对象，包含请求配置、响应信息等
   * @returns 返回处理错误的Promise
   */
  responseCatchErrorHook(error: any) {
  // 请求取消
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    // 获取是否显示错误的配置
    const { showError } = error.config!.extraConfig as ExtraConfig
    // 请求已经发出，但是得到了一个协议层状态码不在2xx范围内的响应 | 请求完全得不到响应

    // 关闭请求后加载动画
    useAppStoreHook().SET_LOADING(false)
    // 协议层错误处理
    if (error.response) {
    // 处理协议层错误状态码（非断网、超时）
      const { status } = error.response
      return handleHttpCodeError(status, error, showError!)
    } else {
    // 网络错误处理
      return handleNetworkError(error.message, error, showError)
    }
  }
}
