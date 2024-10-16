## 项目概述

Simple-apple 是一个基于 Vue 3 的前端项目，使用 TypeScript 开发, 主要为基础模块，后续逐步扩展完善

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

## 项目结构

```
simple-apple/
├── src/
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.js
└── ...
```

- 更多项目结构说明可查看 [项目结构](./structure.md)

## 脚本命令

```bash
npm run dev - 开发模式运行
npm run build:dev - 开发环境构建
npm run build:test - 测试环境构建
npm run build:stage - 预发布环境构建
npm run build:prod - 生产环境构建
npm run preview - 预览构建结果
npm run lint - 运行 ESLint 检查
npm run release - 发布新版本
```

## 代码规范

项目使用 ESLint ([@2030/eslint-config](https://www.npmjs.com/package/@2030/eslint-config)) 进行代码规范检查，并配置了 lint-staged 在提交代码时进行检查

- [@2030/eslint-config](https://www.npmjs.com/package/@2030/eslint-config) 为自行整理的一套代码规范，可自动检测代码规范，并提示错误，且可自动保存修复格式化错误。大部分可用于替代 `Prettier`
- 如果有自定义规则，也可自行覆盖，也可联系戴俊更新此包

## 提交规范

项目使用 Conventional Commits 规范([@2030/commitlint-config](https://www.npmjs.com/package/@2030/commitlint-config))进行提交，使用 husky 和 lint-staged 进行提交规范检查

- [@2030/commitlint-config](https://www.npmjs.com/package/@2030/commitlint-config)为为自行整理的一套提交规范，可自动检测提交规范，并提示错误
- 如果有自定义规则，也可自行覆盖，也可联系戴俊更新此包

## 国际化

项目使用 Vue I18n 实现国际化功能。

- 使用yaml文件及结构，提升性能
- 已实现自动导入，直接新建文件即可
- 存放位置在 `src/locales` 目录下，按需模块定义文件即可(注意不要全局重命名)
- 更多用法请查看 [国际化使用](./i18n.md)

## 自动导入

-项目配置了 unplugin-auto-import 和 unplugin-vue-components 插件，可以自动导入 Vue 相关 API 和组件

## 性能优化

- 使用 vite-plugin-compression 进行资源压缩
- 配置了持久化缓存 (pinia-plugin-persistedstate)

## 图标

- 使用 unplugin-icons 插件实现图标的按需加载

## 开发工具

- 使用 vite-plugin-vue-devtools 增强开发体验
