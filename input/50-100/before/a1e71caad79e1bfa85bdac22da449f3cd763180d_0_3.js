function get(key, flag) {
    var storage = _selectStorage(flag),
        selectKey = storage.getItem(key);

    if (typeof key === 'string') {
      if (selectKey) {
        return JSON.parse(selectKey);
      } else {
        return console.log('This key is not in storage');
      }
    } else {
      throw new Error('1st argument should be string');
    }
  }