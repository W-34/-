const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:7000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {   // 路径重写
          '^/api': '/'
        }
      }
    }
  },
  // publicPath: "./",
  // assetsDir: "static",
  // outputDir: 'test',
})