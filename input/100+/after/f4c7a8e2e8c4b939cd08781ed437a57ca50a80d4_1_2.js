function connect(port) {
  this.retry.timeoutId && clearTimeout(this.retry.timeoutId)

  if (!this.socket) {
    var module = this.type === 'tls' ? tls : net

    this.stream = module.connect.apply(null, arguments)
    this.socket = this.stream instanceof net.Socket ? this.stream : this.stream.socket
    this.connected = this.socket.writable && this.socket.readable || false
    this.connectionArgs = arguments

    configureEvents(this)
  } else {
    this.socket.connect.apply(this.socket, arguments)
  }
  return this
}