function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain);
    }