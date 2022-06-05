/**
 * 生成适用于微信小程序的 miniprogram_dist 目录
 * 思路：
 * 1.使用之前的流程生成 CommonJS 格式的 lib 文件夹
 * 2.拷贝 lib 目录到 miniprogram_dist 目录
 * 3.借助 CopyWebpackPlugin 拷贝 crypto-js 依赖下的相关资源到 miniprogram_dist/crypto-js 目录下
 * 4.编写自定义 babel 插件，读取 miniprogram_dist/crypto.js 中 crypto-js 相关依赖的引入并修改为相对路径引入，完成后保存替换
 */

console.log('TODO:')
