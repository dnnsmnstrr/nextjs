import getSocial from './getSocial'

export default async (req, res) => {
  const { query: { type } } = req
  const social = await getSocial(type)
  if (social) {
    res.writeHead(307, { Location: social})
    res.end()
  }
}
