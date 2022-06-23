const automator = require('miniprogram-automator')

describe('encrypt in miniprogram', () => {
  let mp
  let page
  beforeAll(async () => {
    mp = await automator.launch({
      projectPath: '/Users/johniexu/Documents/github/xtjk-decrypt-mp',
    })
    page = await mp.reLaunch('/pages/index/index')
    await page.waitFor(500)
  }, 30 * 1000)

  it('encrypt success', async () => {
    const btn = await page.$('.btn-encrypt')
    expect(btn.tagName).toBe('button')
    expect(await btn.text()).toBe('测试加密')
    await btn.tap()
    await page.waitFor(200)
    // expect()
  })

  afterAll(async () => {
    await mp.close()
  })
})
