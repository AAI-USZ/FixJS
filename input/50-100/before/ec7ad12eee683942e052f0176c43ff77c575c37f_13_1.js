function soundManager_repeatKey(callback) {
    callback();
    clearTimeout(this._timer);

    if (!this.kRepeatTimeout)
      return;

    this._timer = window.setTimeout((function volumeTimeout() {
      actionCallback();
      this._timer = setInterval(function volumeInterval() {
        callback();
      }, this.kRepeatRate);
    }).bind(this), this.kRepeatTimeout);
  }