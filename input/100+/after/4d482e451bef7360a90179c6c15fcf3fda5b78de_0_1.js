function(err) {
        if(err) return callback(err);
       
        //handle connected client background errors by emitting event
        //via the pg object and then removing errored client from the pool
        client.on('error', function(e) {
          self.emit('error', e, client);
          pool.destroy(client);
        });

        callback(null, client);
      }