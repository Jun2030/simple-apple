export class utilsConfig {
  // Storage默认AES加密密钥
  static CRYPTO_SECRET = '__SimpleCryptoSecret__'

  // Storage默认缓存时间（单位：分，默认：0分钟，永久缓存）
  static DEFAULT_CACHE_TIME = 0

  // Storage是否加密,默认不加密
  static IS_ENCRYPT = false

  // Storage-Forage默认配置
  static DEFAULT_FORAGE_CONFIG = {
    name: 'Sa',
    version: 1.0,
    size: 4980736,
    storeName: 'Sa',
  }
}
