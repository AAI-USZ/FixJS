function get(str) {
  var c = db[str]
  return c[Math.floor(Math.random() * c.length)]
}