export default (req, res) => {
  res.statusCode = 200
  res.json({
    name: 'Dennis Muensterer',
    birthdate: '1997-06-16',
  })
}
