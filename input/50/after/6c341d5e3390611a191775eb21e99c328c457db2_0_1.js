function changed() {
    for(var i = 0, len = listeners.change.length; i < len; i++) {
      listeners.change[i](col);
    }
  }