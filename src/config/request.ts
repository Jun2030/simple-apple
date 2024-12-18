import type { AxiosRequestConfig } from 'axios'
import { ContentTypeEnum } from '@/enum'
import { $t } from '@/plugins/i18n'

const { baseApiUrl, axios: { timeout, successCode, authKey } } = window.$config

/* 鉴权键名: Authorization|Token|... */
export const AUTH_KEY: string = authKey || 'Authorization'

/* 请求超时时间 */
export const REQUEST_TIMEOUT: number = timeout || 15 * 1000

/* 业务层（非协议层）接口定义的成功码，0、200、... */
export const REQUEST_SUCCESS_CODE: number[] = successCode || [0, 200]

const { VITE_BASE_API } = import.meta.env

/** 请求默认的Axios配置 */
export function defaultAxiosConfig(): AxiosRequestConfig {
  const baseURL = baseApiUrl || VITE_BASE_API
  const headers = {
    'Content-Type': ContentTypeEnum.RAW_JSON,
  }
  const timeout = REQUEST_TIMEOUT
  const withCredentials = false
  return { baseURL, headers, timeout, withCredentials }
}

/**
 * 默认的额外配置
 */
export const DEFAULT_EXTRA_CONFIG: ExtraConfig = {
  // 是否隐藏前置loading, 默认隐藏
  hidePreLoading: true,
  // 是否隐藏后置loading, 默认隐藏
  hidePostLoading: true,
  // 加载动画文字
  loadingText: () => $t('requestConfig.loadingText'),
  // 是否展示错误提示, 默认Toast展示
  showError: true,
  // 是否忽略重复请求, 默认开启防重复请求
  ignoreRepeat: false,
  // 接口错误重试次数
  retry: 2,
  // 是否忽略空参数值传递, 默认过滤空值参数(null, undefined, '')传递
  ignoreEmptyParams: false,
  // 是否开启简洁数据结构响应, 默认返回 data 数据
  reduceResponse: true,
  // 后台返回数据格式
  backendConfig: {
    codeKey: 'code',
    dataKey: 'data',
    msgKey: 'msg',
    successCode: REQUEST_SUCCESS_CODE,
    ignoreCode: [],
  },
  // 请求头配置
  headersConfig: {
    // 鉴权键名: Authorization|Token|...
    authKey: AUTH_KEY,
    // 自定义请求头数据
    customHeaders: {},
  },
}

/**
 * 默认的额外配置 - 函数，包含业务错误处理
 * @param businessCodeMap 业务错误码处理,可在 /src/service/axios/error.ts 中定义处理
 * @returns ExtraConfig
 */
export function defaultExtraConfig(businessCodeMap: (msg: string) => Map<number, { msg: string, action: (msg: string, data: any) => void }>): ExtraConfig {
  return { ...DEFAULT_EXTRA_CONFIG, businessCodeMap }
}
