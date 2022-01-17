function get(key, flag) {
    var storage = _selectStorage(flag, 'get()'),
        selectKey = storage.getItem(key);

    if (_checkArgument('String', key)) {
      if (selectKey) {
        return JSON.parse(selectKey);
      } else {
        return console.log('RS.get(): This key is not in storage');
      }
    } else {
      throw new Error('RS.get(): 1st argument should be string');
    }
  }