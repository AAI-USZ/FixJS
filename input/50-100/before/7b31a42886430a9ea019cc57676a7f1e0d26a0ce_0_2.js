function (err) {
    if (err && err.advice) {
      if (this.options.reconnect && err.advice === 'reconnect' && this.connected) {
        this.disconnect();
        this.reconnect();
      }
    }

    this.publish('error', err && err.reason ? err.reason : err);
  }