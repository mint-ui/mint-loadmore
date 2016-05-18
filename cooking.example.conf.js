var cooking = require('cooking');

cooking.set({
  entry: {
    build: './example/index.js'
  },
  dist: './example/dist',
  use: 'vue',
  publicPath: '/example/dist/',
  template: false,

  devServer: false,

  extends: ['vue', 'lint', 'saladcss']
});

cooking.add('externals.vue', 'vue');

module.exports = cooking.resolve();