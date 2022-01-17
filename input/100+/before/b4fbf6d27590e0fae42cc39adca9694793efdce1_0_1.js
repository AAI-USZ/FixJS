function(d, start, end) {
      var ret = parser.execute(d, start, end - start);
      if (ret instanceof Error) {
        debug('parse error');
        freeParser(parser, req);
        socket.destroy(ret);
      } else if (parser.incoming && parser.incoming.upgrade) {
        var bytesParsed = ret;
        socket.ondata = null;
        socket.onend = null;

        var res = parser.incoming;
        req.res = res;

        // This is start + byteParsed
        var upgradeHead = d.slice(start + bytesParsed, end);
        if (req.listeners('upgrade').length) {
          // Emit 'upgrade' on the Agent.
          req.upgraded = true;
          req.emit('upgrade', res, socket, upgradeHead);
          socket.emit('agentRemove');
        } else {
          // Got upgrade header, but have no handler.
          socket.destroy();
        }
        freeParser(parser, req);
      } else if (parser.incoming && parser.incoming.complete &&
                 // When the status code is 100 (Continue), the server will
                 // send a final response after this client sends a request
                 // body. So, we must not free the parser.
                 parser.incoming.statusCode !== 100) {
        freeParser(parser, req);
      }
    }