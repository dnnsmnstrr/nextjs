import getGist from '../getGist'

const PLAYLIST_GIST = '6d09e7d0d8696eb87460c7d5370bd079'

export default async (req, res) => {
  const { query: { type } } = req
  const playlist = await getGist(PLAYLIST_GIST, type)
  res.writeHead(307, { Location: playlist})
  res.end()
}
