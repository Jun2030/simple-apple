import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { RouterConfig } from '@/config'
import { useTitleSet } from '@/hooks/useTitleSet'
import { getToken } from '@/service/auth'
import { AxiosCanceler } from '@/service/axios/cancel'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { setTitle } = useTitleSet()
const axiosCanceler = new AxiosCanceler()
NProgress.configure({ showSpinner: false })

export function routerPermission(router: Router): void {
  router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalizedLoaded, next) => {
    // 取消上一个路由的所有请求
    axiosCanceler.removeAllPending()

    NProgress.start()
    const token = getToken()

    // 如果没有登陆
    if (!token) {
      // 如果在免登录的白名单中，则直接进入
      if (!to.meta.auth || RouterConfig.WITHOUT_AUTH_ROUTER.includes(to.name as string)) {
        return next()
      }
      // 其他没有访问权限的页面将被重定向到登录页面
      return next({
        name: 'Login',
        query: {
          redirect: to.fullPath,
        },
      })
    }

    // 如果已经登录，并准备进入 Login 页面，则重定向到主页
    if (to.name === 'Login') {
      return next({ path: '/' })
    }

    next()
  })

  router.afterEach((to) => {
    setTitle(to.meta.title as string)
    NProgress.done()
  })
}
