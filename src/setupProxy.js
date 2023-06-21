const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/admin',
     '/plan',
     '/boards',
     '/challenge',
     '/comments',
     '/kakaopay',
     '/post',
     '/uploadAjax',
     '/save',
     '/search',
     '/api/v1/token'
    ],//proxy가 필요한 path prameter를 입력합니다. 프론트에서 Axios.get("/admin/challengelist")이와 같이 요청할 수 있음
    createProxyMiddleware({
      target: 'http://localhost:8070', //타겟이 되는 api url를 입력합니다.
      changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
    })
  );
};