declare namespace SaRoute {
  /**
   * 路由组件
   * - basic: 基础组件,具有公共部分布局
   * - page: 单页面组件
   * - blank: 空白页面组件
   */
  type RouteLayout = 'basic' | 'page' | 'blank'

  /**
   * 路由模式
   * - history: 历史模式
   * - hash: 哈希模式
   */
  type RouteMode = 'history' | 'hash'

  interface Route {
    // 路由路径
    path: string
    // 路由名称
    name?: string
    // 路由重定向
    redirect?: string
    // 路由组件
    component?: RouteLayout
    // 路由嵌套路由
    children?: Route[]
    // 路由配置
    meta?: RouteMeta
    // 路由属性
    props?: boolean | Record<string, any> | ((to: any) => Record<string, any>)
  }

  interface RouteMeta {
    /**
     * 设置该路由在侧边栏和面包屑中展示的名称
     */
    title: string
    /**
     * 设置该路由的图标
     */
    icon?: string
    /**
     * 路由顺序，用于菜单排序
     */
    order?: number
    /**
     * 是否需要登录权限
     */
    auth?: boolean
    /**
     * 哪些类型的用户有权限才能访问(空的话则表示不需要权限)
     */
    roles?: SaAuth.RoleType[]
    /**
     * 是否缓存页面
     * 默认为false,为true时代表需要缓存，此时该路由和该页面都需要设置一致的 Name
     */
    keepAlive?: boolean
    /**
     * 默认false,如果设置为true,则表示该路由不会在左侧菜单显示
     */
    hide?: boolean
    /**
     * 外链链接
     */
    href?: string
    /**
     * 示例：activeMenu: '/xxx/xxx'
     * 表示在跳转至该路由时，左侧菜单高亮显示 /xxx/xxx 对应的菜单项
     * 该属性适合使用在有 hide: true 的路由上
     */
    activeMenu?: string
  }

  type RouteModule = Record<string, { default: SaRoute.Route }>
}
