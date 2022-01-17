function readableSpec (mac, stream, opts) {

  opts = opts || {end: true}

  var onClose = mac(function close(){}).once()
  var onError = mac(function error(){}).before(onClose)
  var onEnd   = mac(function end  (){}).before(onClose).before(onError)
    .isPassed(function () {
      a.equal(stream.readable, false, 'stream must not be readable on "end"')
    })
  var onData  = mac(function data (){}).before(onEnd)

  stream.on('close', onClose)
  stream.on('end', onEnd)
  stream.on('data', onData)

  if(opts.end)
    onEnd.once()

  if(opts.error === false)
    onError.never()
  if(opts.error === true)
    onError.once() 

}