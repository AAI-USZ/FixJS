function ah_pick(number) {
    this._currentActivity.postResult({ number: number });
    this._currentActivity = null;
  }