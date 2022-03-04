/// <reference path="./util.d.ts" />
// https://segmentfault.com/a/1190000009247663

declare namespace decryptCore {
  type DataType = number | string | null | boolean | object | DataType[]
  
  /**
   * 加密
   * @param data 待加密数据
   * @param key 秘钥
   */
  function decrypt<T extends DataType>(data: T, key: string): T
  /**
   * 解密
   * @param data 待解密数据
   * @param key 秘钥
   */
  function encrypt<T extends DataType>(data: T, key: string): T
  /**
  * 校验数据是否符合已加密数据的格式要求
  * @param {any} data 待校验的数据
  * @returns Boolean 是否符合加密数据格式要求
  */
  function isEncryptedData(data: any): boolean
}

declare module "decrypt-core" {
  export = decryptCore
}
