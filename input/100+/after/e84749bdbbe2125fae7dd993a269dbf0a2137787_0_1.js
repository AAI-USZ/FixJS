function() {
  var self = this
    , options

  if (typeof arguments[0] === 'object') {
    options = arguments[0];
  } else if (typeof arguments[1] === 'object') {
    options = arguments[1];
    options.port = arguments[0];
  } else if (typeof arguments[2] === 'object') {
    options = arguments[2];
    options.port = arguments[0];
    options.host = arguments[1];
  } else {
    options = {}
    if (typeof arguments[0] === 'number') {
      options.port = arguments[0];
    }
    if (typeof arguments[1] === 'string') {
      options.host = arguments[1];
    }
  }

  if (this.socket) {
    this.emit('error', new Error('The client ned to be fully ended before you can reuse it'))
    return
  }

  if (this.destroyed) {
    initClient(this)
  }

  var secure = (options.key && options.cert)

  if (typeof arguments[arguments.length - 1] === 'function') {
    this.once('connect', arguments[arguments.length - 1]);
  }

  function onConnect() {
    debug('Connected, starting handshake')
    var packet = new OutgoingPacket(self, packets.TYPE_HANDSHAKE, binson.calculate(options.handshake))
    packet.writeBinson(options.handshake)
    self.sendPacket(packet)
  }


  if (options.http) {

    options.path = options.resource || '/besio'
    options.headers = { 'Connection': 'Upgrade'
                      , 'Upgrade': 'Besio'
                      }

    if (secure) {
      options.agent = new https.Agent(options)
    }

    ;(secure ? https : http)
    .request(options)
    .on('upgrade', function(res, socket, upgradeHead) {
      debug('Got upgrade')
      self.onSocket(socket, upgradeHead)
      onConnect()
    })
    .on('error', this.emit.bind(this, 'error'))
    .end()

  } else {
    this.onSocket((secure ? tls : net).connect(options, onConnect))
  }

}