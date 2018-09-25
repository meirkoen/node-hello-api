const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

const decoder = new StringDecoder('utf-8')

const handlers = {
  hello(data, callback) {
    callback(200, 'Welcome!')
  },
  notFound(data, callback) {
    callback(404)
  }
}

const router = {
  'hello': handlers.hello
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')
  let payload = ''

  req.on('data', data => payload += decoder.write(data))
  req.on('end', () => {
    payload += decoder.end()

    const handler = router[trimmedPath] || handlers.notFound

    handler({
      trimmedPath,
      query: parsedUrl.query,
      method: req.method.toUpperCase(),
      headers: req.headers,
      payload
    }, (status, payload) => {
      const statusCode = Number.isInteger(status) && status || 200
      const payloadString = JSON.stringify(payload || null)

      res.setHeader('Content-Type', 'application/json')
      res.writeHead(status)
      res.end(payloadString)

      console.log(`response: ${statusCode}, ${payloadString}`)
    })

  })
})

server.listen(3000, () => {
  console.log('The server is listeninig on port 3000 now')
})