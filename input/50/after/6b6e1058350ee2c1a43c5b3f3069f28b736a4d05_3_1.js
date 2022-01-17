function (val) {
      if (!(val instanceof ColorTransform))
        throw TypeError();

      this._colorTransform = val;
    }