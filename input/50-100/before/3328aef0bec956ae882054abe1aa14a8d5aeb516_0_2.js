function Logger_log(aType, aData, aCallback) {
  if (this.active) {
    var message = JSON.stringify({type: aType, data: aData});

    if (this._firstLog) {
      this._firstLog = false;
    }
    else {
      message = ',' + message;
    }

    message =  message +  '\r\n';
    this._writeAsync(message, aCallback);
  }
}