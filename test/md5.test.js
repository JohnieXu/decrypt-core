const md5 = require('crypto-js/md5')

const md5up = (data) => md5(data).toString().toUpperCase()

describe('crypto-js/md5 worked samely with js-md5', () => {
  it('md5 certian data successfully and results are the same', () => {
    const data = 'a'
    let res
    expect(() => {
      res = md5up(data)
    }).not.toThrowError()
    expect(res).toEqual('0CC175B9C0F1B6A831C399E269772661')
  })
})
