function ah_create(contact) {
    this._currentActivity.postResult({contact: contact});
    this._currentActivity = null;
  }