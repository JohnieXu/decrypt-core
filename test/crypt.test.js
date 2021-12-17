const { encrypt, decrypt } = require('../lib/crypt')

describe('encrypt worked', () => {
  // 测试支持的加密数据类型
  it('encrypt data type', () => {
    const appKey = '12345678901234567890123456789012'
    const dataSupport = [
      123456,
      123456.123456,
      'fool bar',
      {
        fool: 'bar',
      },
      [123456, 123456.123456, 'fool bar', { fool: 'bar' }],
      [],
      null,
    ]
    const dataNotSupport = [
      undefined,
    ]
    dataSupport.forEach((data) => {
      expect(() => {
        // eslint-disable-next-line no-useless-catch
        try {
          encrypt(data, appKey)
        } catch (err) {
          throw err
        }
      }).not.toThrowError("Cannot read property 'length' of undefined")
    })
    dataNotSupport.forEach((data) => {
      expect(() => {
        // eslint-disable-next-line no-useless-catch
        try {
          encrypt(data, appKey)
        } catch (err) {
          throw err
        }
      }).toThrowError()
    })
  })

  // 测试加解密number
  it('crypt and decrypt number', () => {
    const appKey = '12345678901234567890123456789012'
    const datas = [123456, 123456.123456]
    datas.forEach((data) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })

  // 测试加解密string
  it('crypt and decrypt string', () => {
    const appKey = '12345678901234567890123456789012'
    const datas = ['fool bar']
    datas.forEach((data) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })

  // 测试加解密Object
  it('crypt and decrypt object', () => {
    const appKey = '12345678901234567890123456789012'
    const datas = [
      {
        fool: 'bar',
      },
      {},
    ]
    datas.forEach((data) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })

  // 测试加解密Array
  it('crypt and decrypt array', () => {
    const appKey = '12345678901234567890123456789012'
    const datas = [
      [123456, 123456.123456, 'fool bar', { fool: 'bar' }],
      [],
    ]
    datas.forEach((data) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })

  // 测试加解密null
  it('crypt and decrypt null', () => {
    const appKey = '12345678901234567890123456789012'
    const datas = [
      null,
    ]
    datas.forEach((data) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })

  // 测试加解密Boolean
  it('crypt and decrypt boolean', () => {
    const appKey = '12345678901234567890123456789012'
    const datas = [
      true,
      false,
    ]
    datas.forEach((data) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })

  // 测试加密秘钥长度
  it('crypt and decrypt with different key', () => {
    const base = '12345678901234567890'
    const appKeys = [
      '', // 0
      base.substring(0, 1), // 1
      base.substring(0, 3), // 3
      base.substring(0, 6), // 6
      base.substring(0, 8), // 8
      (base + base).substring(0, 16), // 16
      (base + base + base + base).substring(0, 32), // 32
      (base + base + base + base + base).substring(0, 48), // 48
      new Array(10).fill(base).join(''), // 100
      new Array(100).fill(base).join(''), // 1000
      new Array(1000).fill(base).join(''), // 10000
    ]
    const data = 'fool bar'
    appKeys.forEach((appKey) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })

  // 测试解密服务端加密的数据 fix: #17(https://github.com/JohnieXu/xtjk-decrypt/issues/17)
  it('decrypt the certian data successfuly', () => {
    const data = '889594638720680348378471155236316534BE024ED96F86D053B5D10A674854724587F83B66A8196DC7139BC881DC9633BF351CE6CE1DDAF4F91325F07075BB'
    const appKey = 'af88571d9052413dac5cba915a94f8e3'
    const expectData = {
      page: 1,
      size: 10000,
    }
    let decrypted
    expect(() => {
      decrypted = decrypt(data, appKey)
    }).not.toThrowError()
    expect(decrypted).toEqual(expectData)
  })

  // 测试加密特殊字符
  it('crypt adn decrypt the unregular words', () => {
    const appKey = '12345678901234567890123456789012'
    const datas = [
      '😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗☺😚😙😋😛😜🤪😝🤑🤗', // https://unicode.org/emoji/charts/full-emoji-list.html#1f600
      'U+1F600',
    ]
    datas.forEach((data) => {
      let encrypted
      let decrypted
      expect(() => {
        encrypted = encrypt(data, appKey)
        decrypted = decrypt(encrypted, appKey)
      }).not.toThrowError()
      expect(decrypted).toEqual(data)
    })
  })
})
