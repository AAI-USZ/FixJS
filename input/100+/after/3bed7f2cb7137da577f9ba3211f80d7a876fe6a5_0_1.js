function defHandler (req, res, data) {
  res.setHeader('content-type', 'text/plain')
  if (data.headers) {
    data.headers = Object.keys(data.headers).filter(function (k) {
      return k !== 'cookie' && k !== 'set-cookie'
    }).reduce(function (h, k) {
      h[k] = req.headers[k]
      return h
    }, {})
  }
  var d, m = data.code + ' ' + data.message + ' ' + req.url
  d = util.inspect(data)
  console.error(new Date().toISOString() + ' ' + m)
  if (data.options.debug) {
    m += '\n' + data.stack + '\n' + d
  }
  res.end(m + '\n')
}