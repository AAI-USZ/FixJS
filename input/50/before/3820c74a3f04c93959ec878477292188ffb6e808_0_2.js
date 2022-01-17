function(f) {
    for (var freq in this._favList) {
      f(this._favList[freq]);
    }
  }