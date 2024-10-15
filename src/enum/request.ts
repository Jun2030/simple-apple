/**
 * 请求方法枚举
 */
export enum RequestEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

/**
 * 网络错误类型枚举
 */
export enum NetworkErrorEnum {
  ERROR = 'Network Error',
  TIMEOUT = 'timeout',
}

/**
 * 请求Content类型枚举
 */
export enum ContentTypeEnum {
  RAW_JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
