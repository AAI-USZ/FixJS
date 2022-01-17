function SimpleFrap(sk) {
  EventEmitter.call(this)

  this.sk = sk
  this.ps  = u.clone(INIT_PARSER_STATE)
  this.frame = { framelen: 0, bufs: [] }

  this.draining = false
  this.writing = false

  var self = this

  function onSkData(buf) {
    if (SimpleFrap.VERBOSE) log("Frap: onSkData: state=%s; buf.length=%d;", self.ps.state, buf.length)
    self._parse(buf)
  }

  function onSkError(err) {
    if (SimpleFrap.VERBOSE) log("Frap: onSkError:", err)
    self.emit('error', err)
    self.destroy()
  }

  //listen to socket 'data', 'end', 'error', and 'close'
  this.sk_listeners = {
    'data'  : onSkData
  , 'error' : onSkError
  }

  Object.keys(this.sk_listeners).forEach(function(k){
    self.sk.on(k, self.sk_listeners[k])
  })

}