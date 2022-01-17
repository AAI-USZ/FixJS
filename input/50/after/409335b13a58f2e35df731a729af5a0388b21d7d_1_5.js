function () {
      if ('opening' == self.readyState && ws.OPEN == conn.readyState) {
        self.readyState = 'open';
        self.emit('open');
      }
    }