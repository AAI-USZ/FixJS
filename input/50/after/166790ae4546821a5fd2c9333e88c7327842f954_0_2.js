function volumeTimeout() {
      callback();
      this._timer = setInterval(function volumeInterval() {
        callback();
      }, this.kKeyRepeatRate);
    }