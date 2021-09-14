const { createProxyMiddleware } = require('http-proxy-middleware');
// 说明文档 https://create-react-app.dev/docs/proxying-api-requests-in-development

module.exports = function(app) {
    app.use(
        '/debug',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8000/api/v1/', //目标接口域名及端口号
            secure: false, //false为http访问，true为https访问
            changeOrigin: true, //是否跨域
            pathRewrite: { // 重写路径:去掉路径中开头的'/api'
            "^/debug": "/" //重写接口
        }
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.ycsnews.com/api/v1/', //目标接口域名及端口号
            secure: true, //false为http访问，true为https访问
            changeOrigin: true, //是否跨域
            pathRewrite: { // 重写路径:去掉路径中开头的'/api'
                "^/api": "/" //重写接口
            }
        })
    );
};