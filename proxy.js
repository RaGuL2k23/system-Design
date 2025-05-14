const { createProxyMiddleware } = require('http-proxy-middleware');

function createProxy(config) {
    return createProxyMiddleware(config);
}

module.exports = { createProxy };
