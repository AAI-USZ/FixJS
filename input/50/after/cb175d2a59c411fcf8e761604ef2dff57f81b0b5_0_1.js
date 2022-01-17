function checkedHandler() {
      if (self._isAlive()) {
        return handler.apply(self, arguments);
      }
    }