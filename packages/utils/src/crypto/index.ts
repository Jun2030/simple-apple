import { AES, enc, MD5 } from 'crypto-js'
import { utilsConfig } from '../config'

const { CRYPTO_SECRET } = utilsConfig

export default class CryptoJS<T extends object> {
  /**
   * @description 加密密钥
   */
  secret: string

  /**
   * @description 构造函数
   * @param {string} secret - 加密密钥
   */
  constructor(secret: string) {
    this.secret = secret || CRYPTO_SECRET
  }

  /**
   * @description AES加密
   * @param {unknown} data - 需要加密的数据
   * @returns {string} - 返回加密后的字符串
   */
  encrypt(data: T): string {
    const encryptData: string = JSON.stringify(data)
    return AES.encrypt(encryptData, this.secret).toString()
  }

  /**
   * @description 解密加密字符串
   * 使用AES算法解密给定的字符串，并尝试将其解析为JSON对象
   * 如果解析失败，则返回null
   * @param encrypted {string} - 已加密的字符串
   * @returns {(T | null)} - 解密并解析后的JSON对象，失败时返回null
   */decrypt(encrypted: string) {
    const decrypted = AES.decrypt(encrypted, this.secret)
    const dataString = decrypted.toString(enc.Utf8)
    try {
      return JSON.parse(dataString) as T
    } catch {
      return null
    }
  }

  /**
   * @description MD5计算数据
   * @param str 要加密的字符串
   * @returns 加密后的字符串
   */
  encryptMD5(str: string): string {
    return MD5(str).toString()
  }
}

export const { encrypt, decrypt, encryptMD5 } = new CryptoJS(CRYPTO_SECRET)
