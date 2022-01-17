function(err) {
      self.emit('error', err);
      self.setStatus('down');
    }