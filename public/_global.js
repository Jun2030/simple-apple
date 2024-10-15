window.$config = {
  /** **********  通用配置 start  */
  // Axios相关配置
  axios: {
    // 请求超时时间
    timeout: 15 * 1000,
    // 上传超时时间
    timeoutUpload: 60 * 1000,
    // 鉴权键名
    authKey: 'Authorization',
    // 业务层（非协议层）接口定义的成功码
    successCode: [0],
  },
  // 基本的api地址 > env配置
  baseApiUrl: '',
  // 上传oss地址 > env配置
  ossApiUrl: '',
  /** **********  通用配置 end  */
}
