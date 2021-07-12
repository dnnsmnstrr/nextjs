import {
  USERNAME,
  EMAIL,
  ALTERNATE_EMAILS
} from '../../config.js'

export default (req, res) => {

  res.statusCode = 200
  res.json([EMAIL, ...ALTERNATE_EMAILS.map((provider) => provider.includes('@') ? provider : USERNAME + '@' + provider)])
}
