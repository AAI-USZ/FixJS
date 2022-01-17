function(event) {
        self.isOpen = true;
        self.connection = req.result;

        callback(null, self);
        self.emit('open', self);
      }