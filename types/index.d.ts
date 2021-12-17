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
}

declare module "decrypt-core" {
  export = decryptCore
}
