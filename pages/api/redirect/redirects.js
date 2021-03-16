import getSocial from '../social/getSocial'

const DEFAULT_URL = "https://muensterer.xyz/"
const USERNAME_SHORT = 'dnnsmnstrr'
const USERNAME_FULL = 'dennismuensterer'

const redirects = [
  {
    name: 'homepage',
    url: DEFAULT_URL,
    aliases: ['main', 'root']
  },
  {
    name: 'github',
    url: 'https://www.github.com/' + USERNAME_SHORT,
    aliases: ['gh', 'hub', 'code', 'repo', 'hack']
  },
  {
    name: 'zettelkasten',
    url: DEFAULT_URL + 'zettelkasten',
    aliases: ['zk', 'zettel', 'notes', 'slipbox', 'knowlege']
  },
  {
    name: 'music',
    url: 'https://open.spotify.com/user/' + USERNAME_FULL,
    aliases: ['spotify', 'playlists', 'tunes', 'spot',]
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/' + USERNAME_SHORT,
    aliases: ['insta', 'gram', 'ig', 'nofilter', 'pictures', 'photos', 'stories']
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/' + USERNAME_SHORT,
    aliases: ['tw', 'tweet', 'tweets']
  },
  {
    name: 'making',
    url: 'https://www.tiktok.com/@dennis.makerer',
    aliases: ['makerer', 'make', 'maker', 'tiktok', 'tt', 'makermonday']
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/' + USERNAME_FULL,
    aliases: ['in', 'linked']
  },
  {
    name: 'universe',
    url: 'https://dnnsmnstrr.onuniverse.com/'
  },
  {
    name: 'felix',
    url: 'https://felixmuensterer.com',
    aliases: ['lancemax', 'brother', 'dumbass']
  },
  {
    name: 'api', url: 'https://next.muensterer.xyz/api'
  }
]

const getRedirect = async (query) => {
  let foundRedirect = redirects.find(({name, aliases = []}) => name === query || aliases.includes(query))
  if (!foundRedirect) {
    try {
      const url = await getSocial(query)
      foundRedirect = {url}
    } catch (e) {
      console.log(e)
    }
  }
  return foundRedirect && foundRedirect.url ? foundRedirect.url : (DEFAULT_URL + query)
}

export {DEFAULT_URL, redirects, getRedirect}
