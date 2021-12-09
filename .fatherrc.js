export default {
  entry: 'src/index.js',
  target: 'browser',
  esm: 'babel',
  cjs: 'babel',
  umd: {
    minFile: true,
    sourcemap: true
  }
}
