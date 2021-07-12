import getSocial from './getSocial'
import {DEFAULT_URL} from '../../../config'

export default async (req, res) => {
  const { query: { type } } = req
  try {
    const social = await getSocial(type)
    if (social) {
      res.writeHead(307, { Location: social})
      res.end()
    } else {
      const social = await getSocial()
      res.status(404)
      res.send(`${type} not found. try one of ${Object.keys(social)}`)
    }
  } catch (e) {
    res.writeHead(307, { Location: DEFAULT_URL})
    res.end()
  }
}
