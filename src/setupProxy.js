// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     ['/admin',
//      '/plan',
//      '/boards',
//      '/challenge',
//      '/comments',
//      '/kakaopay',
//      '/post',
//      '/uploadAjax',
//      '/save',
//      '/search',
//      '/api'
//     ],//proxy가 필요한 path prameter를 입력합니다. 프론트에서 Axios.get("/admin/challengelist")이와 같이 요청할 수 있음
//     createProxyMiddleware({
//       target: 'http://13.125.99.177:8070', //타겟이 되는 api url를 입력합니다.
//       changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
//     })
//   );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', { // "/api" 경로에 대해서만 프록시를 적용합니다.
      target: 'http://13.125.99.177:8070', // 프록시할 API 서버의 URL을 입력합니다.
      changeOrigin: true,
      pathRewrite: { '^/api': '' } // 요청 경로에서 "/api"를 제거합니다.
    })
  );
};