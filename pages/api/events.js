import events from '../../events.json'

export default (req, res) => {
  res.statusCode = 200
  const origin = req.headers.origin
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.json(events)
}
