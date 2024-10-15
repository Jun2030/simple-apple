/**
 *  @param meta: {
 *    title: 侧边栏和面包屑中展示的名称
 *    icon: 路由的图标
 *    order: 路由顺序，用于菜单排序
 *    auth: 是否需要Token校验
 *    roles: 哪些类型的用户有权限才能访问(空的话则表示不需要权限)
 *    keepAlive: 是否缓存页面
 *    hide: 是否在侧边栏和面包屑中隐藏
 *    href: 外链链接
 *    activeMenu: 在跳转至该路由时，左侧菜单高亮显示 /xxx/xxx 对应的菜单项
 *  }
 */

export default [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: 'Home',
    },
  },
]
