/**
 * 服务环境类型
 * - "dev": 开发环境
 * - "test": 测试环境
 * - "stage": 预发布环境
 * - "prod": 生产环境
 */
type ServiceType = 'dev' | 'test' | 'stage' | 'prod'

interface GlobalConfig {
  appName: string
  request: {
    authKey: string
    timeout: number
    successCode: (string | number)[]
    customHeaderKey: string
    customHeaderValue: string
  }
  baseApi: string
}

/**
 * 打包压缩类型
 * - "gzip": gz
 * - "brotli": br
 * - "gzip,brotli": gz+br
 * - "none": 不压缩
 */
type CompressType = 'gzip' | 'brotli' | 'gzip,brotli' | 'none'

/**
 * Vite环境变量
 */
interface ViteEnv {
  /**
   * 项目名称
   * 用于设置应用的显示名称，可能用于标题、页面头部等地方
   */
  readonly VITE_APP_NAME: string

  /**
   * 项目描述
   * 简短描述应用的用途或特点，可能用于元数据或关于页面
   */
  readonly VITE_APP_DESC: string

  /**
   * 项目基础路径
   * 应用的根URL路径，用于配置路由和资源加载
   */
  readonly VITE_BASE_URL: string

  /**
   * 后端基础服务
   * API请求的基础URL，用于配置axios等HTTP客户端
   */
  readonly VITE_BASE_API: string

  /**
   * OSS基础服务
   * 对象存储服务的基础URL，用于文件上传下载等功能
   */
  readonly VITE_OSS_API: string

  /**
   * 路由模式
   * 指定路由模式，可选值：history|hash
   */
  readonly VITE_ROUTE_MODE: SaRoute.RouteMode

  /**
   * 构建压缩类型
   * 指定打包时使用的压缩方式，可选值：gzip|brotli|none
   */
  readonly VITE_BUILD_COMPRESS: CompressType

  /**
   * 是否删除Console打印
   * 控制生产构建时是否移除console.log等调试代码
   */
  readonly VITE_DROP_CONSOLE: boolean
}
