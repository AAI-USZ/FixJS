function Server(options, requestListener) {
    if (!options) options = {};
    if (!options.maxStreams) options.maxStreams = 100;
    if (!options.transferWindowSize) {
      options.transferWindowSize = Math.pow(2,16);
    }

    options.NPNProtocols = ['spdy/3', 'spdy/2', 'http/1.1', 'http/1.0'];

    HTTPSServer.call(this, options, requestListener);

    // Use https if NPN is not supported
    if (!process.features.tls_npn && !options.debug) return;

    // Wrap connection handler
    var self = this,
        connectionHandler = this.listeners('secureConnection')[0];

    var pool = spdy.zlibpool.create();

    this.removeAllListeners('secureConnection');
    this.on('secureConnection', function secureConnection(socket) {
      // Fallback to HTTPS if needed
      if ((!socket.npnProtocol || !socket.npnProtocol.match(/spdy/)) &&
          !options.debug) {
        return connectionHandler.call(this, socket);
      }

      // Wrap incoming socket into abstract class
      var connection = new Connection(socket, pool, options);

      // Emulate each stream like connection
      connection.on('stream', connectionHandler);

      connection.on('connect', function(req, socket) {
        socket.streamID = req.streamID = req.socket.id;
        socket.isSpdy = req.isSpdy = true;
        socket.spdyVersion = req.spdyVersion = req.socket.version;

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
        res.spdyVersion = req.spdyVersion = req.socket.version;
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
    });
  }