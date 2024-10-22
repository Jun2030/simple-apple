# Simple-apple

## 项目概述

Simple-apple 是一个基于 Vue 3 的前端项目，使用 TypeScript 开发, 主要为基础模块，后续逐步扩展完善

> ！更多详细文档，可执行 `pnpm document` 查看

## 技术栈

- 前端框架：Vue 3
- 构建工具：Vite
- 语言：TypeScript
- 状态管理：Pinia
- 路由：Vue Router
- UI 组件库：Element Plus
- 国际化：Vue I18n
- 表格组件：vxe-table
- HTTP 客户端：Axios
- 样式：UnoCSS

## 脚本命令

```bash
pnpm dev - 开发模式运行
pnpm build:dev - 开发环境构建
pnpm build:test - 测试环境构建
pnpm build:stage - 预发布环境构建
pnpm build:prod - 生产环境构建
pnpm preview - 预览构建结果
pnpm document - 预览项目文档
pnpm lint - 运行 ESLint 检查
pnpm release - 发布新版本
```

## 实用第三方插件

- `@vueuse/core` 很好用的 `Vue` 组合式工具的集合
- `vxe-table` 强大的表格组件，可替代 `element-plus` 的表格组件
- `xe-utils` 好用的工具类，可替代 `lodash`
- `vue-hooks-plus` `Vue3` 基础和高级的 `hook`, 类似 `@vueuse/core`
- `moderndash` 轻量级 `JS/Ts` 常用工具库
- `oxlint` 更好用的静态代码分析工具
- `vue-virtual-scroller` 虚拟滚动，解决大数据量渲染问题(适用于各种类型的滚动列表)
- `vue-virtual-scroll-grid` 虚拟滚动，解决大数据量渲染问题(侧重于网格形式列表)
- `vue-draggable-plus` 支持的 `Vue3` 拖拽库
- ...

## 待办清单

- [x] `Vue`，`useXXX`，`Element-Plus`, `i18n`等自动导入
- [x] 组件(`Components` 目录)自动导入
- [x] `Element-Plus` 的 `Message` 全局 `window` 挂载
- [x] `i18n` 国际化集成及优化
- [x] `Unocss` 样式框架集成
- [x] `Axios` 多功能性封装
- [x] `Eslint` 代码规范及格式化集成
- [x] `Commitlint` 代码提交规范集成
- [x] 项目文档（`/docs`）集成
- [x] 项目性能打包构建优化
- [x] 项目构建 `monorepo` 先进处理
- [x] 图标集成
- [x] Vxe-table 封装及国际化
- [ ] 全局标准 `admin` 标准布局及切换
- [ ] 路由二次封装
- [ ] 业务权限处理
