function(error) {
        //TODO: steal asuth's error handling...
        callback(error, null);
        self.emit('error', error);
      }