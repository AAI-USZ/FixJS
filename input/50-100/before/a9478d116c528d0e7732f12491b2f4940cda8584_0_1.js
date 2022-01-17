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

      if (err.code !== 'EADDRINUSE') {
        try { self.close() } 
        catch (ex) { }
        
        self.emit('error', err);
      }
      else {
        ourListen.call(self, '0.0.0.0', 0, addressType, desired);
      }
    }