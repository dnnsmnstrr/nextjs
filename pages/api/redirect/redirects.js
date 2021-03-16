import getSocial from '../social/getSocial'

const DEFAULT_URL = "https://muensterer.xyz/"

const redirects = [
  {
    name: 'homepage',
    url: DEFAULT_URL,
    aliases: ['main', 'root']
  },
  {
    name: 'zettelkasten',
    url: DEFAULT_URL + 'zettelkasten',
    aliases: ['zk', 'zettel', 'notes', 'slipbox', 'knowlege']
  },
  {
    name: 'music',
    url: 'https://open.spotify.com/user/dennismuensterer',
    aliases: ['spotify', 'playlists', 'tunes', 'spot',]
  },
  {
    name: 'making',
    url: 'https://www.tiktok.com/@dennis.makerer',
    aliases: ['makerer', 'make', 'maker', 'tiktok', 'tt', 'makermonday']
  }
]

const getRedirect = async (query) => {
  let foundRedirect = redirects.find(({name, aliases = []}) => name === query || aliases.includes(query))
  if (!foundRedirect) {
    try {
      foundRedirect = await getSocial(query)
    } catch (e) {
      console.log(e)
    }
  }
  return foundRedirect && foundRedirect.url ? foundRedirect.url : DEFAULT_URL
}

export {DEFAULT_URL, redirects, getRedirect}
