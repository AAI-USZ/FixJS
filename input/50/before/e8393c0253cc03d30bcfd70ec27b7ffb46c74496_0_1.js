function(callback) {
    this.global_callbacks.push(callback);
    return this;
  }