import {DEFAULT_URL, getRedirect} from './redirects'

export default async (req, res) => {
  const { query: { route: [ alias, ...restRoute] } } = req
  const redirect = await getRedirect(alias)
  res.writeHead(307, { Location: `${redirect}${restRoute.reduce((previous, current) => previous + '/' + current, '')}`  })
  res.end()
}
