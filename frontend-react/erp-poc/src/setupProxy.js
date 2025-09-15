const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Servicio de Inventarios (puerto 8081)
  app.use(
    '/api/inventarios',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: {
        '^/api/inventarios': '', // elimina el prefijo al enviar la petición al backend
      },
    })
  );

  // Servicio de Ventas (puerto 8082)
  app.use(
    '/api/ventas',
    createProxyMiddleware({
      target: 'http://localhost:8082',
      changeOrigin: true,
      pathRewrite: {
        '^/api/ventas': '',
      },
    })
  );
};