/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
// const Hex = require('crypto-js/enc-hex')
// const TripleDES = require('crypto-js/tripledes')
// const Core = require('crypto-js/core')
import Hex from 'crypto-js/enc-hex'
import TripleDES from 'crypto-js/tripledes'
import Core from 'crypto-js/core'

import {
  s2as,
  padding80,
  hexCharCodeToStr,
  strToHexCharCode,
} from './util'

/**
 * Electronic Codebook block mode.
 */
const CryptoECB = (function () {
  const ECB = Core.lib.BlockCipherMode.extend()

  ECB.Encryptor = ECB.extend({
    processBlock(words, offset) {
      this._cipher.encryptBlock(words, offset)
    },
  })

  ECB.Decryptor = ECB.extend({
    processBlock(words, offset) {
      this._cipher.decryptBlock(words, offset)
    },
  })

  return ECB
}())

/**
* A noop padding strategy.
*/
const NoPadding = {
  pad() {
  },

  unpad() {
  },
}

// 加密
export function encryptByDES(mpiKey, message, isSessionKey) {
  mpiKey += mpiKey.substring(0, 16)
  // console.log("秘钥："+mpiKey)
  // 转16进制
  // console.log(message)
  // 过程密钥不做填充
  if (!isSessionKey) {
    message = padding80(message, true)
    // console.log('padding:'+message)
  }
  message = Hex.parse(message)

  // console.log(`mpiKey: ${mpiKey}`)
  // console.log(`message: ${message}`)

  const keyHex = Hex.parse(mpiKey)
  const encrypted = TripleDES.encrypt(message, keyHex, {
    mode: CryptoECB,
    padding: NoPadding,
  })

  // console.log("加密密文："+encrypted.ciphertext.toString().toUpperCase())

  return encrypted.ciphertext.toString().toUpperCase()
}

// 3des解密
export function decryptByDES(mpiKey, ciphertext) {
  // mpiKey = "77c3052b141a481dd2f377c51571812c"
  mpiKey += mpiKey.substring(0, 16)
  const keyHex = Hex.parse(mpiKey)
  ciphertext = Hex.parse(ciphertext)
  // direct decrypt ciphertext
  const decrypted = TripleDES.decrypt(
    {
      ciphertext,
    },
    keyHex,
    {
      mode: CryptoECB,
      padding: NoPadding,
    },
  )
  let data = decrypted.toString()
  // console.log(`data:${data}`)
  data = hexCharCodeToStr(data)
  // console.log('data2:'+data)
  const num = data.lastIndexOf('80')
  // 截取actionInfoString
  // 最后一个'80'出现的位置
  if (num !== -1) {
    data = data.substring(0, num)
  }
  const result = hexCharCodeToStr(data)
  return result
}

/**
* 创建加密报文
* @param config
*/
export function createContent(config, appkey) {
  // 最终生成密文

  // 生成随机数
  const randData = s2as(32)
  // console.log("随机数:"+randData)
  const mpiKey = appkey
  // 获取过程密钥
  const processKey = encryptByDES(mpiKey, randData, true)
  // console.log("过程秘钥:"+processKey)
  // 加密ActionInfo
  // console.log('json明文:'+JSON.stringify(config))
  const src = strToHexCharCode(JSON.stringify(config))
  // console.log('16进制明文:'+src)
  const actionInfo = encryptByDES(processKey, src, false)
  const encStr = randData + actionInfo
  return encStr
}
// 解析数据
export function resolveContent(actionInfo, appkey) {
  const mpiKey = appkey
  // 获取随机数
  const randData = actionInfo.substring(0, 32)
  // console.log(`de-randData : ${randData}`)
  // 获取应用密文
  const singData = actionInfo.substring(32, actionInfo.length)
  // console.log(`de-enData : ${singData}`)
  // 获取过程密钥
  const processKey = encryptByDES(mpiKey, randData, true)
  // console.log(`de-processKey : ${processKey}`)
  // 解密singData
  const actionInfoString = decryptByDES(processKey, singData)
  // console.log(`de-HexString : ${actionInfoString}`)
  // console.log(`actionInfoString:${actionInfoString}`)
  let res
  try {
    res = JSON.parse(actionInfoString)
  } catch (e) {
    /* istanbul ignore next */
    res = actionInfoString
  }
  // console.log('parse json:'+json)
  return res
}
