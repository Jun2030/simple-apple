/**
 * 表示可能为null的类型
 * @template T 原始类型
 * @example
 * type MaybeString = Nullable<string>
 * // 结果: string | null
 */
declare type Nullable<T> = T | null

/**
 * 表示一个对象,其键为字符串,值为指定类型
 * @template T 值的类型
 * @example
 * type StringNumberRecord = Recordable<number>
 * // 结果: { [key: string]: number }
 */
declare type Recordable<T> = Record<string, T>

/**
 * 创建一个新类型,其中指定的属性变为可选
 * @template T 原始类型
 * @template K 要变为可选的属性的键
 * @example
 * type Person = { name: string; age: number; address: string }
 * type PartialPerson = Partible<Person, 'age' | 'address'>
 * // 结果: { name: string; age?: number; address?: string }
 */
declare type Partible<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 将对象的键值对转换为数组
 * @template T 对象类型
 * @example
 * type Obj = { a: number; b: string }
 * type Result = ObjToKeyValArray<Obj>
 * // 结果: ['a', number] | ['b', string]
 */
declare type ObjToKeyValArray<T> = { [K in keyof T]: [K, T[K]] }[keyof T]
