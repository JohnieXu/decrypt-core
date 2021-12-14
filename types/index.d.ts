/// <reference path="./util.d.ts" />
// https://segmentfault.com/a/1190000009247663

declare namespace decryptCore {
  /**
   * 加密
   * @param key 秘钥
   * @param data 待加密数据
   */
  function decrypt(key: string, data: string): string
  /**
   * 解密
   * @param key 秘钥
   * @param data 待解密数据
   */
  function encrypt(key: string, data: string): string
}

declare module "decrypt-core" {
  export = decryptCore
}
