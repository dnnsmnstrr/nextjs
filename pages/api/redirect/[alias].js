import {DEFAULT_URL, getRedirect} from './redirects'

export default async (req, res) => {
  const { query: { alias } } = req
  const redirect = await getRedirect(alias)
  res.writeHead(307, { Location: redirect })
  res.end()
}
