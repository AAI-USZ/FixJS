function(req, socket) {
        socket.streamID = req.streamID = req.socket.id;
        socket.isSpdy = req.isSpdy = true;
        socket.spdyVersion = req.spdyVersion = req.socket.version;

        socket.on('finish', function() {
          req.connection.end();
        });

        self.emit('connect', req, socket);
      }