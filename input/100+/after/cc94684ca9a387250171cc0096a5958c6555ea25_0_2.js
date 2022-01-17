function writableSpec (mac, stream, opts) {
  merge(opts, {end: true})

  a.isFunction(stream.end, opts.name + '.end *must* be a function')
  a.equal(stream.writable, true, opts.name + '.writable *must* == true')
  function e (n) { return opts.name + '.emit(\''+n+'\')' }
  function n (n) { return opts.name + '.'+n+'()' }

  stream.end = mac(stream.end, n('end')).returns(function () {
    a.equal(stream.writable, false, opts.name + ' must not be writable after end()')
  }).once()
  stream.write = 
    mac(stream.write, n('write'))
    .throws(function (err, threw) {
//      a.equal(threw, !stream.writable, 'write should throw if !writable')
    })

  var onClose = mac(function (){
    if(opts.debug) console.error(e('close'))
  }, e('close')).once()
  var onError = mac(function (err){
    if(opts.debug) console.error(e('error'), err)
  },  e('error')).before(onClose)

  stream.on('close', onClose)
  stream.on('error', onError)

  if(opts.error === false)
    onError.never()
  if(opts.error === true)
    onError.once() 
}