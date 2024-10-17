import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import imageViewer from 'vitepress-plugin-image-viewer'

// 加载css
import './index.css'
// 图片放大/预览
import 'viewerjs/dist/viewer.min.css'
// 如需按钮点击预览图片
// import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';

export default {
  ...DefaultTheme,
  // 自定义页面布局
  enhanceApp() {
    // 注册全局组件，如果你不想使用也可以不添加
    // app.component('vImageViewer', vImageViewer);
  },
  setup() {
    // 获取路由
    const route = useRoute()
    // 使用
    imageViewer(route)
  },
}
