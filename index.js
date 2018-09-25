const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello World!\n');
});

server.listen(3000, () => {
  console.log('The server is listeninig on port 3000 now');
});