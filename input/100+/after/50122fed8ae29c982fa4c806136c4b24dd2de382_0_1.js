function(/* [port, host], options, cb */) {
  var options, port, host, cb;

  if (typeof arguments[0] === 'object') {
    options = arguments[0];
  } else if (typeof arguments[1] === 'object') {
    options = arguments[1];
    port = arguments[0];
  } else if (typeof arguments[2] === 'object') {
    options = arguments[2];
    port = arguments[0];
    host = arguments[1];
  } else {
    // This is what happens when user passes no `options` argument, we can't
    // throw `TypeError` here because it would be incompatible with old API
    if (typeof arguments[0] === 'number') {
      port = arguments[0];
    }
    if (typeof arguments[1] === 'string') {
      host = arguments[1];
    }
  }

  options = util._extend({ port: port, host: host }, options || {});

  if (typeof arguments[arguments.length - 1] === 'function') {
    cb = arguments[arguments.length - 1];
  }

  var socket = options.socket ? options.socket : new net.Stream();

  var sslcontext = crypto.createCredentials(options);

  convertNPNProtocols(options.NPNProtocols, this);
  var hostname = options.servername || options.host || 'localhost',
      pair = new SecurePair(sslcontext, false, true,
                            options.rejectUnauthorized === true ? true : false,
                            {
                              NPNProtocols: this.NPNProtocols,
                              servername: hostname
                            });

  if (options.session) {
    pair.ssl.setSession(options.session);
  }

  var cleartext = pipe(pair, socket);
  if (cb) {
    cleartext.on('secureConnect', cb);
  }

  if (!options.socket) {
    socket.connect({
      port: options.port,
      host: options.host,
      localAddress: options.localAddress
    });
  }

  pair.on('secure', function() {
    var verifyError = pair.ssl.verifyError();

    cleartext.npnProtocol = pair.npnProtocol;

    // Verify that server's identity matches it's certificate's names
    if (!verifyError) {
      var validCert = checkServerIdentity(hostname,
                                          pair.cleartext.getPeerCertificate());
      if (!validCert) {
        verifyError = new Error('Hostname/IP doesn\'t match certificate\'s ' +
                                'altnames');
      }
    }

    if (verifyError) {
      cleartext.authorized = false;
      cleartext.authorizationError = verifyError.message;

      if (pair._rejectUnauthorized) {
        cleartext.emit('error', verifyError);
        pair.destroy();
      } else {
        cleartext.emit('secureConnect');
      }
    } else {
      cleartext.authorized = true;
      cleartext.emit('secureConnect');
    }
  });
  pair.on('error', function(err) {
    cleartext.emit('error', err);
  });

  cleartext._controlReleased = true;
  return cleartext;
}