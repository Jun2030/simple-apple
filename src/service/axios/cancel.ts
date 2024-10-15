import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'

/**
 * 存储待处理请求的Map
 * 键为请求的唯一标识，值为取消函数
 */
let pendingMap = new Map<string, Canceler>()

/**
 * Axios取消请求管理类
 */
export class AxiosCanceler {
  /**
   * 获取请求的唯一标识
   * @param { AxiosRequestConfig } config 请求配置
   * @return { string } 请求的唯一标识
   */
  private static getPendingUrl(config: AxiosRequestConfig): string {
    return [config.method, config.url].join('&')
  }

  /**
   * 添加请求到待处理Map中
   * @param { AxiosRequestConfig } config 请求配置
   */
  public addPending(config: AxiosRequestConfig): void {
    // 先尝试移除已存在的相同请求
    this.removePending(config)
    const url = AxiosCanceler.getPendingUrl(config)
    config.cancelToken
      = config.cancelToken
      ?? new axios.CancelToken((cancel) => {
        // 如果pendingMap中不存在当前请求，则添加进入
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * 从待处理Map中移除请求
   * @param { AxiosRequestConfig } config 请求配置
   */
  public removePending(config: AxiosRequestConfig): void {
    const url = AxiosCanceler.getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      if (cancel) {
        cancel(url)
      }
      pendingMap.delete(url)
    }
  }

  /**
   * 取消并清空所有待处理的请求
   */
  public removeAllPending(): void {
    pendingMap.forEach((cancel) => {
      if (cancel) {
        cancel()
      }
    })
    pendingMap.clear()
  }

  /**
   * 重置待处理请求Map
   */
  public reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
