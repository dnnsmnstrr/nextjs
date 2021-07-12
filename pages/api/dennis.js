import {
  DEFAULT_URL,
  BIRTHDATE,
  EMAIL,
  USERNAME,
  USERNAME_SHORT,
  FIRST_NAME,
  LAST_NAME,
  FULL_NAME
} from '../../config'

export default (req, res) => {
  res.statusCode = 200
  res.json({
    name: FULL_NAME,
    birthdate: BIRTHDATE,
    homepage: DEFAULT_URL,
    username: USERNAME,
    email: EMAIL,
  })
}
