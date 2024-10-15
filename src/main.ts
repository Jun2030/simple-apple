import App from '@/App.vue'
import i18n from '@/plugins/i18n'
import pinia from '@/plugins/pinia'
import { setupRouter } from '@/router'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'virtual:uno.css'
import '@/styles/index.css'

const app = createApp(App)
setupRouter(app)
app.use(i18n).use(pinia).mount('#app')

// 添加全局属性
window.$message = ElMessage
window.$messageBox = ElMessageBox
