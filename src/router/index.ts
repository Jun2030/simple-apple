import type { App } from 'vue'
import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { routerPermission } from './permission'

// 自动导入modules目录下的路由
const moduleRoutes: RouteRecordRaw[] = []
const allModules: { [k: string]: any } = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(allModules).forEach((name) => {
  if (name.includes('_'))
    return
  moduleRoutes.push(...allModules[name].default)
})

export const routes: RouteRecordRaw[] = [
  // 不存在的路径重定向到首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
  {
    path: '/',
    redirect: {
      path: '/home',
    },
  },
  ...moduleRoutes,
]

export const router: Router = createRouter({
  routes,
  history: createWebHistory(),
  strict: true,
  scrollBehavior(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalizedLoaded,
    savedPosition,
  ) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  },
})

export async function setupRouter(app: App<Element>) {
  app.use(router)
  routerPermission(router)
  await router.isReady()
}
