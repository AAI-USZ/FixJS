function List_IndexOf (value) {
    for (var i = 0, l = this._size; i < l; i++) {
      if (JSIL.ObjectEquals(this._items[i], value))
        return i;
    }

    return -1;
  }