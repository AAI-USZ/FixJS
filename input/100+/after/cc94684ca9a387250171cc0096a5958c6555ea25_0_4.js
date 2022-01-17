function pauseSpec (mac, stream, opts) {
  var paused = false
  function drain() {
    paused = false
  } 
  var onDrain = mac(drain).never()
  
  a.ok(stream.pause, 'stream *must* have pause')

  if(!stream.readable)
    throw new Error('strict pause does not make sense for a non-readable stream')

  stream.pause = mac(stream.pause)
    .isPassed(function () {
      if(paused) return
      //console.log('entered pause state by pause()')
      paused = true
      onDrain.again()
    })

  /*
  hmm, there is writable pause, and readable pause.
  readable pause starts on pause() and ends on resume()
  writable pause starts on write() === false, and ends on 'drain'

  readable streams need not emit drain.
  */

  stream.on('drain', onDrain)
  if(stream.writable) {
    stream.write = 
      mac(stream.write)
      .returns(function (written) {
        a.isBoolean(written, 'boolean')     //be strict.

        if(!paused && !written) {
          //after write returns false, it must emit drain eventually.
          //console.log('entered pause state by write() === false')
          onDrain.again()
        }
        paused = !written
      })
  }
  if(opts.strict)
    stream.on('data', function onData(data) {
      //stream must not emit data when paused!
      a.equal(paused, false, 'a strict pause stream *must not* emit \'data\' when paused')
    })
}