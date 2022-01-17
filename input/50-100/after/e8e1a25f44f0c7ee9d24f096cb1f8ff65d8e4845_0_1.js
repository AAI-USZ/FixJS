function(req, socket, upgradeHead) {
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

    }