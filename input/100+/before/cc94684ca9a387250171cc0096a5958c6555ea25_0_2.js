function writableSpec (mac, stream, opts) {
  opts = opts || {end: true}

  stream.end = mac(stream.end).returns(function () {
    a.equal(stream.writable, false, 'stream must not be writable after end()')
  })
  stream.write = 
    mac(stream.write)
    .throws(function (err, threw) {
//      a.equal(threw, !stream.writable, 'write should throw if !writable')
    })

  var onClose = mac(function close(){}).once()
  var onError = mac(function error(){}).before(onClose)

  stream.on('close', onClose)
  stream.on('error', onError)

  if(opts.error === false)
    onError.never()
  if(opts.error === true)
    onError.once() 
}