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
    name: 'contact',
    url: 'mailto:dennismuensterer@gmail.com',
    aliases: ['email', 'message', 'mail']
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
    name: 'facebook',
    url: 'https://facebook.com/' + USERNAME_FULL,
    aliases: ['fb', 'book', 'gesichtsbuch']
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
    name: 'paypal',
    url: 'https://www.paypal.com/paypalme/dennismuensterer',
    aliases: ['pp', 'pay', 'donate', 'sendmoney', 'bbhmm']
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/user/' + USERNAME_FULL,
    aliases: ['yt', 'tube', 'videos']
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
    name: 'wishlist',
    url: 'https://www.amazon.de/hz/wishlist/ls/1Y2URDXEYY1JO',
    aliases: ['wish', 'gift', 'birthday']
  },
  {
    name: 'kickstarter',
    url: 'https://www.kickstarter.com/profile/dennismuensterer',
    aliases: ['ks', 'crowdfunding', 'backed']
  },
  {
    name: 'steam',
    url: 'https://steamcommunity.com/id/' + USERNAME_SHORT,
    aliases: ['gaming', 'play', 'zocken']
  },
  { name: 'reddit', url: 'https://www.reddit.com/user/themissing_link' },
  { name: 'telegram', url: 'https://t.me/' + USERNAME_SHORT },
  { name: 'discord', url: 'https://discord.gg/CrB72mXEzN' },
  { name: 'google', url: 'https://www.google.com/search?q=Dennis+Muensterer' },
  { name: 'api', url: 'https://next.muensterer.xyz/api' }
]

const getRedirect = async (query, noReturn) => {
  let foundRedirect = redirects.find(({name, aliases = []}) => name === query || aliases.includes(query))
  if (!foundRedirect) {
    try {
      const url = await getSocial(query)
      foundRedirect = {url}
    } catch (e) {
      console.log(e)
    }
  }
  const fallback = noReturn ? DEFAULT_URL : (DEFAULT_URL + query)
  return foundRedirect && foundRedirect.url ? foundRedirect.url : fallback
}

export {DEFAULT_URL, redirects, getRedirect}
