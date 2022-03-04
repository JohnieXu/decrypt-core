# decrypt-core

[![NPM version][npm-image]][npm-url] [![NPM downloads](https://img.shields.io/npm/dm/decrypt-core)](https://www.npmjs.com/package/decrypt-core) 

[npm-image]: https://img.shields.io/npm/v/decrypt-core
[npm-url]: https://www.npmjs.com/package/decrypt-core

基于 3DES 算法的数据加解密核心库

## 特性

- 使用简单-提供加密解密函数
- 稳定性高-公司真实项目接入使用
- 支持多环境-支持Node.js、web浏览器、各种小程序、RN及weex跨平台框架

## 使用

全局暴露两个核心方法`encrypt`和`decrypt`，引入项目后直接使用即可

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

全局同时还暴露了工具方法 `isEncryptedData` ，可用于检查数据是否是数据加密方法 `encrypt` 返回的数据格式

```js
import { isEncryptedData } from 'decrypt-core'

isEncryptedData('123445) // false 不是加密数据格式

isEncryptedData('93468187855434817844048812694314B1382F05951542D6B98311D90CD0B97E22E6D052DE6A9B83381E97E8B23AC5209F8D4E6428C697EAEFEB495FCF7673E48E4D7087A2B24CEAFE127793421DAB91FCD411D04B85BCC5427DB76E6D3353BE8897BE1DAE3D28DBDF053D7707BACF0AC77CCF0426BA8F76E9FC578D8D91803289F53AD66A70AF73B0756B97F314D33997191E8E976EDFAFA46A75CC393A88B1') // true 是加密数据格式
```

## 相关项目

- CLI命令行工具-[xtjk-decrypt](https://github.com/JohnieXu/xtjk-decrypt)

## NPM脚本

- `lint`-代码格式检查
- `test`-执行测试用例
- `test:coverage`-统计测试覆盖率
- `build`-使用[father](https://github.com/umijs/father)进行打包
- `anaysis`-使用当前机器进行加密比率、速率分析
- `anaysis:write`-使用当前机器进行加密比率、速率分析并写入结果到 README.md（需要先将此文件中已有结果删除并用占位符`<--anaysis-->`代替）

## 压缩率

> `npm run anaysis`

```json
[
  {
    "length": "2byte",
    "encLength": "64byte",
    "time": "3ms",
    "ratio": "3200.0000%",
    "type": "英文"
  },
  {
    "length": "100byte",
    "encLength": "256byte",
    "time": "4ms",
    "ratio": "256.0000%",
    "type": "英文"
  },
  {
    "length": "1000byte",
    "encLength": "2048byte",
    "time": "11ms",
    "ratio": "204.8000%",
    "type": "英文"
  },
  {
    "length": "10000byte",
    "encLength": "20064byte",
    "time": "64ms",
    "ratio": "200.6400%",
    "type": "英文"
  },
  {
    "length": "50000byte",
    "encLength": "100064byte",
    "time": "244ms",
    "ratio": "200.1280%",
    "type": "英文"
  },
  {
    "length": "100000byte",
    "encLength": "200064byte",
    "time": "516ms",
    "ratio": "200.0640%",
    "type": "英文"
  },
  {
    "length": "3byte",
    "encLength": "64byte",
    "time": "13ms",
    "ratio": "2133.3333%",
    "type": "中文"
  },
  {
    "length": "102byte",
    "encLength": "192byte",
    "time": "2ms",
    "ratio": "188.2353%",
    "type": "中文"
  },
  {
    "length": "1002byte",
    "encLength": "1408byte",
    "time": "4ms",
    "ratio": "140.5190%",
    "type": "中文"
  },
  {
    "length": "10002byte",
    "encLength": "13408byte",
    "time": "41ms",
    "ratio": "134.0532%",
    "type": "中文"
  },
  {
    "length": "50001byte",
    "encLength": "66720byte",
    "time": "147ms",
    "ratio": "133.4373%",
    "type": "中文"
  },
  {
    "length": "100002byte",
    "encLength": "133408byte",
    "time": "287ms",
    "ratio": "133.4053%",
    "type": "中文"
  },
  {
    "length": "5byte",
    "encLength": "160byte",
    "time": "1ms",
    "ratio": "3200.0000%",
    "type": "中文混合"
  },
  {
    "length": "100byte",
    "encLength": "2048byte",
    "time": "5ms",
    "ratio": "2048.0000%",
    "type": "中文混合"
  },
  {
    "length": "1000byte",
    "encLength": "20032byte",
    "time": "53ms",
    "ratio": "2003.2000%",
    "type": "中文混合"
  },
  {
    "length": "10000byte",
    "encLength": "199904byte",
    "time": "429ms",
    "ratio": "1999.0400%",
    "type": "中文混合"
  },
  {
    "length": "50000byte",
    "encLength": "999456byte",
    "time": "2178ms",
    "ratio": "1998.9120%",
    "type": "中文混合"
  },
  {
    "length": "100000byte",
    "encLength": "1998848byte",
    "time": "5132ms",
    "ratio": "1998.8480%",
    "type": "中文混合"
  }
]
```

## 开源协议

[MIT License](./LICENSE)
