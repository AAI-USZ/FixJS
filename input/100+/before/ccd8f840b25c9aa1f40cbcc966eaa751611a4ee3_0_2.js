function (req, socket, head, buffer) {
  var self      = this,
      outgoing  = new(this.target.base),
      listeners = {},
      errState  = false,
      CRLF      = '\r\n';

  //
  // WebSocket requests must have the `GET` method and
  // the `upgrade:websocket` header
  //
  if (req.method !== 'GET' || req.headers.upgrade.toLowerCase() !== 'websocket') {
    //
    // This request is not WebSocket request
    //
    return socket.destroy();
  }
  
  //
  // Add common proxy headers to the request so that they can
  // be availible to the proxy target server. If the proxy is 
  // part of proxy chain it will append the address:
  //
  // * `x-forwarded-for`: IP Address of the original request
  // * `x-forwarded-proto`: Protocol of the original request
  // * `x-forwarded-port`: Port of the original request.
  //
  if (this.enable.xforward && req.connection && req.connection.socket) {
    if (req.headers['x-forwarded-for']){
      var addressToAppend = "," + req.connection.remoteAddress || req.connection.socket.remoteAddress;
      req.headers['x-forwarded-for'] += addressToAppend;
    } 
    else {
      req.headers['x-forwarded-for'] = req.connection.remoteAddress || req.connection.socket.remoteAddress;
    }

    if (req.headers['x-forwarded-port']){
      var portToAppend = "," + req.connection.remotePort || req.connection.socket.remotePort;
      req.headers['x-forwarded-port'] += portToAppend;
    } 
    else {
      req.headers['x-forwarded-port'] = req.connection.remotePort || req.connection.socket.remotePort;
    }

    if (req.headers['x-forwarded-proto']){
      var protoToAppend = "," + (req.connection.pair) ? 'wss' : 'ws';
      req.headers['x-forwarded-proto'] += protoToAppend;
    } 
    else {
      req.headers['x-forwarded-proto'] = req.connection.pair ? 'wss' : 'ws';
    }
  }

  //
  // Helper function for setting appropriate socket values:
  // 1. Turn of all bufferings
  // 2. For server set KeepAlive
  // 3. For client set encoding
  //
  function _socket(socket, keepAlive) {
    socket.setTimeout(0);
    socket.setNoDelay(true);
    
    if (keepAlive) {
      if (socket.setKeepAlive) {
        socket.setKeepAlive(true, 0);
      }
      else if (socket.pair.cleartext.socket.setKeepAlive) {
        socket.pair.cleartext.socket.setKeepAlive(true, 0);
      }
    }
    else {
      socket.setEncoding('utf8');
    }
  }
  
  //
  // Setup the incoming client socket.
  //
  _socket(socket, true);

  //
  // On `upgrade` from the Agent socket, listen to
  // the appropriate events.
  //
  function onUpgrade (reverseProxy, proxySocket) {
    if (!reverseProxy) {
      proxySocket.end();
      socket.end();
      return;
    }

    //
    // Any incoming data on this WebSocket to the proxy target
    // will be written to the `reverseProxy` socket.
    //
    proxySocket.on('data', listeners.onIncoming = function (data) {
      if (reverseProxy.incoming.socket.writable) {
        try {
          self.emit('websocket:outgoing', req, socket, head, data);
          var flushed = reverseProxy.incoming.socket.write(data);
          if (!flushed) {
            proxySocket.pause();
            reverseProxy.incoming.socket.once('drain', function () {
              try { proxySocket.resume() } 
              catch (er) { console.error("proxySocket.resume error: %s", er.message) }
            });
            
            //
            // Force the `drain` event in 100ms if it hasn't
            // happened on its own. 
            //
            setTimeout(function () {
              reverseProxy.incoming.socket.emit('drain');
            }, 100);
          }
        }
        catch (ex) {
          detach();
          reverseProxy.incoming.socket.end();
          proxySocket.end();
        }
      }
    });

    //
    // Any outgoing data on this Websocket from the proxy target
    // will be written to the `proxySocket` socket.
    //
    reverseProxy.incoming.socket.on('data', listeners.onOutgoing = function (data) {
      try {
        self.emit('websocket:incoming', reverseProxy, reverseProxy.incoming, head, data);
        var flushed = proxySocket.write(data);
        if (!flushed) {
          reverseProxy.incoming.socket.pause();
          proxySocket.once('drain', function () {
            try { reverseProxy.incoming.socket.resume() } 
            catch (er) { console.error("reverseProxy.incoming.socket.resume error: %s", er.message) }
          });
          
          //
          // Force the `drain` event in 100ms if it hasn't
          // happened on its own. 
          //
          setTimeout(function () {
            proxySocket.emit('drain');
          }, 100);
        }
      }
      catch (ex) {
        detach();
        proxySocket.end();
        socket.end();
      }
    });

    //
    // Helper function to detach all event listeners
    // from `reverseProxy` and `proxySocket`.
    //
    function detach() {
      proxySocket.removeListener('end', listeners.onIncomingClose);
      proxySocket.removeListener('data', listeners.onIncoming);
      reverseProxy.incoming.socket.removeListener('end', listeners.onOutgoingClose);
      reverseProxy.incoming.socket.removeListener('data', listeners.onOutgoing);
    }

    //
    // If the incoming `proxySocket` socket closes, then
    // detach all event listeners.
    //
    proxySocket.on('end', listeners.onIncomingClose = function() {
      reverseProxy.incoming.socket.end();
      detach();

      // Emit the `end` event now that we have completed proxying
      self.emit('websocket:end', req, socket, head);
    });

    //
    // If the `reverseProxy` socket closes, then detach all
    // event listeners.
    //
    reverseProxy.incoming.socket.on('end', listeners.onOutgoingClose = function() {
      proxySocket.end();
      detach();
    });
  };

  function getPort (port) {
    port = port || 80;
    return port - 80 === 0 ? '' : ':' + port
  }

  //
  // Get the protocol, and host for this request and create an instance
  // of `http.Agent` or `https.Agent` from the pool managed by `node-http-proxy`.
  //
  var agent        = this.target.agent,
      protocolName = this.target.https ? 'https' : 'http',
      portUri      = getPort(this.source.port),
      remoteHost   = this.target.host + portUri;
  
  //
  // Change headers (if requested).
  //
  if (this.changeOrigin) {
    req.headers.host   = remoteHost;
    req.headers.origin = protocolName + '://' + remoteHost;
  }

  //
  // Make the outgoing WebSocket request
  //
  outgoing.host    = this.target.host;
  outgoing.port    = this.target.port;
  outgoing.agent   = agent;
  outgoing.method  = 'GET';
  outgoing.path    = req.url;
  outgoing.headers = req.headers;
  outgoing.agent   = agent;
  
  var reverseProxy = this.target.protocol.request(outgoing);

  //
  // On any errors from the `reverseProxy` emit the
  // `webSocketProxyError` and close the appropriate
  // connections.
  //
  function proxyError (err) {
    reverseProxy.end();
    if (self.emit('webSocketProxyError', req, socket, head)) {
      return;
    }

    socket.end();
  }

  //
  // Here we set the incoming `req`, `socket` and `head` data to the outgoing
  // request so that we can reuse this data later on in the closure scope
  // available to the `upgrade` event. This bookkeeping is not tracked anywhere
  // in nodejs core and is **very** specific to proxying WebSockets.
  //
  reverseProxy.incoming = {
    request: req,
    socket: socket,
    head: head
  };

  //
  // If the agent for this particular `host` and `port` combination
  // is not already listening for the `upgrade` event, then do so once.
  // This will force us not to disconnect.
  //
  // In addition, it's important to note the closure scope here. Since
  // there is no mapping of the socket to the request bound to it.
  //
  reverseProxy.on('upgrade', function (_, remoteSocket, head) {
    //
    // Prepare the socket for the reverseProxy request and begin to
    // stream data between the two sockets. Here it is important to
    // note that `remoteSocket._httpMessage === reverseProxy`.
    //
    _socket(remoteSocket, true);
    onUpgrade(remoteSocket._httpMessage, remoteSocket);
  });

  //
  // If the reverseProxy connection has an underlying socket,
  // then execute the WebSocket handshake.
  //
  reverseProxy.once('socket', function (revSocket) {
    revSocket.on('data', function handshake (data) {
      //
      // Ok, kind of harmfull part of code. Socket.IO sends a hash
      // at the end of handshake if protocol === 76, but we need
      // to replace 'host' and 'origin' in response so we split
      // data to printable data and to non-printable. (Non-printable
      // will come after double-CRLF).
      //
      var sdata = data.toString();

      // Get the Printable data
      sdata = sdata.substr(0, sdata.search(CRLF + CRLF));

      // Get the Non-Printable data
      data = data.slice(Buffer.byteLength(sdata), data.length);

      if (self.source.https && !self.target.https) {
        //
        // If the proxy server is running HTTPS but the client is running
        // HTTP then replace `ws` with `wss` in the data sent back to the client.
        //
        sdata = sdata.replace('ws:', 'wss:');
      }

      try {
        //
        // Write the printable and non-printable data to the socket
        // from the original incoming request.
        //
        self.emit('websocket:handshake', req, socket, head, sdata, data);
        socket.write(sdata);
        var flushed = socket.write(data);
        if (!flushed) {
          revSocket.pause();
          socket.once('drain', function () {
            try { revSocket.resume() } 
            catch (er) { console.error("reverseProxy.socket.resume error: %s", er.message) }
          });

          //
          // Force the `drain` event in 100ms if it hasn't
          // happened on its own. 
          //
          setTimeout(function () {
            socket.emit('drain');
          }, 100);
        }
      }
      catch (ex) {
        //
        // Remove data listener on socket error because the 
        // 'handshake' has failed.
        //
        revSocket.removeListener('data', handshake);
        return proxyError(ex);
      }

      // Catch socket errors
      socket.on('error', proxyError);

      //
      // Remove data listener now that the 'handshake' is complete
      //
      revSocket.removeListener('data', handshake);
    });
  });

  reverseProxy.on('error', proxyError);

  try {
    //
    // Attempt to write the upgrade-head to the reverseProxy 
    // request. This is small, and there's only ever one of 
    // it; no need for pause/resume.
    //
    // XXX This is very wrong and should be fixed in node's core
    //
    reverseProxy.write(head);
    if (head && head.length === 0) {
      reverseProxy._send('');
    }
  }
  catch (ex) {
    return proxyError(ex);
  }

  //
  // If we have been passed buffered data, resume it.
  //
  if (buffer) {
    return !errState
      ? buffer.resume()
      : buffer.destroy();
  }
}