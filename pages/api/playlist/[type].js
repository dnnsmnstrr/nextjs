import getPlaylist from './getPlaylist'

export default async (req, res) => {
  const { query: { type } } = req
  const playlist = await getPlaylist(type)
  res.writeHead(307, { Location: playlist})
  res.end()
}
