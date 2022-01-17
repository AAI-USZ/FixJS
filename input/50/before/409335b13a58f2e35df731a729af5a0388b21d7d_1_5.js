function() {
      if ('opening' == self.readyState) {
        self.readyState = 'open';
        self.emit('open');
      }
    }