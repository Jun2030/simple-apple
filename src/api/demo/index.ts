import type * as Demo from './types'
// import { useRequest } from '@/service/request'
import request from '@/service/request'

// const { get } = useRequest()
// import request from '@/service/request'

/** 获取B站热搜 */
export function getBiliHot() {
  return request.get<Demo.BiliHotRes[]>({
    baseURL: 'https://v.api.aa1.cn',
    url: '/api/bilibili-rs/',
  }, {
    backendConfig: {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'msg',
      successCode: [1],
    },
    hidePreLoading: false,
    hidePostLoading: false,
    reduceResponse: true,
    ignoreRepeat: false,
    retry: 0,
  })
}

/** 获取今日头条热点新闻 */
export function getHotNews() {
  return request.get<Demo.NewsRes[]>({
    baseURL: 'https://tenapi.cn/',
    url: '/v2/toutiaohotnew',
  }, {
    reduceResponse: false,
  })
}

/** 获取随机笑话 */
export function getJoke() {
  return request.get<Demo.JokeRes>({
    baseURL: 'https://api.apiopen.top',
    url: '/getJoke',
  })
}

/** 获取历史上的今天 */
export function getHistoryAtToday(params: { type: string }) {
  return request.get<Demo.HotRes[]>({
    baseURL: 'https://uapis.cn',
    url: '/api/hotlist',
    params,
  }, {
    reduceResponse: false,
  })
}
