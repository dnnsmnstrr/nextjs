import getSocial from './getSocial'

export default async (req, res) => {
  const { query: { type } } = req
  const social = await getSocial(type)
  res.statusCode = 200
  res.json(social)
}
