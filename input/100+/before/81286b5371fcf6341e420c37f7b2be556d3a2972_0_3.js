function() {
      var array;
      array = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this._isArray.apply(this, array)) {
        array = array[0];
      }
      if (array.length === 1) {
        return array[0];
      }
      return [this._withoutLast.apply(this, array).join(', '), this._last.apply(this, array)].join(' and ');
    }