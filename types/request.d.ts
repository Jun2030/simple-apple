// declare namespace SaRequest {

/** 请求响应数据（不包含data） */
interface Result {
  code: number
  msg?: string
}

/* 请求响应数据(包含data) */
interface ResData<T> extends Result {
  data: T
}

/* 分页响应数据 */
interface ResPage<T> {
  list: T[]
  total: number
  pageNo?: number
  pageSize?: number
}

/* 分页请求参数 */
interface ReqPage {
  pageNo: number
  pageSize: number
}

/* 后台返回数据格式 */
interface BackendConfig {
  // 业务code码-字段名称
  codeKey: string
  // 业务数据-字段名称
  dataKey: string
  // 业务消息-字段名称
  msgKey: string
  // 成功code码
  successCode: number[]
  // 忽略code码
  ignoreCode?: number[]
}

/* 请求的额外参数 */
interface ExtraConfig {
  // 是否展示请求前加载动画
  hidePreLoading?: boolean
  // 是否隐藏请求后加载动画
  hidePostLoading?: boolean
  // 动画加载文字
  loadingText?: () => string | string
  // 是否展示错误提示
  showError?: boolean
  // 是否忽略重复请求
  ignoreRepeat?: boolean
  // 接口错误重试次数
  retry?: number
  // 是否忽略空参数(null, undefined, '')
  ignoreEmptyParams?: boolean
  // 是否开启简洁数据结构响应
  // true表示返回data数据，false表示返回全部数据
  reduceResponse?: boolean
  // 自定义处理业务层code码
  businessCodeMap?: (msg: string) => Map<number, { msg: string, action: (msg: string, data: any) => void }>
  // 后台返回数据格式
  backendConfig?: BackendConfig
}

  /* 请求方式 */
  type RequestMethod = 'get' | 'post' | 'put' | 'delete'
// }
