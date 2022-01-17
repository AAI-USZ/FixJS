function ah_postCancel() {
    this._currentActivity.postError('canceled');
    this._currentActivity = null;
  }