const { createSign, verifySign } = require('../lib/index')

describe('createSign worked', () => {
  it('createSign normal object', () => {
    const data = { foo: 'bar' }
    const appKey = '12345678901234567890123456789012'
    expect(() => {
      createSign(data, appKey)
    }).not.toThrowError()
  })
  it('createSign wrong data type throw error', () => {
    const datas = [undefined, null, '', false, true, 100]
    const appKey = '12345678901234567890123456789012'
    datas.forEach((data) => {
      expect(() => {
        createSign(data, appKey)
      }).toThrowError('data type error, data should be Object')
    })
  })
})

describe('verifySign worked', () => {
  it('verifySign throw error', () => {
    const data = { foo: 'bar' }
    const appKey = '12345678901234567890123456789012'
    expect(() => {
      verifySign(data, appKey)
    }).toThrowError('signature field not found')
  })
  it('verifySign wrong data type throw error', () => {
    const datas = [undefined, null, '', false, true, 100]
    const appKey = '12345678901234567890123456789012'
    datas.forEach((data) => {
      expect(() => {
        verifySign(data, appKey)
      }).toThrowError('data type error, data should be Object')
    })
  })
})

describe('create and verify sign success', () => {
  it('verifySign certian data success', () => {
    const data = {
      appId: '4182000002021',
      deviceId: 'dlyh',
      merNoNo: '182000001021',
      authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ODI3MzY3NTkxIiwiZXhwIjoxNjU1NjIzNDg3fQ.zjxKPC_jDTZ6g6mZNcNK66kiIQj0QUtJ9tIZyOOY0Zf11zritEweAENW80pbADOhSxHA5we1u4ufYCY3KGnDBQ',
      msgId: '202206181524486401074',
      body: '4156764674149137353913433062998105D4677EC05B6246604569B8AD45B531F36F974342870C602B84876548D357A75E8BE8B890524A4BC6D046FBBEC40E3DCE5ED5469B66ECE470095C04E08A30427137A32DA8508602CB8386AC00FD389525587C6103A0651A6E4439D92521DAAB',
      encodeMethod: '1',
      signMethod: '1',
      sign: 'BC8056A3F7929A7EECA3230C62BD0308',
    }
    const appKey = 'dff25f7832a4467b85cd04921c8119ec'
    let res
    expect(() => {
      res = verifySign(data, appKey)
    }).not.toThrowError()
    expect(res).toEqual(true)
  })
  it('verifySign data without sign should throw error', () => {
    const data = {
      appId: '4182000002021',
      deviceId: 'dlyh',
    }
    const appKey = 'dff25f7832a4467b85cd04921c8119ec'
    let res
    expect(() => {
      res = verifySign(data, appKey)
    }).toThrowError('signature field not found')
    expect(res).toBeUndefined()
  })
  it('createSign verifySign worked together', () => {
    const data = {
      appId: '4182000002021',
      deviceId: 'dlyh',
      merNoNo: '182000001021',
      authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ODI3MzY3NTkxIiwiZXhwIjoxNjU1NjIzNDg3fQ.zjxKPC_jDTZ6g6mZNcNK66kiIQj0QUtJ9tIZyOOY0Zf11zritEweAENW80pbADOhSxHA5we1u4ufYCY3KGnDBQ',
      msgId: '202206181524486401074',
      body: '4156764674149137353913433062998105D4677EC05B6246604569B8AD45B531F36F974342870C602B84876548D357A75E8BE8B890524A4BC6D046FBBEC40E3DCE5ED5469B66ECE470095C04E08A30427137A32DA8508602CB8386AC00FD389525587C6103A0651A6E4439D92521DAAB',
      encodeMethod: '1',
      signMethod: '1',
    }
    const appKey = 'dff25f7832a4467b85cd04921c8119ec'
    let sign
    let verifyResult
    expect(() => {
      sign = createSign(data, appKey)
    }).not.toThrowError()
    expect(() => {
      data.sign = sign
      verifyResult = verifySign(data, appKey)
    }).not.toThrowError()
    expect(verifyResult).toEqual(true)
  })
  it('verifySign signKey options worked', () => {
    const data = {
      appId: '4182000002021',
      deviceId: 'dlyh',
      merNoNo: '182000001021',
      authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ODI3MzY3NTkxIiwiZXhwIjoxNjU1NjIzNDg3fQ.zjxKPC_jDTZ6g6mZNcNK66kiIQj0QUtJ9tIZyOOY0Zf11zritEweAENW80pbADOhSxHA5we1u4ufYCY3KGnDBQ',
      msgId: '202206181524486401074',
      body: '4156764674149137353913433062998105D4677EC05B6246604569B8AD45B531F36F974342870C602B84876548D357A75E8BE8B890524A4BC6D046FBBEC40E3DCE5ED5469B66ECE470095C04E08A30427137A32DA8508602CB8386AC00FD389525587C6103A0651A6E4439D92521DAAB',
      encodeMethod: '1',
      signMethod: '1',
    }
    const appKey = 'dff25f7832a4467b85cd04921c8119ec'
    let sign
    let verifyResult
    expect(() => {
      sign = createSign(data, appKey)
    }).not.toThrowError()
    expect(() => {
      data.signature = sign
      verifyResult = verifySign(data, appKey, { signKey: 'signature' })
    }).not.toThrowError()
    expect(verifyResult).toEqual(true)

    expect(() => {
      data.signature = sign
      verifyResult = verifySign(data, appKey, { signKey: 'sign' })
    }).toThrowError('signature field not found')
  })
})
