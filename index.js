const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')

  res.end(`
    Request recived on path: ${trimmedPath}
    with method: ${req.method.toUpperCase()}
    and with these query string parameters: ${JSON.stringify(parsedUrl.query)}
    and with these headers: ${JSON.stringify(req.headers)}
    `)
})

server.listen(3000, () => {
  console.log('The server is listeninig on port 3000 now')
})