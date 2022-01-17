function is(key, flag) {
    var storage = _selectStorage(flag),
        selectKey = storage.getItem(key);

    if (_checkArgument('String', key)) {
      if (selectKey) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error('1st argument should be strings');
    }
  }