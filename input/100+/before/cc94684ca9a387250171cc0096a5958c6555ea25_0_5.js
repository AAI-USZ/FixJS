function strictPauseSpec (mac, stream, opts) {
  opts = opts || {}
  opts.strict = true
  paused = false
  if(!stream.readable)
    throw new Error('strict pause does not make sense for a non-readable stream')

  stream.pause = mac(stream.pause)
    .isPassed(function () {
      paused = true
    })
  stream.resume = mac(stream.resume)
    .isPassed(function () {
      paused = false
    })
  stream.on('data', function () {
    a.equal(paused, false, 'a strict pausing stream must not emit data when paused')
  })
}