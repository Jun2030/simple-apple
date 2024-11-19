/**
 * 匹配中国大陆手机号码
 * @example 13812345678, 15912345678, 18912345678
 */
export const PHONE_REG = /^1[3-9]\d{9}$/

/**
 * 是否含有数字
 * @example abc123, 123, 1a2b3c
 */
export const HAS_NUMBER_REG = /\d/

/**
 * 是否含有字母
 * @example abc123, 123, 1a2b3c
 */
export const HAS_LETTER_REG = /[a-z]/i

/**
 * 是否包含特殊字符
 * @example Abc1!3, 123@, 1a2b3c~
 */
export const HAS_SPECIAL_CHAR_REG = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

/**
 * 字母/数字/特殊字符,至少两种
 * @example Abc123, 123, 1a2b3c
 */
export const HAS_TWO_TYPES_REG = /^(?:(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])|(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]))[\w!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]+$/i

/**
 * 匹配常见的电子邮箱格式
 * @example user@example.com, john.doe@company.co.uk, info_123@site-name.org
 */
export const EMAIL_REG = /^[\w-]+@[\w-]+(\.[\w-]+)+$/

/**
 * 匹配18位身份证号码
 * @example 11010519491231890X, 11010519491231890X
 */
export const ID_CARD_REG = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[\dX]$/i
