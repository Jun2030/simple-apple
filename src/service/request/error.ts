import { NetworkErrorEnum } from '@/enum'
import { $t } from '@/plugins/i18n'
import { router } from '@/router'
import { removeToken } from '@/service/auth'
import { axiosCanceler } from './hooks'

function toastError(msg: string | undefined): void {
  msg && $message({
    message: msg,
    grouping: true,
    type: 'error',
  })
}

/** *****************  协议层错误码处理 start  */

/**
 * 协议层错误码
 */
export const HTTP_ERROR_CODE: (Result & { action?: () => void })[] = [
  { code: 400, msg: $t('httpError.400') },
  {
    code: 401,
    msg: $t('httpError.401'),
    action: () => {
      removeToken()
      router.push({ name: 'Login' })
    },
  },
  { code: 403, msg: $t('httpError.403') },
  { code: 404, msg: $t('httpError.404') },
  { code: 405, msg: $t('httpError.405') },
  { code: 408, msg: $t('httpError.408') },
  { code: 500, msg: $t('httpError.500') },
  { code: 501, msg: $t('httpError.501') },
  { code: 502, msg: $t('httpError.502') },
  { code: 503, msg: $t('httpError.503') },
  { code: 504, msg: $t('httpError.504') },
  { code: 505, msg: $t('httpError.505') },
]

/**
 * 协议层错误码处理
 * @param code 协议层状态码
 * @param error 错误对象，包含错误详细信息
 * @param showError 是否需要显示错误提示信息
 */
export function handleHttpCodeError(code: number, error: Error, showError: boolean): Promise<Error> {
  const errorMatch = HTTP_ERROR_CODE.find(item => item.code === code)
  if (errorMatch) {
    showError && toastError(errorMatch.msg)
    errorMatch.action && errorMatch.action()
  }
  return Promise.reject(error)
}

/** *****************  协议层错误码处理 end  */

/** *****************  业务层错误码处理 start  */

/**
 * 业务层错误码处理
 * @param msg 错误信息
 * @param showError 是否需要提示错误信息
 * @returns Map<number, { msg: string, action: (msg: string, data: any) => void }>
 */
export function businessCodeMap(msg: string, showError?: boolean): Map<number, { msg: string, action: (msg: string, data: ResData<unknown> | unknown) => void }> {
  return new Map([
    [401, {
      msg,
      action: () => {
        // 处理Token过期
        axiosCanceler.removeAllPending()
        showError && toastError($t('loginError.tokenExpired'))
        removeToken()
        router.push({ name: 'Login' })
      },
    }],
  ])
}

/**
 * 业务层错误码处理
 * @param code 错误码
 * @param msg 错误信息
 * @param showError 是否需要提示错误信息
 * @param data 响应数据, 根据reduceResponse配置，可能为resData(未简化)可能为data(简化)
 * @returns Promise<Error>
 */
export function handleBusinessCode(code: number, msg: string, showError: boolean, data?: ResData<unknown> | unknown): Promise<Error> {
  const codeAction = businessCodeMap(msg, showError)?.get(code)
  if (codeAction) {
    codeAction.action(msg, data)
    return Promise.reject(data)
  } else {
    showError && toastError(msg)
    return Promise.reject(data)
  }
}

/**
 * 业务层无 code 码处理
 * @param showError 是否需要提示错误信息
 * @param data 响应数据
 * @returns Promise<Error>
 */
export function handleEmptyCode(showError: boolean, data?: ResData<unknown> | unknown): Promise<Error> {
  showError && toastError($t('noCodeError'))
  return Promise.reject(data)
}

/** *****************  业务层错误码处理 end  */

/** *****************  网络错误码处理 start  */

/**
 * 网络错误处理
 * @param msg 错误信息
 * @param error 错误对象，包含错误详细信息
 * @param showError 是否需要显示错误提示信息
 */
export function handleNetworkError(msg: string, error: Error, showError?: boolean): Promise<Error> | void {
  let message: string
  if (!msg)
    return
  if (msg === NetworkErrorEnum.ERROR) {
    message = $t('networkError.network')
  } else if (msg.includes(NetworkErrorEnum.TIMEOUT)) {
    message = $t('networkError.timeout')
  } else {
    message = $t('networkError.other')
  }

  showError && toastError(message)
  return Promise.reject(error)
}

/** *****************  网络错误码处理 end  */
