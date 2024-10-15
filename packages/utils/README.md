# @2030/utils

用于项目中常用的工具函数，业务上有通用的工具函数可以放在这里。目前有：

- `browser` - 浏览器相关
- `crypto` - 加密相关
- `storage` - 存储相关
- `files` - 文件相关
- `download` - 下载相关
- `nanoid` - 唯一 ID 生成，Vue3代码中根据实际业务场景可优先使用 `useId`

## 用法

### 使用

```ts
// 在src的业务代码中使用
import { getBrowserLang } from '@2030/utils'
```
