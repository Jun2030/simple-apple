## 基本说明

- `request` 封装了 `axios`，为前端请求提供了更方便的使用方式
- `request` 提供了更丰富的配置项，如：错误提示、加载动画、错误重试等，更丰富的配置项，可参考下方配置说明

## 基本用法

提供了两种使用方式：统一的 `request` 方法和使用单独的 `request`静态属性方法（如 get、post 等）。

### 使用 `request` 方法

```ts
import { request } from '@/service/axios'

function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResData>({
    url: 'users/login',
    method: 'post',
    data,
  })
}
```

### 使用单独的 `request`静态属性方法

```ts
import request from '@/service/axios'

function getLoginCodeApi() {
  return request.get<Login.LoginCodeResData>({
    url: 'login/code',
  })
}
```

## 配置说明

### 基础说明

```ts
/**
 * 基础参数说明
 * @param AxiosConfig - Axios 配置
 * @param ExtraConfig - 额外配置
 */
request.post(AxiosConfig, ExtraConfig)
```

### 默认配置

默认配置即为Axios的原始全部配置，具体可查看 [Request Config](https://axios-http.com/docs/req_config)。

### 额外配置 (ExtraConfig)

默认配置存在 `src/config/request.ts` 文件中，默认配置如下：

```ts
/**
 * 默认的额外配置
 */
export const DEFAULT_EXTRA_CONFIG: ExtraConfig = {
  // 是否隐藏前置loading, 默认显示
  hidePreLoading: false,
  // 是否隐藏后置loading, 默认显示
  hidePostLoading: false,
  // 加载动画文字
  loadingText: () => $t('requestConfig.loadingText'),
  // 是否展示错误提示, 默认Toast展示
  showError: true,
  // 是否忽略重复请求, 默认开启防重复请求
  ignoreRepeat: false,
  // 接口错误重试次数
  retry: 0,
  // 是否忽略空参数值传递, 默认过滤空值参数(null, undefined, '')传递
  ignoreEmptyParams: false,
  // 是否开启简洁数据结构响应, 默认返回 data 数据
  reduceResponse: true,
  backendConfig: {
    codeKey: 'code',
    dataKey: 'data',
    msgKey: 'msg',
    successCode,
  },
}
```

## 注意事项

- 默认情况下，请求会自动处理加载状态和错误提示
- 可以通过 `ExtraConfig` 控制是否显示加载动画、错误提示等行为
- 默认会过滤空值参数，可以通过 `ignoreEmptyParams` 配置修改此行为
- 响应数据默认会被简化，只返回 `data` 字段，可以通过 `reduceResponse` 配置修改

## 高级用法

### 请求重试

- 可以通过 `retry` 配置设置请求重试次数。

### 防重复请求

- 默认开启防重复请求，可以通过 `ignoreRepeat` 配置关闭。

### 自定义请求拦截器和响应拦截器

- 可以在 `Axios` 类中添加自定义的拦截器来处理特殊需求
