function ah_postPickSuccess(number) {
    this._currentActivity.postResult({ number: number });
    this._currentActivity = null;
  }