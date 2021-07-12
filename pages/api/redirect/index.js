import {DEFAULT_URL as Location} from '../../../config'

export default async (req, res) => {
  res.writeHead(307, { Location })
  res.end()
}
