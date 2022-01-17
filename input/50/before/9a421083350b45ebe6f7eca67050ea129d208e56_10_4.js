function() {
        self.connected = network;
        network.connected = true;
        self.connection.status = 'connected';
        self.connection.network = network;
        if (self.onconnect)
          self.onconnect(networkEvent);
      }