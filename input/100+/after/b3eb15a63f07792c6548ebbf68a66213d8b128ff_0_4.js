function(path, replace) {
    if (history.pushState) {
      if (!this.lazy) {
        if (replace) {
          history.replaceState(true, '', path);
        } else {
          history.pushState(true, '', path);
        }
      }
      if (this.chunk) {
        this.chunk.emit('halt');
        this.chunk = null;
      }
      this.path = path;
      this.begin();
    } else {
      document.location = path;
    }
  }