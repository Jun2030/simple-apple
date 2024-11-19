export class StoreConfig {
  // Pinia持久化存储默认为localStorage
  static DEFAULT_PERSIST_STORE = localStorage
  // Token默认存储时间, 单位 - 分钟，默认30天
  static DEFAULT_TOKEN_EXPIRE = 60 * 24 * 30
}
