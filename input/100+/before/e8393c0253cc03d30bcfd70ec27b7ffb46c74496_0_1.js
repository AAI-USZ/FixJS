function(event_name, data) {
    // Global callbacks
    for (var i = 0; i < this.global_callbacks.length; i++) {
      this.global_callbacks[i](event_name, data);
    }

    // Event callbacks
    var callbacks = this.callbacks[event_name];
    if (callbacks) {
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](data);
      }
    } else if (this.failThrough) {
      this.failThrough(event_name, data)
    }

    return this;
  }