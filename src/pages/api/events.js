import events from '../../events.json'

export default (req, res) => {
  res.statusCode = 200
  res.json(events)
}
