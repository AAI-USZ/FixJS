function() {
      self.emit('error', errnoException(errno, 'listen'));
    }