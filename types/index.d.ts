/// <reference path="./util.d.ts" />
// https://segmentfault.com/a/1190000009247663

declare namespace decryptCore {
  interface BaseObject {
    [key: string]: any
    [key: number]: any
  }
  type BaseData = number | string | null | boolean | BaseObject
  type DataType = BaseData | Array<BaseData>
  
  /**
   * 解密
   * @param data 待解密数据
   * @param key 秘钥
   */
  function decrypt<T extends DataType>(data: T, key: string): T
  /**
   * 加密
   * @param data 待加密数据
   * @param key 秘钥
   */
  function encrypt<T extends DataType>(data: T, key: string): T
  /**
  * 校验数据是否符合已加密数据的格式要求
  * @param {any} data 待校验的数据
  * @returns Boolean 是否符合加密数据格式要求
  */
  function isEncryptedData(data: any): boolean
  /**
   * 加签
   * @param data 待加签数据
   * @param key 秘钥
   */
  function createSign(data: BaseObject, key: string): string
  /**
   * 验签
   * @param data 带有签名的数据对象
   * @param key 秘钥
   * @param options 配置项
   * @param options.signKey 数据对象中签名字段的 key
   */
  function verifySign(data: BaseObject, key: string, options?: {
    signKey: string = 'sign'
  }): boolean
}

declare module "decrypt-core" {
  export = decryptCore
}
