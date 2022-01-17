function () {
      var transport = self.transports[id];
      if (self.closed[id] && self.closed[id].length && transport) {

        // if we have buffered messages that accumulate between calling
        // onOpen an this async callback, send them if the transport is
        // still open, otherwise leave them buffered
        if (transport.open) {
          transport.payload(self.closed[id]);
          self.store.publish('dispatched', id, self.closed[id]);
          self.closed[id] = [];
        }
      }
    }