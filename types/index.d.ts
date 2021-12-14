/// <reference path="./util.d.ts" />
// https://segmentfault.com/a/1190000009247663

declare namespace decryptCore {
  function decrypt(key: string, data: string): string
  function encrypt(key: string, data: string): string
}

declare module "decrypt-core" {
  export = decryptCore
}
