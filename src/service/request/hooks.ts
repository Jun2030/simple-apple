import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { IAxiosHooks } from './types'
import { AUTH_KEY } from '@/config/request'
import { RequestEnum } from '@/enum'
import { getToken, getTokenPrefix } from '@/service/auth'
import { useAppStoreHook } from '@/store/modules/app'
import axios from 'axios'
import { AxiosCanceler } from './cancel'
import { handleBusinessCode, handleEmptyCode, handleHttpCodeError, handleNetworkError, IGNORE_CODE } from './error'

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
  /**
   * 请求之前，请求参数拦截
   * @param { AxiosRequestConfig } config 单个API传入的请求配置项
   * @return { AxiosRequestConfig } config 合并的axios请求配置项
   */
  beforeRequestHook(
    config: AxiosRequestConfig,
  ): AxiosRequestConfig {
    return config
  }

  /**
   * 请求拦截
   * @param {AxiosRequestConfig} config 请求配置
   */
  requestInterceptorHook(config: AxiosRequestConfig, extraConfig: ExtraConfig): AxiosRequestConfig {
    const { ignoreRepeat, retry, hidePreLoading, loadingText, ignoreEmptyParams } = extraConfig

    // 请求防抖处理
    if (!ignoreRepeat && !retry) {
      axiosCanceler.addPending(config)
    }

    // 获取Token并设置
    const token = getToken()
    if (token) {
      config.headers![AUTH_KEY] = `${getTokenPrefix('Authorization')} ${token}`
    }

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
  responseInterceptorHook(res: AxiosResponse, extraConfig: ExtraConfig) {
    const { reduceResponse, hidePostLoading, showError } = extraConfig
    // 请求防抖处理
    const { config } = res
    config && axiosCanceler.removePending(config)

    // 请求后加载动画
    if (!hidePostLoading) {
      useAppStoreHook().SET_LOADING(false)
    }

    // status为200,返回数据处理,以下为针对性数据处理
    const { codeKey, dataKey, msgKey, successCode } = extraConfig.backendConfig!
    const [data, code, msg] = [res.data[dataKey], res.data[codeKey], res.data[msgKey]]
    if (code === null || code === undefined || code === '')
      // 业务层无 code 码处理
      return handleEmptyCode(showError!, res.data || data)
    if (successCode.includes(code) || IGNORE_CODE.includes(code)) {
      return reduceResponse ? data : res.data
    } else {
      // 业务层错误码处理
      return handleBusinessCode(code, msg, showError!, reduceResponse ? data : res.data)
    }
  }

  /**
   * 自定义响应错误处理钩子
   * 该钩子用于统一处理所有响应错误，包括协议层错误和网络错误
   * @param error 错误对象，包含请求配置、响应信息等
   * @param _axiosConfig 请求配置
   * @param extraConfig 额外配置
   * @returns 返回处理错误的Promise
   */
  responseCatchErrorHook(error: any, _axiosConfig: AxiosRequestConfig, extraConfig: ExtraConfig) {
    // 请求已经发出，但是得到了一个协议层状态码不在2xx范围内的响应 | 请求完全得不到响应
    // 请求取消
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    // 获取是否显示错误的配置
    const { showError } = extraConfig

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
