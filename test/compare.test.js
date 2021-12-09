/**
 * 测试 crypto.js 模块采用的工具方法和 tripleDes3 模块采用的工具方法逻辑是否相同
 */
const { encryptByDES, decryptByDES } = require('../lib/crypto')
const tripledes3 = require('../lib/tripledes3')
const util = require('../lib/util')

describe('strToHexCharCode worked samely', () => {
  it('result equals', () => {
    const datas = ['fool bar', '1234568000000000']
    datas.forEach((data) => {
      let hex1
      let hex2
      expect(() => {
        hex1 = tripledes3.strToHexCharCode(data)
        hex2 = util.strToHexCharCode(data)
      }).not.toThrowError()
      expect(hex1).toEqual(hex2)
    })
  })
})

describe('hexCharCodeToStr worked samely', () => {
  it('result equals', () => {
    const datas = ['414243']
    datas.forEach((data) => {
      let str1
      let str2
      expect(() => {
        str1 = tripledes3.hexCharCodeToStr(data)
        str2 = util.hexCharCodeToStr(data)
      }).not.toThrowError()
      expect(str1).toEqual(str2)
    })
  })
})

describe('stringToByte worked samely', () => {
  it('result equals', () => {
    const datas = ['414243']
    datas.forEach((data) => {
      let byte1
      let byte2
      expect(() => {
        byte1 = tripledes3.stringToByte(data)
        byte2 = util.stringToByte(data)
      }).not.toThrowError()
      expect(byte1).toEqual(byte2)
    })
  })
})

describe('byteToString worked samely', () => {
  it('result equals', () => {
    const datas = [[65, 66, 67]]
    datas.forEach((data) => {
      let str1
      let str2
      expect(() => {
        str1 = tripledes3.byteToString(data)
        str2 = util.byteToString(data)
      }).not.toThrowError()
      expect(str1).toEqual(str2)
    })
  })
})

describe('padding80 worked samely', () => {
  it('result equals', () => {
    const datas = ['foo bar', '135151614164164141']
    datas.forEach((data) => {
      let str1
      let str2
      expect(() => {
        str1 = tripledes3.padding80(data)
        str2 = util.padding80(data)
      }).not.toThrowError()
      expect(str1).toEqual(str2)
    })
  })
})

describe('encryptByDES worked samely', () => {
  it('result equals', () => {
    const key = 'af88571d9052413dac5cba915a94f8e3'
    const datas = ['88959463872068034837847115523631']
    datas.forEach((data) => {
      let str1
      expect(() => {
        str1 = encryptByDES(key, data, true)
      }).not.toThrowError()
      expect(str1).toEqual('3789333CD01884242579EDBFEC06FB84')
    })
  })
})

describe('encryptByDES worked samely', () => {
  it('result equals', () => {
    const key = 'af88571d9052413dac5cba915a94f8e3'
    const datas = ['123456', '88959463872068034837847115523631']
    datas.forEach((data) => {
      let str1
      let str2
      let str11
      let str21
      expect(() => {
        str1 = encryptByDES(key, data, true)
        str2 = tripledes3.encryptByDES(key, data, true)
        str11 = encryptByDES(key, data, false)
        str21 = tripledes3.encryptByDES(key, data, false)
      }).not.toThrowError()
      expect(str1).toEqual(str2)
      expect(str11).toEqual(str21)
    })
  })
})

describe('decryptByDES worked samely', () => {
  it('result equals', () => {
    const mpikey = '3789333CD01884242579EDBFEC06FB84'
    const datas = ['6534BE024ED96F86D053B5D10A674854724587F83B66A8196DC7139BC881DC9633BF351CE6CE1DDAF4F91325F07075BB']
    datas.forEach((data) => {
      let str1
      let str2
      expect(() => {
        str1 = decryptByDES(mpikey, data)
        str2 = tripledes3.decryptByDES(mpikey, data)
      }).not.toThrowError()
      expect(str1).toEqual(str2)
    })
  })
})
