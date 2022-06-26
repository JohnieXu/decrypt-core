const { isEncryptedData } = require('../lib/util')
const { isEncryptedData: isEncryptedData2 } = require('../lib')
const { byteToString, stringToByte } = require('../lib/util')

// isEncryptedData功能正常
describe('isEncryptedData worked successfully', () => {
  it('isEncryptedData check both encrypted data and not-encrypted data', () => {
    const dataf = [
      1,
      1.1,
      true,
      false,
      null,
      {},
      undefined,
      '',
      '123445',
      '3716866853696999839973506912062',
    ]
    const datas = [
      '37168668536969998399735069120621',
      '37168668536969998399735069120621DE97D817489E5035A12141771D1AE8D0',
      '93468187855434817844048812694314B1382F05951542D6B98311D90CD0B97E22E6D052DE6A9B83381E97E8B23AC5209F8D4E6428C697EAEFEB495FCF7673E48E4D7087A2B24CEAFE127793421DAB91FCD411D04B85BCC5427DB76E6D3353BE8897BE1DAE3D28DBDF053D7707BACF0AC77CCF0426BA8F76E9FC578D8D91803289F53AD66A70AF73B0756B97F314D33997191E8E976EDFAFA46A75CC393A88B1',
    ]
    dataf.forEach((data) => {
      expect(() => {
        isEncryptedData(data)
      }).not.toThrowError()
      expect(isEncryptedData(data)).toStrictEqual(false)
    })

    datas.forEach((data) => {
      expect(() => {
        isEncryptedData(data)
      }).not.toThrowError()
      expect(isEncryptedData(data)).toStrictEqual(true)
    })
  })
})

// isEncryptedData应该被包入口文件导出
describe('isEncryptedData should be exported by entrypoint', () => {
  it('isEncryptedData2 check both encrypted data and not-encrypted data', () => {
    const dataf = [
      1,
      1.1,
      true,
      false,
      null,
      {},
      undefined,
      '',
      '123445',
      '3716866853696999839973506912062',
    ]
    const datas = [
      '37168668536969998399735069120621',
      '37168668536969998399735069120621DE97D817489E5035A12141771D1AE8D0',
      '93468187855434817844048812694314B1382F05951542D6B98311D90CD0B97E22E6D052DE6A9B83381E97E8B23AC5209F8D4E6428C697EAEFEB495FCF7673E48E4D7087A2B24CEAFE127793421DAB91FCD411D04B85BCC5427DB76E6D3353BE8897BE1DAE3D28DBDF053D7707BACF0AC77CCF0426BA8F76E9FC578D8D91803289F53AD66A70AF73B0756B97F314D33997191E8E976EDFAFA46A75CC393A88B1'
    ]
    dataf.forEach((data) => {
      expect(() => {
        isEncryptedData2(data)
      }).not.toThrowError()
      expect(isEncryptedData2(data)).toStrictEqual(false)
    })

    datas.forEach((data) => {
      expect(() => {
        isEncryptedData2(data)
      }).not.toThrowError()
      expect(isEncryptedData2(data)).toStrictEqual(true)
    })
  })
})

describe('util', () => {
  it('byteToString worked with stringToByte', () => {
    const str = 'hello world'
    let byte
    let str2
    expect(() => {
      byte = stringToByte(str)
      str2 = byteToString(byte)
    }).not.toThrowError()
    expect(str).toBe(str2)
  })
  it('byteToString', () => {
    const str = 'hello world'
    expect(byteToString(str)).toBe(str)
  })
})
