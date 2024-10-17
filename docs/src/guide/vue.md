## 组件规范

### 1. 使用组合式API (Composition API)

- 优先使用`setup`函数和组合式API,而不是选项式API
- 使用`<script setup>`语法糖简化组件代码

### 2. 命名规范

- 组件名使用PascalCase命名法,如`UserProfile`
- props名使用camelCase,如`userName`
- 事件名使用kebab-case,如`@update-user`

### 3. 组件结构

- 将template、script和style放在同一个.vue文件中
- 使用`<style scoped>`确保样式只应用于当前组件

### 4. Props定义

- 使用`defineProps`明确定义props类型和默认值
- 尽可能使用对象语法定义props,包括类型和默认值

### 5. 事件处理

- 使用`defineEmits`定义组件可以触发的事件
- 事件名应该是kebab-case形式

### 6. 响应式数据

- 使用`ref`和`reactive`创建响应式数据
- 优先使用`ref`来定义基本类型的响应式数据

### 7. 计算属性和监听器

- 使用`computed`定义计算属性
- 使用`watch`或`watchEffect`定义监听器

### 8. 生命周期钩子

- 使用`onMounted`, `onUpdated`等组合式API生命周期钩子

### 9. 逻辑复用

- 使用组合式函数(Composables)封装和复用逻辑

### 10. 性能优化

- 合理使用`v-memo`指令优化列表渲染
- 使用`defineAsyncComponent`实现组件懒加载

### 11. TypeScript支持

- 尽可能使用TypeScript来增强类型检查
- 为props和emits定义明确的类型

### 12. 文件组织

- 将大型组件拆分为更小的子组件
- 使用目录结构组织相关的组件和资源
