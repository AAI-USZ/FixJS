function(e) {

        if (e.keyCode === 37) {
          self._queue(self.slideSetAndMoveFor, "toRight");
        } else {
          self._queue(self.slideSetAndMoveFor, "toLeft");
        }

      }