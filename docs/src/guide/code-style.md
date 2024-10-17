## 命名规范

### 项目命名

- 项目名：全小写，使用中划线分割单词，如：`my-project`

```ts
'myProject' // ×
'my-project' // √
```

### 目录命名

- 根据当前项目所用主技术，一般采用对应的 kebab-case 形式，要避免混用
  ```ts
  'vue-project' // √
  'react-project' // √
  'angularProject' // ×
  ```
- VUE 的项目中的 components 中的组件目录，使用 kebabCase 命名
  ```ts
  'src/components/my-component.vue' // ×
  'src/components/MyComponent.vue' // √
  'src/components/MyComponent/index.vue' // √
  ```

### 文件命名

- 文件名（js/ts/css/less/scss/html/...）使用 kebab-case 命名

```ts
'myFile.ts' // ×
'my-file.ts' // √
```

- 图片(jpg/png/svg/...)文件使用下划线命名

```ts
'my_image.png' // √
'my-image.png' // ×
```

### 变量命名

1. 全局常量：全大写，使用下划线分割单词

```ts
const GLOBAL_CONST = 1
export default GLOBAL_CONST
```

2. 函数名：驼峰命名法

```ts
function getData() {}
export default getData
```

3. 类名：驼峰命名法

```ts
class MyClass {}
export default MyClass
```

4. 变量名：驼峰命名法，如：`myVar`

```ts
const myVar = 1
export default myVar
```

## HTML规范

## CSS规范

## JS规范
