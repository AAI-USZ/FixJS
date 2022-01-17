function secureConnection(socket) {
      // Fallback to HTTPS if needed
      if ((!socket.npnProtocol || !socket.npnProtocol.match(/spdy/)) && !options.debug) {
        return connectionHandler.call(this, socket);
      }

      // Wrap incoming socket into abstract class
      var connection = new Connection(socket, pool, options);

      // Emulate each stream like connection
      connection.on('stream', connectionHandler);

      connection.on('connect', function(req, socket) {
        socket.streamID = req.streamID = req.socket.id;
        socket.isSpdy = req.isSpdy = true;

        socket.on('finish', function() {
          req.connection.end();
        });

        self.emit('connect', req, socket);
      });

      connection.on('request', function(req, res) {
        res._renderHeaders = spdy.response._renderHeaders;
        res.writeHead = spdy.response.writeHead;
        res.push = spdy.response.push;
        res.streamID = req.streamID = req.socket.id;
        res.isSpdy = req.isSpdy = true;

        // Chunked encoding is not supported in SPDY
        res.useChunkedEncodingByDefault = false;

        res.on('finish', function() {
          req.connection.end();
        });

        self.emit('request', req, res);
      });

      connection.on('error', function(e) {
        console.log('[secureConnection] error ' + e);
        socket.destroy(e.errno === 'EPIPE' ? undefined : e);
      });
    }