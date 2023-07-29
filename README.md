# decrypt-core

<div align="center">

[![NPM version][npm-image]][npm-url] [![NPM downloads](https://img.shields.io/npm/dm/decrypt-core)](https://www.npmjs.com/package/decrypt-core) 

[npm-image]: https://img.shields.io/npm/v/decrypt-core
[npm-url]: https://www.npmjs.com/package/decrypt-core

基于 3DES 算法的数据加解密核心库

</div>

## 特性

- 使用简单-提供加密、解密、签名函数
- 稳定性高-公司真实项目接入使用
- 支持多环境-支持 Node.js、web 浏览器、各种小程序、RN 及 weex 跨平台框架

## 使用

[这里](./CHANGELOG.md)可以查看变更记录

### 数据加解密

全局对外提供了两个核心方法 `encrypt` 和 `decrypt`，引入项目后直接使用即可

- ESM使用
  
  > 在支持ES6 Module时可使用import导入
  
  ```js
  import { encrypt, decrypt } from 'decrypt-core'
  const key = '15e89af5da164202a4f839a2f1e7320a'
  const data = '{"page":1,"size":10}'
  const encData = encrypt(data, key)
  const decData = decrypt(encData, key)
  console.log(`加密后数据：${encData}\n解密后数据：${decData}`)
  ```

- CJS使用
  
  ```js
  const { encrypt, decrypt } = require('decrypt-core')
  const key = '15e89af5da164202a4f839a2f1e7320a'
  const data = '{"page":1,"size":10}'
  const encData = encrypt(data, key)
  const decData = decrypt(encData, key)
  console.log(`加密后数据：${encData}\n解密后数据：${decData}`)
  ```

- UMD使用

  > 使用`script`标签引入`dist/index.umd.min.js`文件后，模块导出的全局变量在`window.decryptCore` 上

  ```html
  <script src="https://unpkg.com/decrypt-core@latest/dist/index.umd.min.js"></script>
  <script>
    var key = '15e89af5da164202a4f839a2f1e7320a'
    const data = '{"page":1,"size":10}'
    const encData = window.decryptCore.encrypt(data, key)
    const decData = window.decryptCore.decrypt(encData, key)
    console.log(`加密后数据：${encData}\n解密后数据：${decData}`)
  </script>
  ```

### 校验加密数据格式

全局对外提供了工具方法 `isEncryptedData` ，可用于检查数据是否是数据加密方法 `encrypt` 返回的数据格式

```js
import { isEncryptedData } from 'decrypt-core'

isEncryptedData('123445') // false 不是加密数据格式

isEncryptedData('93468187855434817844048812694314B1382F05951542D6B98311D90CD0B97E22E6D052DE6A9B83381E97E8B23AC5209F8D4E6428C697EAEFEB495FCF7673E48E4D7087A2B24CEAFE127793421DAB91FCD411D04B85BCC5427DB76E6D3353BE8897BE1DAE3D28DBDF053D7707BACF0AC77CCF0426BA8F76E9FC578D8D91803289F53AD66A70AF73B0756B97F314D33997191E8E976EDFAFA46A75CC393A88B1') // true 是加密数据格式
```

### 加签验签

> v1.2.0 及以上版本支持

全局对外提供两个签名相关方法 `createSign` 和 `verifySign`，可用于对数据进行加签、验签

```js
import { createSign, verifySign } from 'decrypt-core'
const data = { page: 1, size: 10 }
const key = '15e89af5da164202a4f839a2f1e7320a'
const sign = createSign(data, key) // 返回签名字符串
const dataSigned1 = { ...data, sign: 'aaaa' }
const dataSigned2 = { ...data, sign }
verifySign(data, key) // 报错：signature field not found
verifySign(dataSigned1, key) // false 验签未通过
verifySign(dataSigned2, key) // true 验签通过

```

## 相关项目

- CLI命令行工具-[xtjk-decrypt](https://github.com/JohnieXu/xtjk-decrypt)
- Chrome插件-[xtjk-decrypt-chrome](https://github.com/JohnieXu/xtjk-decrypt-chrome)
- 微信小程序示例-[xtjk-decrypt-mp](https://github.com/JohnieXu/xtjk-decrypt-mp)

## NPM脚本

- `lint`-代码格式检查
- `test`-执行测试用例
- `test:coverage`-统计测试覆盖率
- `coverage`-统计测试覆盖率并在 coverage 目录生成结果详情
- `build`-使用[father](https://github.com/umijs/father)进行打包
- `anaysis`-使用当前机器进行加密比率、速率分析
- `anaysis:write`-使用当前机器进行加密比率、速率分析并写入结果到 README.md

## 压缩率

> `npm run anaysis`

```json
[
  {
    "length": "2byte",
    "encLength": "64byte",
    "time": "4ms",
    "ratio": "3200.0000%",
    "type": "英文"
  },
  {
    "length": "100byte",
    "encLength": "256byte",
    "time": "5ms",
    "ratio": "256.0000%",
    "type": "英文"
  },
  {
    "length": "1000byte",
    "encLength": "2048byte",
    "time": "10ms",
    "ratio": "204.8000%",
    "type": "英文"
  },
  {
    "length": "10000byte",
    "encLength": "20064byte",
    "time": "101ms",
    "ratio": "200.6400%",
    "type": "英文"
  },
  {
    "length": "50000byte",
    "encLength": "100064byte",
    "time": "283ms",
    "ratio": "200.1280%",
    "type": "英文"
  },
  {
    "length": "100000byte",
    "encLength": "200064byte",
    "time": "510ms",
    "ratio": "200.0640%",
    "type": "英文"
  },
  {
    "length": "3byte",
    "encLength": "64byte",
    "time": "11ms",
    "ratio": "2133.3333%",
    "type": "中文"
  },
  {
    "length": "102byte",
    "encLength": "480byte",
    "time": "2ms",
    "ratio": "470.5882%",
    "type": "中文"
  },
  {
    "length": "1002byte",
    "encLength": "4064byte",
    "time": "13ms",
    "ratio": "405.5888%",
    "type": "中文"
  },
  {
    "length": "10002byte",
    "encLength": "40000byte",
    "time": "115ms",
    "ratio": "399.9200%",
    "type": "中文"
  },
  {
    "length": "50001byte",
    "encLength": "199712byte",
    "time": "479ms",
    "ratio": "399.4160%",
    "type": "中文"
  },
  {
    "length": "100002byte",
    "encLength": "399296byte",
    "time": "922ms",
    "ratio": "399.2880%",
    "type": "中文"
  },
  {
    "length": "5byte",
    "encLength": "160byte",
    "time": "1ms",
    "ratio": "3200.0000%",
    "type": "中英混合"
  },
  {
    "length": "100byte",
    "encLength": "2048byte",
    "time": "5ms",
    "ratio": "2048.0000%",
    "type": "中英混合"
  },
  {
    "length": "1000byte",
    "encLength": "20032byte",
    "time": "55ms",
    "ratio": "2003.2000%",
    "type": "中英混合"
  },
  {
    "length": "10000byte",
    "encLength": "199968byte",
    "time": "502ms",
    "ratio": "1999.6800%",
    "type": "中英混合"
  },
  {
    "length": "50000byte",
    "encLength": "999392byte",
    "time": "2669ms",
    "ratio": "1998.7840%",
    "type": "中英混合"
  },
  {
    "length": "100000byte",
    "encLength": "1998720byte",
    "time": "4953ms",
    "ratio": "1998.7200%",
    "type": "中英混合"
  }
]
```

## 开源协议

[MIT License](./LICENSE)

## 参与贡献

### PR

### 发包工作流

详细版（手动）：

1. 修改代码并执行测试 `npm test`
2. commit 代码 `git commit -m "..."`
3. 修改 `package.json` 版本号
4. 生成变更记录 `npm run changelog`
5. commit `package.json` 和 `CHANGELOG.md` 文件
6. 创建 Tag `git tag xxx`
7. 推送 Tag `git push origin master --tags`
8. 构建项目 `npm run build` 
9. 发布 npm 包 `npm publish`
    
简洁版（自动）：***推荐使用**

1. 修改代码并执行测试 `npm test`
2. 更新版本号、生成变更记录、创建 Tag `npm version <patch | minor | major>`，例如：`npm version patch`
3. 推送 Tag `git push origin master --tags`
4. 在 github 仓库中[创建一个 Release](https://github.com/JohnieXu/decrypt-core/releases/new)，然后 [Action](https://github.com/JohnieXu/decrypt-core/actions/workflows/node.js.cd.yml) 会自动发布 npm 包

变更记录生成请参考：[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli#readme)
