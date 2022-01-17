function(event) {
        self.connection = req.result;

        callback(null, self);
        self.emit('open', self);
      }