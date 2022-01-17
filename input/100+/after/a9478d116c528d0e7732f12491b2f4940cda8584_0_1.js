function ourListen() {
    var self = this,
        desired = toPort(arguments[0]),
        addr = arguments[1],
        current,
        actual,
        err;

    // Ensure we have a dummy fd for EMFILE conditions.
    getDummyFD();

    //
    // Always throw if our desired port was one that should always throw
    //
    if (reservedPort.call(this, desired)) {
      return;
    }

    //
    // Since desired is not on a throwing port
    // we want to skip ports in both throw and ignore
    //
    current = desired ? desired : nextPort(desired);

    for (;;) {
      try {
        binding.bind(self.fd, current, addr);
        break;
      }
      catch (err) {
        //
        // Find the next port we are not supposed to throw up on or ignore
        //
        current = nextPort(current);

        //
        // If this is not an `EADDRINUSE` error or the port is in
        // `carapace.ports.throw` which should always throw an error,
        // then throw the error.
        //
        if (err.code !== 'EADDRINUSE' && err.code !== 'EACCES') {
          self.close();
          self.emit('error', err);
          return;
        }
      }
    }

    actual = this.address().port;
    if (!desired) {
      desired = actual;
    }

    //
    // Need to the listening in the nextTick so that people potentially have
    // time to register 'listening' listeners.
    //
    process.nextTick(function () {
      //
      // It could be that server.close() was called between the time the
      // original listen command was issued and this. Bail if that's the case.
      // See test/simple/test-net-eaddrinuse.js
      //
      if (typeof self.fd !== 'number') {
        return;
      }

      try {
        listen(self.fd, self._backlog || 128);

        //
        // Store the server that has listened on the `desired` port
        // on the carapace itself, indexed by port.
        //
        carapace.servers[desired] = self;

        carapace.emit('port', {
          id: carapace.id,
          addr: addr,
          desired: desired,
          port: actual
        });
      }
      catch (err) {
        if (err.code !== 'EADDRINUSE') {
          self.close();
          self.emit('error', err);
        }
        else {
          //
          // Generate a new socket of the same type since we cannot use an already bound one
          //
          self.fd = socket(self.type);
          self._doListen(desired, addr);
        }
        
        return;
      }

      self._startWatcher();
    });
  }