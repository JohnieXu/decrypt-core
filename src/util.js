/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

export function s2as(length) {
  let strNumber = ''
  for (let i = 0; i < length; i++) strNumber += (Math.floor(Math.random() * 10000) % 10).toString()

  let result = ''
  for (let j = 0; j < strNumber.length; j++) {
    result += String.fromCharCode(strNumber.substring(j, j + 1).charCodeAt())
  }
  return result
}

// 字符串转16进制
export function strToHexCharCode(str) {
  // 根据默认编码获取字节数组
  const bytes = stringToByte(str)
  const hexString = '0123456789abcdef'
  let sb = ''
  // 将字节数组中每个字节拆解成2位16进制整数
  for (let i = 0; i < bytes.length; i++) {
    sb += hexString.charAt((bytes[i] & 0xf0) >> 4)
    sb += hexString.charAt((bytes[i] & 0x0f) >> 0)
  }
  return sb.toString()
}

// 16进制转字符串
export function hexCharCodeToStr(hexCharCodeStr) {
  const baos = []
  const hexString = '0123456789abcdef'
  // 将每2位16进制整数组装成一个字节
  for (let i = 0; i < hexCharCodeStr.length; i += 2) {
    baos.push(
      (hexString.indexOf(hexCharCodeStr.charAt(i)) << 4)
          | hexString.indexOf(hexCharCodeStr.charAt(i + 1)),
    )
  }

  return byteToString(baos)
}

// 补80
export function padding80(data, toHex = true) {
  const padlen = 8 - ((data.length / 2) % 8)
  let padstr = ''
  for (let i = 0; i < padlen - 1; i++) padstr += '00'
  data = `${data}80${padstr}`
  data = toHex ? strToHexCharCode(data) : data
  return data
}

// 字节转string
export function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr
  }
  let str = ''
  const _arr = arr
  for (let i = 0; i < _arr.length; i++) {
    const one = _arr[i].toString(2)
    const v = one.match(/^1+?(?=0)/)
    if (v && one.length === 8) {
      const bytesLength = v[0].length
      let store = _arr[i].toString(2).slice(7 - bytesLength)
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      str += String.fromCharCode(parseInt(store, 2))
      i += bytesLength - 1
    } else {
      str += String.fromCharCode(_arr[i])
    }
  }
  return str
}

// string转字节
export function stringToByte(str) {
  const bytes = []
  let len
  let c
  // eslint-disable-next-line prefer-const
  len = str.length
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0)
      bytes.push(((c >> 12) & 0x3f) | 0x80)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0)
      bytes.push((c & 0x3f) | 0x80)
    } else {
      bytes.push(c & 0xff)
    }
  }
  return bytes
}

/**
 * @deprecated 此方法转换有误，使用 strToHexCharCode 方法代替
 * @param {String} str 待转换的字符串
 * @returns 十六进制字符串
 */
export function hexEncode(str) {
  let hex; let
    i

  let result = ''
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16)
    result += (`000${hex}`).slice(-4)
  }

  return result
}

/**
 * @deprecated 此方法转换有误，使用 hexCharCodeToStr 方法代替
 * @param {String} str 待转换的十六进制字符串
 * @returns 字符串
 */
export function hexDecode(str) {
  let j
  const hexes = str.match(/.{1,4}/g) || []
  let back = ''
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16))
  }

  return back
}

/**
 * 校验数据是否符合已加密数据的格式要求
 * @param {any} data 待校验的数据
 * @returns Boolean 是否符合加密数据格式要求
 */
export function isEncryptedData(data) {
  const reg = /^[A-Z\d]+$/
  return !(typeof data !== 'string' || data.length < 32 || !reg.test(data))
}
