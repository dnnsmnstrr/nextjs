import {DEFAULT_URL as Location} from './redirects'

export default async (req, res) => {
  res.writeHead(307, { Location })
  res.end()
}
