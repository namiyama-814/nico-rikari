'use strict';
const pug = require('pug');
const {selection} = require('./handler');
const fs = require('fs');

async function route(req, res) {
  switch (req.url) {
    case '/':
      const videos = await selection();
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/index.pug', {videos}));
    break;
    case '/style.css':
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.end(fs.readFileSync(__dirname + '/../views/style.css'));
    break;
  };
};

module.exports = {
  route,
};