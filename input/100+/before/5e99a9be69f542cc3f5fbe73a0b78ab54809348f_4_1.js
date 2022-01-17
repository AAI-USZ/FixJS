function Frap(sk, emit_frames) {
  EventEmitter.call(this)

  if (arguments.length === 1 || emit_frames === undefined)
    emit_frames = true //default value

  assert(typeof emit_frames === 'boolean', "emit_frames not of type 'boolean'")

  this.sk = sk
  this.emit_frames = emit_frames

  this.paused = false
  this.eventq = []

  this.f_state    = "frame"   //parser state
  this.f_hdrbuf   = undefined //partial header buffer
  this.f_framelen = undefined //framelen for current receiveing frame
  this.f_pos      = 0         //current position in the frame
  this.f_nreads   = 0         //number of 'data' events for current frame

  this.id = "Frap<" + this.sk.remoteAddress + ":" + this.sk.remotePort + ">"

  this.pending_frames = [] //Pending Write
//  this.sending = false

  var self = this

  function onSkData(buf) {
    if (Frap.VERBOSE)
      log("onSkData: self.f_state=%s; buf.length=%d;", self.f_state, buf.length)

    self.f_nreads += 1
    switch (self.f_state) {
      case "frame":
        self.readFrame(buf)
        break;
      case "data":
        self.readData(buf)
        break;
      case "header":
        self.readHeader(buf)
        break;
      default:
        throw new Error("unknown state '"+self.f_state+"'")
        break;
    }
  }

  function onSkEnd() {
    if (Frap.VERBOSE) log("Frap: sk onEnd:")
    self.emit('end')
  }
  function onSkClose(had_error) {
    if (Frap.VERBOSE) log("Frap: sk onClose:", had_error)
    self.emit('close', had_error)
  }
  function onSkError(err) {
    if (Frap.VERBOSE) log("Frap: sk onError:", err)
    self.emit('error', err)
  }

  //listen to socket 'data', 'end', 'error', and 'close'
  this.sk_listeners = {
    'data'  : onSkData
  , 'end'   : onSkEnd
  , 'close' : onSkClose
  , 'error' : onSkError
  }
  Object.keys(this.sk_listeners).forEach(function(k){
    self.sk.on(k, self.sk_listeners[k])
  })
  
  if (this.emit_frames) self.enableEmitFrame()
}