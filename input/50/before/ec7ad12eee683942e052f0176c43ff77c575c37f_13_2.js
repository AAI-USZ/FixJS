function volumeTimeout() {
      actionCallback();
      this._timer = setInterval(function volumeInterval() {
        callback();
      }, this.kRepeatRate);
    }