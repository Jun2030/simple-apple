import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Simple Apple Docs',
  description: 'Docs for Simple Apple',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.png' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon.png',
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '🛠️ 基础框架', link: '/framework/overview', activeMatch: '^/framework/' },
      { text: '💼 业务文档', link: '/business/overview', activeMatch: '^/business/' },
      { text: '📚 代码规范', link: '/guide/', activeMatch: '^/guide/' },
      { text: '🧩 组件文档', link: '/components', activeMatch: '^/components/' },
    ],

    sidebar: {
      '/framework/': [
        {
          text: '',
          items: [
            { text: '总体说明', link: '/framework/overview' },
            { text: '结构目录', link: '/framework/structure' },
            { text: '国际化使用', link: '/framework/i18n' },
            { text: '请求封装', link: '/framework/request' },
            { text: '私有化扩展', link: '/framework/private' },
            { text: '路由处理', link: '/framework/router' },
          ],
        },
      ],
      '/business/': [
        {
          text: '',
          items: [
            { text: '', link: '/business/overview' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '',
          items: [
            { text: '编程规约', link: '/guide/code-style' },
            { text: 'Vue规范', link: '/guide/vue' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: '' },
    ],

    outline: {
      label: '目录导航',
      level: [2, 3],
    },
  },
})
