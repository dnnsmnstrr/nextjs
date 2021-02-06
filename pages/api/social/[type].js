import getSocial from './getSocial'

export default async (req, res) => {
  const { query: { type } } = req
  const social = await getSocial(type)
  if (social) {
    res.writeHead(307, { Location: social})
    res.end()
  } else {
    const social = await getSocial()
    res.status(404)
    res.send(`${type} not found. try one of ${Object.keys(social)}`)
  }
}
