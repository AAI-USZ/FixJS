function() {
      self._flushing--;
      self.emit('file', part.name, file);
      self._maybeEnd();
    }