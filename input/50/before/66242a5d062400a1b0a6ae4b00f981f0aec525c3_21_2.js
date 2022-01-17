function am_cancel(alarm) {
    window.clearTimeout(this._fakeAlarmTimeout);
    this._fakeAlarmTimeout = null;
  }