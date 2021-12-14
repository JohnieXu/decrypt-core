declare module "decrypt-core/es/util" {
  /**
   * 生成随机字符串
   * @param length 长度
   */
  export function s2as(length: number): string
  /**
   * 字符串转16进制
   * @param str 字符串
   */
  export function strToHexCharCode(str: string): string
  /**
   * 16进制字符日转普通字符串
   * @param str 16 进制字符串
   */
  export function hexCharCodeToStr(str: string): string
  /**
   * 补80
   * @param data 数据
   * @param toHex 是否转换为16进制
   */
  export function padding80(data: string, toHex: boolean): string
  /**
   * 字节数组转字符串
   * @param arr 字节数组
   */
  export function byteToString(arr: number[]): string
  /**
   * 字符串转字节数组
   * @param str 字符串
   */
  export function stringToByte(str: string): number[]
}

declare module "decrypt-core/lib/util" {
  /**
   * 生成随机字符串
   * @param length 长度
   */
   export function s2as(length: number): string
   /**
    * 字符串转16进制
    * @param str 字符串
    */
   export function strToHexCharCode(str: string): string
   /**
    * 16进制字符日转普通字符串
    * @param str 16 进制字符串
    */
   export function hexCharCodeToStr(str: string): string
   /**
    * 补80
    * @param data 数据
    * @param toHex 是否转换为16进制
    */
   export function padding80(data: string, toHex: boolean): string
   /**
    * 字节数组转字符串
    * @param arr 字节数组
    */
   export function byteToString(arr: number[]): string
   /**
    * 字符串转字节数组
    * @param str 字符串
    */
   export function stringToByte(str: string): number[]
}
