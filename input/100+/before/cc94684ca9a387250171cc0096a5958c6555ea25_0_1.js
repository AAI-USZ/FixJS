function (stream) {
  var mac = macgyver()
  var spec = {}

  function add(name, method) {
    spec[name] = function (opts) {
      method(mac, stream, opts)
      return this
    }
  }

  add('through', throughSpec)
  add('readable', readableSpec)
  add('writable', writableSpec)
  add('basic', throughSpec)
  add('readableWritable', throughSpec)
  add('pausable', pauseSpec)
  add('strictPausable', strictPauseSpec)

  spec.all = function (opts) {
    if(stream.writable && stream.readable)
      return this.through(opts).pausable(opts)
    else if(stream.writable)
      return this.writable().pausable()
    else
      return this.readable()
  }

  spec.validate = function () {
    mac.validate()
    return this
  }

  spec.validateOnExit = function () {
    //your test framework probably has assigned a listener for on exit also,
    //make sure we are first. so the framework has a chance to detect a
    //validation error.
    process.listeners('exit').unshift(function () {
      try {
        mac.validate()
      } catch (err) {
        console.error(err && err.stack)
        throw err
      }
    })
    return this
  }

  return spec
}