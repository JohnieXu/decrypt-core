module.exports = {
  plugins: [
    ['module-resolver', {
      root: './',
      alias: {
        // 'crypto-js': ([, name]) => `./lib/crypto-js${name}`,
        'crypto-js': './lib/crypto-js',
      },
    }],
  ],
}
