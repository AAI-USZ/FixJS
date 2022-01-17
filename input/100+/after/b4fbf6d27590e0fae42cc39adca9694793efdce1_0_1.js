function() {
    var parser = parsers.alloc();
    req.socket = socket;
    req.connection = socket;
    parser.reinitialize(HTTPParser.RESPONSE);
    parser.socket = socket;
    parser.incoming = null;
    req.parser = parser;

    socket._httpMessage = req;
    // Setup "drain" propogation.
    httpSocketSetup(socket);

    function errorListener(err) {
      debug('HTTP SOCKET ERROR: ' + err.message + '\n' + err.stack);
      if (req) {
        req.emit('error', err);
        // For Safety. Some additional errors might fire later on
        // and we need to make sure we don't double-fire the error event.
        req._hadError = true;
      }
      if (parser) {
        parser.finish();
        freeParser(parser, req);
      }
      socket.destroy();
    }

    socket.on('error', errorListener);

    socket.ondata = function(d, start, end) {
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
    };

    socket.onend = function() {
      if (!req.res) {
        // If we don't have a response then we know that the socket
        // ended prematurely and we need to emit an error on the request.
        req.emit('error', createHangUpError());
        req._hadError = true;
      }
      if (parser) {
        parser.finish();
        freeParser(parser, req);
      }
      socket.destroy();
    };

    var closeListener = function() {
      debug('HTTP socket close');
      req.emit('close');
      if (req.res && req.res.readable) {
        // Socket closed before we emitted "end" below.
        req.res.emit('aborted');
        req.res.emit('end');
        req.res.emit('close');
      } else if (!req.res && !req._hadError) {
        // This socket error fired before we started to
        // receive a response. The error needs to
        // fire on the request.
        req.emit('error', createHangUpError());
      }

      // Nothing more to be done with this req, since the socket
      // is closed, and we've emitted the appropriate abort/end/close/error
      // events.  Disavow all knowledge, and break the references to
      // the variables trapped by closures and on the socket object.
      req = null;
      socket._httpMessage = null;
    }
    socket.on('close', closeListener);

    parser.onIncoming = function(res, shouldKeepAlive) {
      debug('AGENT incoming response!');

      if (req.res) {
        // We already have a response object, this means the server
        // sent a double response.
        socket.destroy();
        return;
      }
      req.res = res;

      // Responses to HEAD requests are crazy.
      // HEAD responses aren't allowed to have an entity-body
      // but *can* have a content-length which actually corresponds
      // to the content-length of the entity-body had the request
      // been a GET.
      var isHeadResponse = req.method == 'HEAD';
      debug('AGENT isHeadResponse ' + isHeadResponse);

      if (res.statusCode == 100) {
        // restart the parser, as this is a continue message.
        delete req.res; // Clear res so that we don't hit double-responses.
        req.emit('continue');
        return true;
      }

      if (req.shouldKeepAlive && !shouldKeepAlive && !req.upgraded) {
        // Server MUST respond with Connection:keep-alive for us to enable it.
        // If we've been upgraded (via WebSockets) we also shouldn't try to
        // keep the connection open.
        req.shouldKeepAlive = false;
      }

      res.addListener('end', function() {
        if (!req.shouldKeepAlive) {
          if (socket.writable) {
            debug('AGENT socket.destroySoon()');
            socket.destroySoon();
          }
          assert(!socket.writable);
        } else {
          debug('AGENT socket keep-alive');
        }
      });

      DTRACE_HTTP_CLIENT_RESPONSE(socket, req);
      req.emit('response', res);

      res.on('end', function() {
        if (req.shouldKeepAlive) {
          socket.removeListener('close', closeListener);
          socket.removeListener('error', errorListener);
          socket.emit('free');
        }
      });

      return isHeadResponse;
    };
    req.emit('socket', socket);
  }