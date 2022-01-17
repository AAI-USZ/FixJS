function(req, res) {
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
      }