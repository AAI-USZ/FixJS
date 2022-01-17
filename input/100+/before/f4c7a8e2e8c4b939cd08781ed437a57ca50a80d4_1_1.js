function NsSocket(options, socket) {
  if (!(this instanceof NsSocket)) {
    return new NsSocket(options, socket)
  }

  if (!options) {
    options = socket || {}
  }

  this.connected = false
  this.type = options.type || 'tcp4'
  this.retry = options.reconnect ? {
    retries: 0,
    max: options.maxRetries || 10,
    interval: options.retryInterval || 5000,
    wait: options.retryInterval || 5000
  } : false

  EventEmitter2.call(this, {
    delimiter: options.delimiter || '::',
    wildcard: true,
    maxListeners: options.maxListeners || 10
  })

  if (socket) {
    this.stream = socket
    this.socket = this.stream instanceof net.Socket ? this.stream : this.stream.socket
    this.connected = this.socket.writable && this.socket.readable || false
    configureEvents(this)
  }
}