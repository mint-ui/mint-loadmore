var cooking = require('cooking');

cooking.set({
  entry: {
    index: './src/index.js'
  },
  dist: './lib',
  publicPath: '/lib/',
  template: false,

  devServer: false,
  format: 'umd',
  moduleName: 'MintLoadmore',
  extractCSS: 'index.css',
  extends: ['vue2', 'lint', 'saladcss']
});

cooking.add('externals.vue', 'vue');

module.exports = cooking.resolve();