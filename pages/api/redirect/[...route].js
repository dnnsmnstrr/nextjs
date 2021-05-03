import {DEFAULT_URL, getRedirect} from './redirects'

export default async (req, res) => {
  try {
    const { query: { route, noReturn = false } } = req
    const Location = await getRedirect(route, noReturn)
    res.writeHead(307, { Location } )
    res.end()
  } catch (err) {
    console.log('redirect failed: ', err)
  }
}
