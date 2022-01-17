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

  var secure = (options.key && options.cert)

  if (options.logger) {
    this.log = options.logger;
  }

  if (typeof arguments[arguments.length - 1] === 'function') {
    this.on('connect', arguments[arguments.length - 1]);
  }

  var onConnect = this.onConnect.bind(this, options.handshake);

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
      self.log.debug('Got upgrade')
      self.onSocket(socket, upgradeHead)
      onConnect()
    })
    .end()

  } else {
    this.onSocket((secure ? tls : net).connect(options, onConnect))
  }

}