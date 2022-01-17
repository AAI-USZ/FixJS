function(e) {
          self.emit('error', e, client);
          pool.destroy(client);
        }