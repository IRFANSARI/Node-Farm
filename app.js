const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const jsonFile = fs.readFileSync('./dev-data/data.json');
const jsonData = JSON.parse(jsonFile);
const indexTemplate = fs.readFileSync('./templates/index.html');
const productTemplate = fs.readFileSync('./templates/product.html');
const singleCardTemplate = fs.readFileSync('./templates/singleCard.html');

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const path = urlObj.pathname;
  const id = urlObj.query.id;

  if (path === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    let output = jsonData
      .map((el) => replaceTemplate(singleCardTemplate, el))
      .join('');
    output = indexTemplate.toString().replace(/{%ITEM-CARDS%}/g, output);

    res.end(output);
  } else if (path === '/product') {
    if (id === undefined) {
      res.writeHead(302, { Location: '/' });
    } else {
      res.writeHead(200, { 'content-type': 'text/html' });
      const product = jsonData[id];
      const output = replaceTemplate(productTemplate, product);
      res.end(output);
    }
  }

  res.end();
});

console.log('http://127.0.0.1:8080');
server.listen(8080);
