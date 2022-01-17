function(error) {
        callback(error, null);
        self.emit('error', error);
      }