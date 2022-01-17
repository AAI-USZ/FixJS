function(callback) {
      var client = new self.Client(c);
      client.connect();

      var connectError = function(err) {
        client.removeListener('connect', connectSuccess);
        callback(err, null);
      };

      var connectSuccess = function() {
        client.removeListener('error', connectError);

        //handle connected client background errors by emitting event
        //via the pg object and then removing errored client from the pool
        client.on('error', function(e) {
          self.emit('error', e, client);
          pool.destroy(client);
        });
        callback(null, client);
      };

      client.once('connect', connectSuccess);
      client.once('error', connectError);
      client.on('drain', function() {
        pool.release(client);
      });
    }