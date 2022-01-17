function(callback) {
    for (var freq in this._favList) {
      callback(this._favList[freq]);
    }
  }