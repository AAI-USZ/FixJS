function (value) {
    for (var i = 0; i < this._size; i++) {
      var item = this._items[i];

      if (JSIL.ObjectEquals(item, value))
        return i;
    }

    return -1;
  }