function() {
      if (self.timer) {
        clearTimeout(self.timer);
        self.timer = 0;
        self.lastscrolly = -1;
      }    
    }