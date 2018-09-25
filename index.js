const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

const decoder = new StringDecoder('utf-8')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')
  let payload = ''

  req.on('data', data => payload += decoder.write(data))
  req.on('end', () => {
    payload += decoder.end()

    res.end(`
      Request recived on path: ${trimmedPath}
      with method: ${req.method.toUpperCase()}
      and with these query string parameters: ${JSON.stringify(parsedUrl.query)}
      and with these headers: ${JSON.stringify(req.headers)}
      and with this payload; ${payload}
      `)
  })
})

server.listen(3000, () => {
  console.log('The server is listeninig on port 3000 now')
})