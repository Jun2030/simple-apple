## 结构树说明

```
simple-apple/
├── docs/                      # 文档目录
│   └── docs/                  # VitePress 文档源文件
│       ├── .vitepress/        # VitePress 配置
│       ├── business/          # 业务文档
│       ├── framework/         # 框架文档
│       └── guide/             # 规范文档
├── packages/                  # 公共依赖库
│   ├── hooks/                 # 公共hooks
│   └── utils/                 # 公共工具方法
├── public/                    # 公共资源
│   └── _global.js             # 全局变量外部导入文件(运维)
├── src/                       # 源代码目录
│   ├── api/                   # 接口请求
│   ├── assets/                # 静态资源
│   ├── components/            # 公共组件
│   ├── config/                # 配置文件
│   ├── constant/              # 常量文件/
│   ├── directives/            # 自定义指令
│   ├── enum/                  # 枚举文件
│   ├── hooks/                 # 自定义 hooks
│   ├── layout/                # 布局组件
│   ├── locales/               # 国际化文件
│   ├── plugins/               # 插件
│   ├── router/                # 路由配置
│   ├── service/               # Axios 封装
│   ├── store/                 # 状态管理
│   ├── styles/                # 全局样式
│   ├── views/                 # 页面组件
│   ├── App.vue                # 根组件
│   └── main.ts                # 入口文件
├── types/                     # 全局类型定义
├── vite-build/                # Vite 构建相关配置
│   ├── config/                # 构建配置
│   ├── env/                   # 环境变量配置
│   ├── plugins/               # Vite 插件配置
│   └── utils/                 # 构建工具函数
├── .eslintrc.config.js        # ESLint 配置
├── .gitignore                 # Git 忽略文件
├── .release-it.json           # release-it 配置
├── index.html                 # HTML 文件
├── package.json               # 项目依赖和脚本
├── README.md                  # 项目说明
├── tsconfig.json              # TypeScript 配置
├── uno.config.ts              # UnoCSS 配置
└── vite.config.ts             # Vite 主配置文件
```
