function(buffer) {
    self.pause();
    file.write(buffer, function() {
      self.resume();
    });
  }