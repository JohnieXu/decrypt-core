declare function s2as(length: number): string
declare function strToHexCharCode(str: string): string
declare function hexCharCodeToStr(str: string): string
declare function padding80(data: string, toHex: boolean): string
declare function byteToString(arr: number[]): string
declare function stringToByte(str: string): number[]

declare module "decrypt-core/es/util" {
  export {
    s2as,
    strToHexCharCode,
    hexCharCodeToStr,
    padding80,
    byteToString,
    stringToByte
  }
}

declare module "decrypt-core/lib/util" {
  export {
    s2as,
    strToHexCharCode,
    hexCharCodeToStr,
    padding80,
    byteToString,
    stringToByte
  }
}
