import getGist from '../getGist'

const PLAYLIST_GIST = '6d09e7d0d8696eb87460c7d5370bd079'

export default async (req, res) => {
  const playlist = await getGist(PLAYLIST_GIST)
  res.statusCode = 200
  res.json(playlist)
}
