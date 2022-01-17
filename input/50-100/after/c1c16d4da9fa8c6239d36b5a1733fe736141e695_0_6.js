function is(key, flag) {
    var storage = _selectStorage(flag, 'is()'),
        selectKey = storage.getItem(key);

    if (_checkArgument('String', key)) {
      if (selectKey) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error('RS.is(): 1st argument should be strings');
    }
  }