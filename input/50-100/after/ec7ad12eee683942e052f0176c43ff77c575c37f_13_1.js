function soundManager_repeatKey(callback) {
    callback();
    clearTimeout(this._timer);

    if (!this.kKeyRepeatTimeout)
      return;

    this._timer = window.setTimeout((function volumeTimeout() {
      callback();
      this._timer = setInterval(function volumeInterval() {
        callback();
      }, this.kKeyRepeatRate);
    }).bind(this), this.kKeyRepeatTimeout);
  }