function(buffer) {
    if(!file.write(buffer)) {
        self.pause();
    }
  }