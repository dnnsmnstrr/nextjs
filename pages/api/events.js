import events from '../../events.json'

export default (req, res) => {
  res.statusCode = 200
  const origin = req.headers.origin
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:9000']
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.json(events)
}
