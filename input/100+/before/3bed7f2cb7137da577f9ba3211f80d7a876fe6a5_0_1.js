function defHandler (req, res, data) {
  res.setHeader('content-type', 'text/plain')
  var d, m = data.code + ' ' + data.message + ' ' + req.url
  d = util.inspect(data)
  console.error(new Date().toISOString() + ' ' + m)
  if (data.options.debug) {
    m += '\n' + data.stack + '\n' + d
  }
  res.end(m + '\n')
}