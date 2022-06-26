import qs from 'query-string'
import md5 from 'crypto-js/md5'

/**
 * 判断是否为空值
 * @param {any} data 数据
 * @returns {boolean} res
 */
function isBlank(data) {
  return data === undefined || data === null || data === ''
}

/**
 * 判断是否为对象
 * @param {any} data 数据
 * @returns {boolean} res
 */
function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

/**
 * 将对象字段名按 ASCII 升序（字典序）排列并去掉空值，并 URL 序列化
 * @param {Object} params 待签名数据
 * @returns {string} str 排序结果
 */
function sortParams(params) {
  const sortedParams = {}
  const sortKeys = Object.keys(params).sort()
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < sortKeys.length; index++) {
    const key = sortKeys[index]
    const value = params[key]
    /* istanbul ignore if */
    if (!isBlank(value)) {
      if (typeof value === 'string') {
        sortedParams[key] = value.replace(' ', '')
      } else {
        sortedParams[key] = value
      }
    }
  }
  return sortedParams
}

/**
 * 将对象按 URL 键值对格式化为字符串，若传入了 appKey 会在最后将其拼接上
 * @param {Object} params 待签名数据
 * @param {string?} appKey 加密秘钥
 */
function urlEncode(params, appKey) {
  const str = qs.stringify(params)
  return appKey ? `${str}&key=${appKey}` : str
}

/**
 * 生成签名
 * @param {Object} data 待签名数据
 * @param {string} appKey 加密秘钥
 */
export function createSign(data, appKey) {
  if (!isObject(data)) {
    throw new Error('data type error, data should be Object')
  }
  const sortedData = sortParams(data)
  const str = urlEncode(sortedData, appKey)
  return md5(str).toString().toUpperCase()
}

/**
 * 验证签名
 * @param {Object} data 请求数据对象
 * @param {string} appKey 加密秘钥
 * @param {Object} options
 * @param {string} options.signKey default: 'sign
 * @return {boolean} isVerified
 */
export function verifySign(data, appKey, {
  signKey = 'sign',
} = {}) {
  if (!isObject(data)) {
    throw new Error('data type error, data should be Object')
  }
  const sign = data[signKey]
  if (!sign) {
    throw new Error('signature field not found')
  }
  const tdata = { ...data, [signKey]: null } // 去掉原始数据的 sign 字段
  const tsign = createSign(tdata, appKey)
  return tsign === sign
}
