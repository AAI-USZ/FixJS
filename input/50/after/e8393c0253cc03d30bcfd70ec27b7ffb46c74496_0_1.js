function(eventName, callback) {
    this.callbacks.remove(eventName, callback);
    return this;
  }