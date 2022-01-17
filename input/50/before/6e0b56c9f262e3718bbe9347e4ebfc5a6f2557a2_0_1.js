function checkedHandler() {
      if (self._isAlive()) {
        handler.apply(self, arguments);
      }
    }