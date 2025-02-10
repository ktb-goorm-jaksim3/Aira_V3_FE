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
  /*
  // 로컬 환경에서 적용
  devServer: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8000", // FastAPI 백엔드 주소
          changeOrigin: true,
          pathRewrite: { "^/api": "" }, // "/api"를 제거하고 백엔드로 전달
        },
      },
    },
  */
 
  // 배포 환경에서 적용
  devServer: {
    host: "0.0.0.0", // Li용ten on all interfaces
    allowedHosts: "all", // Accept requests from any host
    headers : {
        "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // FastAPI 백엔드 주소
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // "/api"를 제거하고 백엔드로 전달
      }
    },
    // Add a simple health check endpoint for ALB to use
    setupMiddlewares: (middlewares, devServer) => {
      if (devServer && devServer.app) {
        devServer.app.get('/health', (req, res) => {
          res.sendStatus(200)
        })
      }
      return middlewares
    },
    client: {
      webSocketURL: {
        hostname: "be-alb-119548847.ap-northeast-2.elb.amazonaws.com",
        port: 80,
        protocol: "ws" // Use "wss" if your ALB uses HTTPS
      }
    }
  }
});