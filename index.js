const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')

  res.end(`Request recived on path: ${trimmedPath}`)
})

server.listen(3000, () => {
  console.log('The server is listeninig on port 3000 now')
})