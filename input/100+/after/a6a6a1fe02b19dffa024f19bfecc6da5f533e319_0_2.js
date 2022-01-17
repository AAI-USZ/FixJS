function ourListen(address, port, addressType, desired) {
    var self = this;

    address = '0.0.0.0';
    port = toPort(port);
    desired || (desired = port);

    //
    // Always throw if our desired port was one that should always throw
    //
    if (reservedPort.call(this, port)) {
      return;
    }
    
    //
    // Since desired is not on a throwing port
    // we want to skip ports in both throw and ignore
    //
    port || (port = 0);

    //
    // We rely on `error` event to check if address it taken/available, however
    // user may want to hook up to `error` in his application as well (and
    // usually exit when it's emitted). This messes things up. Here we store
    // `error` event listeners and remove them. They will be restored after we
    // start listening or get an error which is not `EADDRINUSE`.
    //
    var errorListeners = self.listeners('error').slice(0);
    self.removeAllListeners('error');

    function restoreErrorListeners() {
      errorListeners.forEach(function (listener) {
        self.on('error', listener);
      });
    }

    //
    // Problem with `listening` events is a bit different. We want to ensure
    // that we first emit `carapace::port` and *then* the proper `listening`
    // event (which can be consumed by user's app).
    //
    // (Also, not doing so breaks `net/net-multiple-servers-test` test.)
    //
    var listeningListeners = self.listeners('listening').slice(0);
    self.removeAllListeners('listening');

    function restoreListeningListeners() {
      listeningListeners.forEach(function (listener) {
        self.on('listening', listener);
      });
    }

    function onListen() {
      //
      // Yay, we made it! Lets restore `error` listeners and tell the world
      // that we totally owned this port.
      //

      self.removeListener('error', onError);

      restoreErrorListeners();
      restoreListeningListeners();

      //
      // Store the server that has listened on the `desired` port
      // on the carapace itself, indexed by port.
      //
      carapace.servers[desired] = self;

      carapace.emit('port', {
        id: carapace.id,
        addr: address,
        port: self.address().port,
        desired: desired
      });

      process.nextTick(function () {
        self.emit('listening');
      });
    }

    function onError(err) {
      //
      // We failed to listen. Unless it's not EADDRINUSE lets try doing the
      // same thing, just with next port.
      //

      self.removeListener('listening', onListen);

      //
      // We can safely restore these listeners here. We're going to call
      // `ourFunction`, so they will be removed again anyway.
      //
      restoreErrorListeners();
      restoreListeningListeners();

      if (err.code !== 'EADDRINUSE' && err.code !== 'EACCES') {
        try { self.close() } 
        catch (ex) { }
        
        self.emit('error', err);
      }
      else {
        ourListen.call(self, '0.0.0.0', 0, addressType, desired);
      }
    }

    self.once('listening', onListen);
    self.once('error', onError);

    //
    // Call original _listen2 function.
    //
    process.nextTick(function () {
      _listen2.call(self, address, port, addressType);
    });
  }