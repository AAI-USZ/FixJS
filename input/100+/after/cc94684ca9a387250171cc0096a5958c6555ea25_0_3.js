function readableSpec (mac, stream, opts) {

  merge(opts, {end: true})
  function e (n) { return opts.name + '.emit(\''+n+'\')' }
  function n (n) { return opts.name + '.'+n+'()' }


  var onError = mac(function (err){
    //'error' means the same thing as 'close'.
    onClose.maybeOnce()
    if(opts.debug) console.error(e('error'), err)
  },  e('error'))
  //.before(onClose) error does not emit close, officially, yet.

  var onEnd = mac(function end  (){
    if(opts.debug) console.error(e('end'), err)
  }, e('end'))
  .once()

  .isPassed(function () {
    a.equal(stream.readable, false, 'stream must not be readable on "end"')
  })

  var onClose = mac(function (){
    if(opts.debug) console.error(e('close'))
  }, e('close'))
  .once()

  onEnd.before(onClose).before(onError)

  var onData  = mac(function data (){}, e('data')).before(onEnd)

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