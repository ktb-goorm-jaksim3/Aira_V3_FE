//vue.config.js
const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // '@'를 src로 매핑
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // FastAPI 백엔드 주소
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // "/api"를 제거하고 백엔드로 전달
      },
    },
  },
});