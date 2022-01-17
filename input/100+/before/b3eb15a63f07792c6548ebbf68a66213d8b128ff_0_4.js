function(path, replace) {
    if (history.pushState) {
      if (replace) {
        history.replaceState(true, '', path);
      } else {
        history.pushState(true, '', path);
      }
      if (this.chunk) {
        this.chunk.emit('halt');
      }
      soma.load(path);
    } else {
      document.location = path;
    }
  }