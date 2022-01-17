function(e) {
        
        if (e.keyCode === 37) {
          self._queue(self.move, "toRight");
        } else {
          self._queue(self.move, "toLeft");
        }
      }