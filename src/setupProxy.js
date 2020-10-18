const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    // app.use(createProxyMiddleware('/manage', {
    //     target: 'http://localhost:8081',
    //     changeOrigin: true,
    // pathRewrite: {
    //     '^devApi': ''
    // }
    // }))
    // app.use(createProxyMiddleware('/manage/api', {
    //     target: 'http://localhost:8082',
    //     changeOrigin: true,
    // pathRewrite: {
    //     '^devApi': ''
    // }
    // }))
    app.use(createProxyMiddleware([process.env.REACT_APP_API], {
        target: process.env.REACT_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
            [`^${process.env.REACT_APP_API}`]: ""
            // '^/devApi': ''
        }
    }))
    app.use(createProxyMiddleware('/manage/api', {
        target: 'http://admintest.happymmall.com:7000',
        changeOrigin: true,
        pathRewrite: {
            '^/devApi': ''
        }
    }))
  }