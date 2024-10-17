# 图标说明

## 目录说明

- `icons`: 存放小图标
  - 一般小图标的格式为svg
  - 如果是非svg格式的图标，比如png格式，建议转成base64格式，以减少http请求
- `imgs`: 存放非icon图片

## 使用说明

### Element Plus 图标默认支持，写法如下

> 所有的Element Plus图标查看：[所有图标](https://icon-sets.iconify.design/ep/)

```vue
<template>
  <div>
    <i-ep:apple class="text-red-500 text-2xl" />
  </div>
</template>
```

解析如下：

```bash
`i-ep`: 是 Element Plus 图标的固定前缀
`:`: 是前缀和图标名称的分隔符，也可以为 `-`
`apple`: 是图标名称
```

### 本地图标支持，写法如下

@example: 本地 `assets/icons/svg` 目录下，有一张 `home.svg` 文件

```vue
<template>
  <div>
    <i-svg:home />
  </div>
</template>
```

解析如下：

```bash
`i-svg`: 是本地图标(svg)的固定前缀
`:`: 是前缀和图标名称的分隔符，也可以为 `-`
`home`: 是本地图标名称(不含 `svg` 格式后缀)
```
