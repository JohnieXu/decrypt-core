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

isEncryptedData('123445') // false 不是加密数据格式

isEncryptedData('93468187855434817844048812694314B1382F05951542D6B98311D90CD0B97E22E6D052DE6A9B83381E97E8B23AC5209F8D4E6428C697EAEFEB495FCF7673E48E4D7087A2B24CEAFE127793421DAB91FCD411D04B85BCC5427DB76E6D3353BE8897BE1DAE3D28DBDF053D7707BACF0AC77CCF0426BA8F76E9FC578D8D91803289F53AD66A70AF73B0756B97F314D33997191E8E976EDFAFA46A75CC393A88B1') // true 是加密数据格式
```

## 相关项目

- CLI命令行工具-[xtjk-decrypt](https://github.com/JohnieXu/xtjk-decrypt)
- Chrome插件-[xtjk-decrypt-chrome](https://github.com/JohnieXu/xtjk-decrypt-chrome)
- 微信小程序示例-[xtjk-decrypt-mp](https://github.com/JohnieXu/xtjk-decrypt-mp)

## NPM脚本

- `lint`-代码格式检查
- `test`-执行测试用例
- `test:coverage`-统计测试覆盖率
- `build`-使用[father](https://github.com/umijs/father)进行打包
- `anaysis`-使用当前机器进行加密比率、速率分析
- `anaysis:write`-使用当前机器进行加密比率、速率分析并写入结果到 README.md

## 压缩率

> `npm run anaysis`

```json
<--anaysis-->
```

## 开源协议

[MIT License](./LICENSE)
