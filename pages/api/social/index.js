import getSocial from './getSocial'

export default async (req, res) => {
  const social = await getSocial()
  res.statusCode = 200
  res.json(social)
}
