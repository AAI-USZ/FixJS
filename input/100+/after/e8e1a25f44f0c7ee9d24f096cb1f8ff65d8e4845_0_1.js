function() {
  var server = arguments[0]
    , secure = false
    , useHttpUpgrade = this.options.http
    , self = this

  if (server instanceof tls.Server) {
    secure = true
    useHttpUpgrade = (server instanceof https.Server)

  } else if (server instanceof net.Server) {
    useHttpUpgrade = (server instanceof http.Server)

  } else if (this.options.key && this.options.cert) {
    secure = true
    server = (useHttpUpgrade ? https : tls).createServer(this.options)
    server.listen.apply(server, arguments)

  } else {
    server = (useHttpUpgrade ? http : net).createServer()
    server.listen.apply(server, arguments)

  }


  if (useHttpUpgrade) {

    server.on('upgrade', function(req, socket, upgradeHead) {
      var resource = self.options.resource

      if (req.url.substr(0, resource.length) !== resource) {
        // Non-besio upgrade
        if (self.options.destroyUpgrade) {
          socket.end()
          debug('Destroying non-besio upgrade')
        }
        return
      }


      socket.write( 'HTTP/1.1 101 Switching Protocols\r\n'
                  + 'Upgrade: Besio\r\n'
                  + 'Connection: Upgrade\r\n'
                  + '\r\n'
                  )

      var client = new Client()
      client.server = self
      client.onSocket(socket, upgradeHead)

    })

  } else {
    server.on(secure ? 'secureConnection' : 'connection', function(socket) {
      var client = new Client()
      client.server = self
      client.onSocket(socket)
    })
  }


  this.server = server

  server.on('listening', this.emit.bind(this, 'listening'))
  server.on('close', this.emit.bind(this, 'close'))
  server.on('error', this.emit.bind(this, 'error'))

  return this
}