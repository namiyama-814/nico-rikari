const http = require('node:http');
const pug = require('pug');
const router = require('./lib/router.js');

const server = http.createServer((req, res) => {
  router.route(req, res);
})
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });

const port = process.env.PORT||8000;
server.listen(port, () => {
  console.info(`${port}ポートでサーバー起動中`);
});